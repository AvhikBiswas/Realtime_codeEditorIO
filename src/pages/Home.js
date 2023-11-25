import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [RoomKeyId,setRoomId]=useState("");
  const [userName,setUserName]=useState("");


  const navigate=useNavigate();

  const createRoom=(e)=>{
    e.preventDefault();
    const id=uuidv4();
    console.log(id);
    setRoomId(id);
    toast.success("Room Created Successfully")
  }

  const joinRoom=()=>{
    if(!RoomKeyId || !userName){
      
      toast.error("Name And User Name Requare");
      return;
    }
    else{
       navigate(`/editor/${RoomKeyId}`);
    }
   
  }

  const handelKey=(e)=>{
    if(e.key==="Enter"){
      joinRoom();
      return;
    }
  }
  
  return (
    <div className="flex h-screen">
      {/* Left side with image and color palette */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500">
        {/* Image or color palette */}
      </div>

      {/* Right side with login form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-4">
        <div className="max-w-md bg-white rounded-md p-8 shadow-md">
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
              className="w-full border rounded-md py-2 px-3"
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
              className="w-full border rounded-md py-2 px-3"
              placeholder="Enter Your Name"
              onChange={(e)=>setUserName(e.target.value)}
              onKeyUp={handelKey}
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
          <div className="mt-4 text-sm text-gray-600">
            Made with ❤️ by{' '}
            <a href="https://www.linkedin.com/in/avhik/" target="_blank" rel="noopener noreferrer">
              Avhik Biswas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
