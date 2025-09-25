// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import OAuthCallback from "../pages/OauthCallBack";
import Dshboard from "../pages/Dashboard";
import SignupForm from "../componete/SignupForm";
import LoginForm from "../componete/LoginForm";
import UserPage from "../pages/AllUser";
import Contact from "../componete/contact";
import ProtectedRoute from '../componete/ProtectedPoute'
import ChatPage from "../pages/chatPage";


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oauth" element={<OAuthCallback />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dshboard /></ProtectedRoute>} />
                <Route path="/register" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/chat/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}
