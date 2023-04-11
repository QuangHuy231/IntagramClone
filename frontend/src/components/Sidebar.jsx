import React, { useContext } from "react";
import logo from "../assets/instagramlogo.png";
import { UserContext } from "../context/userContext";

import { Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowRoundForward, IoMdNotifications } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle }) => {
  const { user } = useContext(UserContext);

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between h-full bg-white overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>

          <NavLink
            to={`/notifications`}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <IoMdNotifications />
            Notifications
          </NavLink>

          <NavLink
            to={`/messages`}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <AiFillMessage />
            Messages
          </NavLink>
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user.user_id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={`http://localhost:5000/uploads/${user.image_avt}`}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />

          <p>{user.username}</p>
          <IoIosArrowRoundForward fontSize={40} />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
