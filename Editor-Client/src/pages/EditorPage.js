// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import UserAvatar from '../components/UserAvatar';
import Editor from '../components/Editor';
import { useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import sendName from '../api/nameApi';
import './EditorePage.css'; // Assuming you have a CSS file for custom styles

// EditorPage component
export default function EditorPage() {
  // Extract user information from location
  const location = useLocation();
  const name = location.state?.userName;
  const [ownName, setOwnName] = useState('');
  const roomID = location.state?.roomID;

  // Set user name and send user data to the server on component mount
  useEffect(() => {
    setOwnName(name);
    sendName(name, roomID);
  }, [name, roomID]);

  // Sample user data
  const AlluserData = [
    { id: "1", name: name },

  ];

  // LinkedIn and GitHub URLs
  const linkedInUrl = "https://www.linkedin.com/in/avhik/";
  const githubUrl = "https://github.com/AvhikBiswas";

  // Return JSX
  return (
    <div className="flex flex-col h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded m-1">
          Share Room
        </button>
        <select className="w-32 p-2 border rounded text-white bg-gray-800 m-1">
          <option value="cpp">C++</option>
          {/* Add other language options here */}
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded m-1">
          Run
        </button>
      </div>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Left Section (User Avatars) */}
        <div className="w-1/5 flex flex-wrap mb-8">
          {AlluserData.map((item) => (
            <UserAvatar key={item.id} user={item} />
          ))}
        </div>

        {/* Middle Section (Editor) */}
        <div className="w-3/5 mb-5">
          <Editor />
        </div>

        {/* Right Section (Input and Output Terminals) */}
        <div className="w-1/5 p-2">
          <div className="bg-gray-800 rounded text-white mb-4 p-2">
            {/* Content of the Input Terminal goes here */}
            Input Terminal
          </div>
          {/* Input Box */}
          <textarea
            rows="10"
            className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
            placeholder="Enter code here..."
          />
          <div className="bg-gray-800 rounded text-white p-2">
            {/* Content of the Output Terminal goes here */}
            Output Terminal
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 p-4 h-full w-full text-white flex items-center justify-between rounded">
        <div className="flex items-center">
          <div className="mr-4">
            <p className="text-sm">This application is under development.</p>
            <p className="text-sm">Connect with me:</p>
          </div>
          <div className="flex items-center">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2">
              <FaLinkedin size={30} />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline mx-2">
              <FaGithub size={30} />
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm">&copy; Avhik Biswas</p>
        </div>
      </div>
    </div>
  );
}
