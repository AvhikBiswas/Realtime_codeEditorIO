import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Editor from "../components/Editor";
import { UserLeave, GetAllUser } from "../api/User_API";
import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar";
import "./editorpage.css";

export default function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = location.state || {};
  const { roomId } = useParams();
  const [allUserData, setAllUserData] = useState([]);
  const [showUserName, setShowUserName] = useState(false);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);
  const codeRef = useRef("nullllll");
  const [ownName, setOwnName] = useState(userName);
  const editorValue = useSelector((state) => state.EditorState.value);
  const inputRef = useRef("");

  useEffect(() => {
    if (!ownName) {
      toast.error("Join with your Name");
      navigate("/");
    }
    const init = async () => {
      const socket_URL = process.env.REACT_APP_SOCKET_PORT;
      socketRef.current = io.connect(socket_URL);

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      try {
        const users = await GetAllUser(roomId);
        setAllUserData(users.data);
      } catch (error) {
        console.error("Error during user initialization:", error);
      }

      function handleErrors(e) {
        toast.error("Socket connection failed, try again later.");
        navigate("/");
      }

      socketRef.current.emit("join_room", {
        ownName,
        roomId,
      });

      socketRef.current.on("JOINED", async ({ Ownname }) => {
        if (Ownname !== location.state?.userName) {
          try {
            const users = await GetAllUser(roomId);
            setAllUserData(users.data);
          } catch (error) {
            console.error("Error during user initialization:", error);
          }
          toast.success(`${Ownname} joined the room.`);
        }

        socketRef.current.emit("SYNC_CODE", {
          code: codeRef.current,
          roomId,
        });
      });

      socketRef.current.on("USERS_UPDATE", async (data) => {
        const userData = await GetAllUser(roomId);
        await toast.success(`${data} Left The Room`);
        setAllUserData(userData.data);
      });

      socketRef.current.on("RUNED", ({ code }) => {
        setLoading(false);
        setOutput(code);
      });

      socketRef.current.on("DISCONNECTED", async ({ Ownname, room }) => {
        const data = { ownName, roomId };
        await UserLeave(data);
        const userData = await GetAllUser(roomId);
        setAllUserData(userData.data);
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("JOINED");
      }
    };
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room link copied to clipboard!");
  };

  const handleRun = () => {
    if (editorValue.trim() === "") {
      setOutput("ENTER THE CODE");
      return;
    }
    setLoading(true);
    socketRef.current.emit("RUN", {
      roomId,
      code: editorValue,
      input: inputRef.current,
    });
  };

  const handleLeave = async () => {
    if (!ownName || !roomId) {
      return;
    }

    // Emit a Left event to the socket server before leaving the room
    socketRef.current.emit("Left", { ownName, roomId });

    const data = { ownName, roomId };
    await UserLeave(data);
    navigate("/");
  };

  const handleInput = (e) => {
    inputRef.current = e.target.value;
  };

  const linkedInUrl = "https://www.linkedin.com/in/avhik/";
  const githubUrl = "https://github.com/AvhikBiswas";
  console.log("allUserData is ->", allUserData);

  return (
    <div className="flex flex-col h-screen bg-gray-900 mt-2">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCopyToClipboard}
          className="bg-blue-500 text-white px-4 py-2 rounded m-1"
        >
          Share Room
        </button>
        <button
          onClick={handleLeave}
          className="bg-red-800 text-white px-4 py-2 rounded m-1"
        >
          Leave
        </button>
        <select className="w-32 p-2 border rounded text-white bg-gray-800 m-1">
          <option value="cpp">C++</option>
        </select>
        <button
          onClick={handleRun}
          className={`bg-green-500 text-white px-4 py-2 rounded mr-2 m-1 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      <div className="flex flex-1 ">
        <div className="flex w-1/5 m-2 flex-col relative">
          <div className="text-white text-lg text-center flex flex-row justify-center items-center pb-6 font-bold font-sans">
            {" "}
            Connected User{" "}
          </div>
          <div className="users flex flex-wrap justify-start p-1 items-center">
            {ownName && (
              <UserAvatar
                key={ownName}
                user={{ userNames: ownName }}
                ownName={ownName}
                bold={true}
              />
            )}
            {allUserData &&
              allUserData.map(
                (item) =>
                  item.userNames !== ownName && (
                    <UserAvatar key={item._id} user={item} bold={false} />
                  )
              )}
          </div>
        </div>

        <div className="w-4/5 mb-5">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
            codeRef={codeRef}
          />
        </div>

        <div className="w-1/5 p-2 border-l border-gray-800">
          <div className="bg-gray-800 rounded text-white mb-4 p-2">
            Input Terminal
          </div>
          <textarea
            onChange={handleInput}
            rows="10"
            className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
            placeholder="Enter code here..."
          />
          <div className="bg-gray-800 rounded text-white p-2">
            Output Terminal
          </div>
          <div className="w-full p-2 mt-2 border rounded mb-4 bg-gray-800 text-white h-52">
            <p>{output}</p>
          </div>
        </div>
      </div>

      <div className="p-4 h-full w-full text-white flex items-center justify-between rounded border-t border-gray-800">
        <div className="flex items-center">
          <div className="mr-2 text-xs bg-gray-800 p-2 rounded-md">
            <p>Note: This app is still under development.</p>
            <p>Please let me know if you find bugs out here.</p>
            <div className="flex items-center mt-1">
              <p className="">Connect with me:</p>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-2"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:underline ml-2"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm">&copy; Avhik Biswas</p>
        </div>
      </div>
    </div>
  );
}
