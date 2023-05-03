import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../context/userContext";
import Spinner from "../components/Spinner";

const UpdateUser = () => {
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState(user.username);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(user.image_avt);

  const navigate = useNavigate();

  const uploadPhoto = (e) => {
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("photo", files[0]);
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filename } = res;
        setImageAsset(filename);
        setLoading(false);
      });
  };

  const updateUser = async () => {
    if (userName && imageAsset) {
      const doc = {
        email: user.email,
        username: userName,
        image_avt: imageAsset,
        password,
      };
      const { data } = await axios.put("/auth/update-profile", doc);
      localStorage.setItem("user", JSON.stringify(data));
      navigate(`/user-profile/${data.user_id}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        {/* tao keo tha hinh anh */}
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}

            {!imageAsset ? (
              <label>
                <div className="flex flex-col item-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl ">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, GIF or TIFF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadPhoto}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={`http://localhost:5000/uploads/${imageAsset}`}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm password"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <div className="flex justify-end items-end mt-5 ">
            <button
              type="button"
              onClick={updateUser}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
