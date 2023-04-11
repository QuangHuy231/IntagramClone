import React, { useState, useEffect, useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Spinner from "../components/Spinner";
import { UserContext } from "../context/userContext";
import MasonryLayout from "../components/MasonryLayout";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [err, setErr] = useState("");
  const [posts, setPosts] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/user/user-details/${userId}`);

        setUserProfile(data);
      } catch (error) {
        setErr(err);
      }
    };

    fetchData();
  }, [err, userId]);

  useEffect(() => {
    if (text === "Created") {
      axios.get(`/post/get-posts-user-created/${userId}`).then((data) => {
        setPosts(data.data);
      });
    } else {
      axios
        .get(`/post/get-posts-user-like/${userId}`)
        .then((data) => setPosts(data.data));
    }
  }, [text, userId]);

  if (err) {
    return <div>{err}</div>;
  }
  if (!userProfile) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center item-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              src={`http://localhost:5000/uploads/${userProfile.image_avt}`}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {userProfile.username}
            </h1>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("liked");
              }}
              className={`${
                activeBtn === "liked" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Liked
            </button>
          </div>
          {posts?.length ? (
            <div className="px-2 ">
              <MasonryLayout posts={posts} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Found Posts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
