import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SignInNewUser } from '../api/User_API';

export default function Home() {
  const [RoomKeyId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  
  const navigate = useNavigate();

  const create_user = async (ownName, roomID) => {
    if (ownName && roomID) {
      const data = await SignInNewUser(ownName, roomID);
      return data;
    } else {
      console.error('Name or Room ID is empty');
    }
  };

  const createRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('Room Created Successfully');
  };

  const joinRoom = () => {
    if (!RoomKeyId || !userName) {
      toast.error('Name and User Name are required');
    } else {
      create_user(userName, RoomKeyId);
      navigate(`/editor/${RoomKeyId}`, { state: { userName } });
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      joinRoom();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Centered login form */}
      <div className="m-auto max-w-md bg-gray-800 rounded-md p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="roomId" className="block text-sm font-bold mb-2">
            Room ID
          </label>
          <input
            type="text"
            id="roomInput"
            value={RoomKeyId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full border rounded-md py-2 px-3 bg-gray-700 text-white"
            placeholder="Enter Room ID"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border rounded-md py-2 px-3 bg-gray-700 text-white"
            placeholder="Enter Your Name"
            onChange={(e) => setUserName(e.target.value)}
            onKeyUp={handleKey}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={createRoom}
            className="w-1/2 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none mr-2"
          >
            Create Room
          </button>

          <button
            className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>

        {/* Made with love line and LinkedIn link */}
        <div className="mt-4 text-sm text-gray-400">
          Made with ❤️ by{' '}
          <a
            href="https://www.linkedin.com/in/avhik/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avhik Biswas
          </a>
        </div>
      </div>
    </div>
  );
}
