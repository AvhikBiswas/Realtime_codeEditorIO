import React, { useEffect, useState } from 'react';
import UserAvatar from '../components/UserAvatar';
import Editor from '../components/Editor';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import UserName from '../components/UserName';
import { UserLeave } from '../api/User_API';
import "./editorpage.css";



export default function EditorPage() {
  const location = useLocation();
  const name = location.state?.userName;
  const [ownName, setOwnName] = useState('');
  const roomID = location.state?.roomID;
  const [showUserName, setShowUserName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOwnName(name);
    if (!name) {
      setShowUserName(true);
    }
  }, [name, roomID]);

  const AlluserData = [{ id: '1', name: ownName }];

  const linkedInUrl = 'https://www.linkedin.com/in/avhik/';
  const githubUrl = 'https://github.com/AvhikBiswas';

  const handleJoin = (userName) => {
    setOwnName(userName);
    setShowUserName(false);
  };


  const handelLeave =async () => {
   await UserLeave(ownName,roomID)
    navigate('/');
  }

  return (
    <div className='flex flex-col h-screen b bg-gray-900 mt-2'>
      {showUserName ? (
        <UserName onJoin={handleJoin} />
      ) : (
        <>
          <div className='flex justify-end mb-4'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded m-1'>
              Share Room
            </button>
            <button onClick={handelLeave} className='bg-red-800 text-white px-4 py-2 rounded m-1'>
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
            {/* User Section */}
            <div className='w-1/5 flex flex-wrap mb-8'>
              {AlluserData.map((item) => (
                <UserAvatar key={item.id} user={item} />
              ))}
            </div>

            {/* Editor Section */}
            <div className='w-3/5 mb-5'>
              <Editor />
            </div>

            {/* Terminal Section */}
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

          {/* Footer Section */}
          <div className='p-4 h-full w-full text-white flex items-center justify-between rounded'>
            <div className='flex items-center'>
              <div className='mr-2 text-xs'>
                <p>Note: This app is still under development.</p>
                <p> Please let me know if you find bugs out here.</p>
                <p>Connect with me:</p>
              </div>
              <div className='flex items-center'>
                {/* Social Media Links */}
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

            {/* Copyright Section */}
            <div>
              <p className='text-sm'>&copy; Avhik Biswas</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
