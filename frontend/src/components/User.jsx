import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const User = ({ value }) => {
  const { user } = useContext(UserContext);
  const { user_id, username, image_avt } = value;
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    axios.get(`/user/user-following/${user?.user_id}`).then((res) => {
      setFollowing(res.data);
    });
  }, []);

  const alreadyFollowing = !!following?.filter(
    (item) => item.user_id === user_id
  )?.length;

  const unFollowUser = (user_id) => {
    axios.post(`/user/unfollow-user/${user_id}`).then((res) => {
      window.location.reload();
    });
  };

  const followUser = (user_id) => {
    axios.post(`/user/follow-user/${user_id}`).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div
      className="m-4 bg-slate-300 rounded-lg p-2 flex justify-between items-center"
      key={user_id}
    >
      <Link
        to={`/user-profile/${user_id}`}
        className="flex gap-2 mt-2 item-center"
      >
        <img
          src={`http://localhost:5000/uploads/${image_avt}`}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{username}</p>
      </Link>

      {alreadyFollowing ? (
        <button
          className="bg-red-500 text-white font-bold p-2 rounded-full w-32 outline-none"
          onClick={(e) => {
            e.stopPropagation();
            unFollowUser(user_id);
          }}
        >
          Following
        </button>
      ) : (
        <button
          className="bg-red-500 text-white font-bold p-2 rounded-full w-32 outline-none"
          onClick={(e) => {
            e.stopPropagation();
            followUser(user_id);
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default User;
