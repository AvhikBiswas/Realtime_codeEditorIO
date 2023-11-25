import React, { useEffect, useState } from 'react'
import UserAvatar from '../components/UserAvatar';
import Editor from '../components/Editor';

export default function EditorPage() {
  const [userData, setUserData] = useState([{
    id: "1", name: "Avik Biswas"
  },
  {
    id: "3", name: "Avik Biswas2"
  },
  {
    id: "5", name: "Avik Biswas2"
  },
  {
    id: "50", name: "Radha Biswas"
  },
  {
    id: "70", name: "Radha Biswas"
  },
  {
    id: "80", name: "Radha Biswas"
  },
  {
    id: "068", name: "Radha Biswas"
  }
  ]);
  // useEffect(()=>{

  // }[userData])
  console.log(userData);
  return (
    <div className="flex flex-row h-screen p-8 bg-gray-200">
      {/* Left Separation with Avatars (20%) */}
      <div className=" flex container w-48 flex-wrap">
        {/* User Avatar 1 */}
        {
          userData.map((item) => {
            return (
              <UserAvatar key={item.id} user={item} />
            )
          })
        }
        {/* User Avatar 2 */}

      </div>

      {/* Right Separation with Code Editor (80%) */}
      <div className="w-4/5 ml-8 flex flex-col">
        <div className="flex justify-between mb-4">
          {/* Share Room Button in Top Right */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded self-end">Share Room</button>
        </div>

        {/* Code Editor */}
        <Editor />

        {/* Single Line Code Input */}
        <div className="mt-4">
          <label className="block mb-2 text-gray-700">Single Line Code:</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Enter code here..." />
        </div>

        {/* Language Selector and Run Button in Top Right */}
        <div className="flex mt-4 space-x-4 self-end">
          {/* Language Selector */}
          <div>
            <label className="block mb-2 text-white">Select Language</label>
            <select className="w-32 p-2 border rounded">
              <option value="cpp">C++</option>
              {/* Add other language options here */}
            </select>
          </div>

          {/* Run Button */}
          <button className="bg-green-500 text-white px-4 py-2 rounded">Run</button>
        </div>
      </div>
    </div>
  );

}

