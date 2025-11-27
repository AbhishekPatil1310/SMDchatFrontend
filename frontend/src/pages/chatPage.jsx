import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../api/ChatApi";
import { io } from "socket.io-client";
import Sidebar from "../componete/sidebar";
import { FaPaperclip } from "react-icons/fa";

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize messages and socket
  useEffect(() => {
    async function initialize() {
      if (!id) return;

      const msgs = await fetchMessages(id);
      setMessages(msgs);

      const token = localStorage.getItem("accessToken");

      if (socketRef.current) {
        socketRef.current.off("private_message");
        socketRef.current.disconnect();
      }

      socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
        auth: { token: `Bearer ${token}` },
      });

      socketRef.current.on("private_message", (msg) => {
        if (msg.from === id || msg.to === id) {
          setMessages((prev) => {
            if (prev.find((m) => m._id === msg._id)) return prev;
            return [...prev, msg];
          });
        }
      });
    }

    initialize();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("private_message");
        socketRef.current.disconnect();
      }
    };
  }, [id]);

  // Handle sending text message
  const handleSend = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("private_message", { to: id, text: newMessage });
    setNewMessage("");
  };

  // Handle Video Upload
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("video", file);

      const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}/api/messages/upload-video/${id}`;

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      // Emit video message via WebSocket
      socketRef.current.emit("private_message", {
        to: id,
        videoUrl: data.videoUrl,
        _id: data._id,
        from: data.from,
      });

      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error("Video upload failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen text-white font-sans relative">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
          src="/video.mp4"
        ></video>

        {/* Chat Header */}
        <div className="p-6 text-center z-10">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 tracking-widest uppercase">
            BGMI Squad Chat
          </h2>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.from === id ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-sm ${msg.from === id
                      ? "bg-gray-700 text-yellow-300 border border-yellow-500"
                      : "bg-yellow-500 text-black border border-yellow-300"
                    }`}
                >
                  {/* TEXT MESSAGE */}
                  {msg.text && <p>{msg.text}</p>}

                  {/* VIDEO MESSAGE */}
                  {msg.videoUrl && (
                    <video
                      controls
                      className="rounded-lg mt-2 max-w-full"
                      src={msg.videoUrl}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sticky Input Section */}
        <div className="p-4 border-t border-yellow-500 bg-gray-800 flex gap-2 sticky bottom-0 z-10">

          {/* Upload Icon */}
          <button
            className="bg-gray-700 p-2 rounded"
            onClick={() => fileInputRef.current.click()}
          >
            <FaPaperclip size={20} className="text-yellow-400" />
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleVideoUpload}
            className="hidden"
          />

          {/* Text Input */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your battle message..."
            className="flex-1 bg-gray-700 text-white border border-yellow-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
