import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import TopBar from "./components/TopBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PublicRoute from "./components/PublicRoute";  
import NotFound from "./components/NotFound";  
import { loginSuccess } from "./actions/authActions";
import * as jwt_decode from 'jwt-decode';

import "./app.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Check for the token in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && checkTokenExpiration(token)) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);

  const checkTokenExpiration = (token: string) => {
    try {
      const decoded: any = jwt_decode(token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      return currentTime < expirationTime; // Check if token has expired
    } catch (error) {
      return false;
    }
  };

  return (
    <Router>
      <TopBar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-20">
        <Routes>
          {/* Use PublicRoute for login and signup pages */}
          <Route path="/login" element={<PublicRoute element={<Login />} restricted={true} redirectPath="/" />} />
          <Route path="/signup" element={<PublicRoute element={<Signup />} restricted={true} redirectPath="/" />} />
          {/* PrivateRoute for the home page */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          {/* Catch-all route for 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
