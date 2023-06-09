import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, searchTerm, setSearchTerm, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link
          to={`/user-profile/${user?.user_id}`}
          className="relative hidden md:block"
        >
          <img
            src={`${user?.image_avt}`}
            alt="user"
            className="w-14 h-12 rounded-lg"
          />
          {user?.status === "active" && (
            <div className="absolute w-3 h-3 border-2 rounded-full bg-green-500 bottom-0 right-0"></div>
          )}
        </Link>
        <Link
          to="create-post"
          className="bg-black text-white roudelg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>

        <AiOutlineLogout
          color="red"
          fontSize={40}
          onClick={handleLogout}
          className="rounded-full w-12 h-12 bg-white p-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
