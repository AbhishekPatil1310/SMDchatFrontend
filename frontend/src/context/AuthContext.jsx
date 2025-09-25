// src/auth/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { refreshToken } from "../api/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  // Refresh token on load
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await refreshToken(); // assumes cookie contains refreshToken
        if (res.data.accessToken) {
          setAccessToken(res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
        } else {
          setAccessToken(null);
          localStorage.removeItem("accessToken");
        }
      } catch (err) {
        setAccessToken(null);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  const logout = async () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
