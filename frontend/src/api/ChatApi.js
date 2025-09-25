import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/messages`;

// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch conversation with a specific user
export const fetchMessages = async (receiverId) => {
  if (!receiverId) return [];
  try {
    const res = await axios.get(`${BASE_URL}/${receiverId}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    return [];
  }
};

// Send a message to a specific user
export const sendMessage = async (receiverId, text) => {
  if (!receiverId || !text) return null;
  try {
    // Send 'to' in the request body now
    console.log('in the api post ')
    const res = await axios.post(
      BASE_URL,
      { to: receiverId, text },
      { headers: getAuthHeaders(), withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to send message:", err);
    return null;
  }
};
