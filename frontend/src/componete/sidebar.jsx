import React, { useState } from "react";
import { Users as UsersIcon, X as CloseIcon, Menu as MenuIcon } from "lucide-react";
import { getAllUser } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./BackButton";

export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // controls sidebar visibility on mobile
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllUser();
      setUsers(res.data);
      setShowUsers(true);
    } catch (err) {
      setError("Failed to load users");
      setShowUsers(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = () => {
    if (showUsers) setShowUsers(false);
    else fetchUsers();
  };

  const handleUserClick = (userId) => {
    navigate(`/chat/${userId}`);
    setShowUsers(false);
    setIsOpen(false); // close sidebar on mobile after selecting a user
  };

  return (
    <>
      {/* Hamburger Toggle Button - visible on mobile */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 p-2 rounded text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar - fixed full height on desktop, sliding on mobile */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-blue-600 text-white flex flex-col p-4 shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:shadow-none`}
      >
        <button
          onClick={handleChatClick}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          aria-expanded={showUsers}
          aria-controls="user-list"
        >
          <UsersIcon size={20} />
          Chat
        </button>

        {loading && <p className="mt-4 text-sm text-blue-200">Loading users...</p>}
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        {showUsers && (
          <nav id="user-list" className="mt-4 overflow-y-auto flex-1" aria-label="User list">
            <ul>
              {users.length > 0 ? (
                users.map((user) => (
                  <li
                    key={user._id}
                    className="py-2 px-3 hover:bg-blue-500 rounded cursor-pointer truncate"
                    title={user.name}
                    onClick={() => handleUserClick(user._id)}
                  >
                    {user.name}
                  </li>
                ))
              ) : (
                <li className="py-2 px-3 text-blue-200">No users found</li>
              )}
            </ul>
          </nav>
        )}

        <div className="mt-auto">
          <GoBackButton />
        </div>
      </aside>

      {/* Overlay for mobile sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
