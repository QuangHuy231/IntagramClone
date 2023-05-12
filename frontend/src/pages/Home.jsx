import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import logo from "../assets/instagramlogo.png";
import { AiFillCloseCircle } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { user } = useContext(UserContext);
  const [toogleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  const scrollRef = useRef();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md ">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`/user-profile/${user?.user_id}`}>
            <img src={user?.image_avt} alt="logo" className="w-28" />
          </Link>
        </div>
        {toogleSidebar && (
          <div className="fixed bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
        <div className="bg-gray-50 ">
          <Navbar />
        </div>
        <div className="px-2 md:px-5">
          <Outlet />
        </div>
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

export default Home;
