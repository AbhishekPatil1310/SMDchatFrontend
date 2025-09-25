import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    withCredentials: true, // allows cookies (refresh token)
})

export const getAllUser = () => {
  console.log("hit me")
  const token = localStorage.getItem("accessToken"); // get the stored access token
  return API.get("/getAllUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addUser = (formData) => API.post("/addUser", formData);
export const deleteUser = (id) => API.delete(`/deleteUser/${id}`);
export const updateUser = (id, data) => API.put(`/updateUser/${id}`, data);
