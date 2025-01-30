// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";

import "./app.css";

const App: React.FC = () => {
  return (
    <Router>
      <TopBar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
