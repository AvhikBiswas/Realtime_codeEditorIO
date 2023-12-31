import React, { useState } from 'react';
import { SignInNewUser } from '../api/User_API';
import { useParams } from 'react-router-dom';

const UserName = ({ onJoin }) => {
  const [userName, setUserName] = useState('');
  const { roomId } = useParams();  
  const handleJoin = async() => {
    if (userName.trim() !== '') {
      onJoin(userName);
     const data =await SignInNewUser(userName,roomId)
      return data;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-md p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Name</h2>
        <input
          className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default UserName;
