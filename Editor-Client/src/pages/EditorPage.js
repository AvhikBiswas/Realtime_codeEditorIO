import React, { useEffect, useRef, useState } from 'react';
import UserAvatar from '../components/UserAvatar';
import Editor from '../components/Editor';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { GetAllUser, UserLeave } from '../api/User_API';
import "./editorpage.css";
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

export default function EditorPage() {
  const location = useLocation();
  const name = location.state?.userName;
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [AlluserData, setAlluserData] = useState([]);
  const [ownName, setOwnName] = useState(name);
  const [error, setError] = useState(false);
  const socketRef = useRef(null);
  const codeRef = useRef(null);


  const editorValue = useSelector((state) => state.EditorState.value);

  useEffect(() => {
    if (!ownName) {  // Check if ownName is falsy
      toast.error('No username Found');
      navigate('/');
      return;
    }
    fetchData();
  }, [ownName]);

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await io.connect('http://localhost:3030');
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
          console.log('socket error', e);
          toast.error('Socket connection failed, try again later.');
          navigate('/');
        }

        socketRef.current.emit("join_room", {
          room: roomId,
          ownName: name
        });

        socketRef.current.on(
          "JOINED",
          async (data) => {
            const { Ownname } = data;

            console.log(' this is own name -> ' + name + ' <-this is emitted name ' + Ownname);
            if (name !== Ownname) {
              console.log('joined hit');
              fetchData();
              toast.success(`${Ownname} joined the room.`);
              console.log(`${Ownname} joined`);
////promice         
              console.log(`from sync_code roomid and code in room ${editorValue}`);


              console.log('editorValue---->', editorValue);
              socketRef.current.emit("SYNC_CODE", {
                room: roomId,
                code: codeRef.current
              });
            }
          }
        );

        socketRef.current.on(
          "Disconnected",
          (data) => {
            const { Ownname } = data;

            console.log('this is own name ->' + name + '<- this is emitted name' + Ownname);
            if (name !== Ownname && name!==undefined) {
              console.log('Left The Room');
               fetchData();
              toast.success(`${Ownname} Left The Room`);
              console.log(`${Ownname} left`);
            }
          }
        );
      } catch (error) {
        console.log('failed to connect to socket', error);
      }
    };

    const cleanup = () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("JOINED");
        socketRef.current.off("DISCONNECTED");
        console.log('Socket disconnected');
      }
    };

    init();

    return cleanup;
  }, []);

  const fetchData = async () => {
    try {
      const res = await GetAllUser(roomId);
      setAlluserData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLeave = async () => {
    const data = { ownName, roomId };
    socketRef.current.emit("Left", {
      room: roomId,
      ownName: name
    });
    await UserLeave(data);
    navigate('/');
  }

  const linkedInUrl = 'https://www.linkedin.com/in/avhik/';
  const githubUrl = 'https://github.com/AvhikBiswas';

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        toast.success('Room ID copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        toast.error('Failed to copy Room ID');
      });
  };

  return (
    <div className='flex flex-col h-screen bg-gray-900 mt-2'>
      <div className='flex justify-end mb-4'>
        <button onClick={handleCopyRoomId} className='bg-blue-500 text-white px-4 py-2 rounded m-1'>
          Copy Room ID
        </button>
        <button onClick={handleLeave} className='bg-red-800 text-white px-4 py-2 rounded m-1'>
          Leave
        </button>
        <select className='w-32 p-2 border rounded text-white bg-gray-800 m-1'>
          <option value='cpp'>C++</option>
        </select>
        <button className='bg-green-500 text-white px-4 py-2 rounded mr-2 m-1'>
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
          <Editor roomId={roomId} 
            socketRef={socketRef} 
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
            Output Terminal{editorValue}
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
              <FaLinkedin size={25} />
            </a>
            <a
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-500 hover:underline mx-2'
            >
              <FaGithub size={25} />
            </a>
          </div>
        </div>

        <div>
          <p className='text-sm'>&copy; Avhik Biswas</p>
        </div>
      </div>
    </div>
  );
}
