import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

import Spinner from "../components/Spinner";
import { UserContext } from "../context/userContext";
import MasonryLayout from "../components/MasonryLayout";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary border text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [err, setErr] = useState("");
  const [posts, setPosts] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const { userId } = useParams();

  const { user } = useContext(UserContext);

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
            <div className="relative">
              <img
                src={userProfile.image_avt}
                alt="user-pic"
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              />
              {userProfile.status === "active" && (
                <div className="absolute w-3 h-3 border-2 rounded-full bg-green-500 bottom-0 right-0"></div>
              )}
            </div>
            <h1 className="font-bold text-3xl text-center mt-3">
              {userProfile.username}
            </h1>
          </div>

          <div className="flex justify-between h-20 mt-8 items-center px-20">
            <p className="font-bold">{userProfile.num_posts} Posts</p>

            <p className="font-bold">{userProfile.num_followers} Followers</p>

            <p className="font-bold">{userProfile.num_following} Followings</p>
          </div>
          <div className=" mb-7 flex gap-2 justify-center items-center">
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
            {userProfile.user_id === user.user_id && (
              <Link
                to={"/edit-user"}
                className="bg-primary border text-black font-bold p-2 rounded-full w-32 outline-none text-center"
              >
                Edit User
              </Link>
            )}
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
