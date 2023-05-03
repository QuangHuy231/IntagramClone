import React, { useState } from "react";

import logo from "../assets/instagramlogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", {
        email,
        username: userName,
        password,
      });
      toast.success("Register Successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="w-[500px] px-11 border rounded">
        <div className="flex justify-center mt-5 mb-4">
          <img src={logo} alt="instagramLogo" />
        </div>
        <div className="flex flex-col mx-9 mb-4">
          <input
            type="text"
            placeholder="User Name"
            className="mt-2 p-4 text-sm border"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="mt-2 p-4 text-sm border"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mt-2 p-4 text-sm border"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="text-white text-lg bg-blue-500 p-3 rounded-md my-3 border-none cursor-pointer hover:bg-blue-800"
          >
            Register
          </button>
          {/* <div className="flex mt-2">
            <span className="w-full h-[1px] bg-gray-400"></span>
          </div>
          <div className="text-blue-400 mb-6 text-center">Forget Password?</div> */}
        </div>
      </div>
      <div className="mt-8 border p-5 w-[500px] text-center">
        <p>
          Have an account?
          <Link to={"/login"}>
            <span className="text-blue-500 hover:text-blue-800"> Login</span>
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Register;
