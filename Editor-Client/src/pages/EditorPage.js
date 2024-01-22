import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import UserAvatar from '../components/UserAvatar';
import Editor from '../components/Editor';
import UserName from '../components/UserName';
import { SignInNewUser, UserLeave, GetAllUser } from '../api/User_API';
import './editorpage.css';

export default function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.userName;
  const { roomId } = useParams();
  const [AlluserData, setAlluserData] = useState([]);
  const [showUserName, setShowUserName] = useState(false);

  const socketRef = useRef(null);
  const codeRef = useRef('Console.log()');
  const [ownName, setOwnName] = useState(name);

  useEffect(() => {
    const init = async () => {
      socketRef.current = io.connect('http://localhost:3030');

      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      try {
        const users = await GetAllUser(roomId);
        setAlluserData(users.data);
      } catch (error) {
        console.error('Error during user initialization:', error);
      }

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        navigate('/');
      }

      socketRef.current.emit('join_room', {
        ownName,
        roomId,
      });

      socketRef.current.on('connect', () => {
        try {
          const storedCode = localStorage.getItem('editorCode');
          const initialCode = storedCode;
          socketRef.current.emit('SYNC_CODE', {
            code: initialCode,
            roomId,
          });
          codeRef.current = initialCode;
        } catch (error) {
          console.log('problem syncing the code');
        }
      });

      socketRef.current.on('JOINED', ({ Ownname, room }) => {
        if (Ownname !== location.state?.userName) {
          toast.success(`${Ownname} joined the room.`);
          console.log(`${Ownname} joined`);
        }

        socketRef.current.emit('SYNC_CODE', {
          code: codeRef.current,
          roomId,
        });
      });

      socketRef.current.on('DISCONNECTED', ({ Ownname }) => {
        toast.success(`${Ownname} left the room.`);
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off('JOINED');
      }
    };
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room link copied to clipboard!');
  };

  const handelLeave = async () => {
    const data = { ownName, roomId };
    await UserLeave(data);
    navigate('/');
  };

  const linkedInUrl = 'https://www.linkedin.com/in/avhik/';
  const githubUrl = 'https://github.com/AvhikBiswas';

  return (
    <div className='flex flex-col h-screen b bg-gray-900 mt-2'>
      {showUserName ? (
        <UserName />
      ) : (
        <>
          <div className='flex justify-end mb-4'>
            <button
              onClick={handleCopyToClipboard}
              className='bg-blue-500 text-white px-4 py-2 rounded m-1'
            >
              Share Room
            </button>
            <button
              onClick={handelLeave}
              className='bg-red-800 text-white px-4 py-2 rounded m-1'
            >
              Leave
            </button>
            <select className='w-32 p-2 border rounded text-white bg-gray-800 m-1'>
              <option value='cpp'>C++</option>
            </select>
            <button
              className='bg-green-500 text-white px-4 py-2 rounded mr-2 m-1'
            >
              Run
            </button>
          </div>

          <div className='flex flex-1'>
            <div className='w-1/5 flex flex-wrap mb-8'>
              {AlluserData.length !== 0 ? (
                AlluserData.map((item) => (
                  <UserAvatar key={item._id} user={item} />
                ))
              ) : null}
            </div>

            <div className='w-3/5 mb-5'>
              <Editor
                socketRef={socketRef}
                roomId={roomId}
                onCodeChange={(code) => {
                  codeRef.current = code;
                }}
              />
            </div>

            <div className='w-1/5 p-2'>
              <div className='bg-gray-800 rounded text-white mb-4 p-2'>
                Input Terminal
              </div>
              <textarea
                rows='10'
                className='w-full p-2 border rounded mb-4 bg-gray-800 text-white'
                placeholder='Enter code here...'
              />
              <div className='bg-gray-800 rounded text-white p-2'>
                Output Terminal
              </div>
            </div>
          </div>

          <div className='p-4 h-full w-full text-white flex items-center justify-between rounded'>
            <div className='flex items-center'>
              <div className='mr-2 text-xs'>
                <p>Note: This app is still under development.</p>
                <p>Please let me know if you find bugs out here.</p>
                <p>Connect with me:</p>
              </div>
              <div className='flex items-center'>
                <a
                  href={linkedInUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline mx-2'
                >
                  LinkedIn
                </a>
                <a
                  href={githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:underline mx-2'
                >
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <p className='text-sm'>&copy; Avhik Biswas</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
