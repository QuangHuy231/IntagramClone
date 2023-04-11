import React, { useContext, useState } from "react";

import logo from "../assets/instagramlogo.png";
import { Link, useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { data } = await axios.post("/auth/login", {
      email,
      password,
    });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl flex flex-col">
            <input
              type="text"
              placeholder="Email"
              className="bg-white w-80 p-2 mt-4 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-white w-80 p-2 mt-4 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="text-white text-lg bg-blue-500 p-3 rounded-md my-3 border-none cursor-pointer hover:bg-blue-800"
            >
              Login
            </button>
          </div>

          <div className="text-blue-400 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
