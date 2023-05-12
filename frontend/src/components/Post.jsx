import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AiFillDelete,
  AiFillLike,
  AiOutlineComment,
  AiOutlineLike,
  AiTwotoneEdit,
} from "react-icons/ai";

import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";

const Pin = ({
  post: {
    user_id,
    username,
    image_avt,
    post_id,
    image_url,
    num_likes,
    num_comments,
    status,
    caption,
  },
}) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [like, setLike] = useState([]);

  useEffect(() => {
    axios.get(`/post/get-user-like-post/${post_id}`).then((res) => {
      setLike(res.data);
    });
  }, [post_id]);

  const alreadyLiked = !!like?.filter((item) => item.user_id === user.user_id)
    ?.length;

  //1, [2,3,1] -> [1].length -> 1
  // 4 ,[2,3,1] -> [].length -> 0

  const likePost = (id) => {
    if (!alreadyLiked) {
      axios.post(`/post/like-post/${id}`).then(() => {
        window.location.reload();
      });
    } else {
      axios.post(`/post/unlike-post/${id}`).then(() => {
        window.location.reload();
      });
    }
  };

  const deletePost = (id) => {
    axios
      .delete(`/post/delete-post/${id}`)
      .then(() => {
        toast.success("Deleted successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className="m-4 bg-slate-300 rounded-lg p-2">
      {image_url && (
        <div
          // onMouseEnter={() => setPostHovered(true)}
          // onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/post-detail/${post_id}`)}
          className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        >
          <img
            loading="lazy"
            className="rounded-lg w-full"
            alt="user-post"
            src={image_url}
          />
        </div>
      )}
      {user_id && (
        <Link
          to={`/user-profile/${user_id}`}
          className="flex gap-2 mt-2 item-center"
        >
          <div className="relative">
            <img
              src={`${image_avt}`}
              alt="user-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {status === "active" && (
              <div className="absolute w-3 h-3 border-2 rounded-full bg-green-500 bottom-0 right-0"></div>
            )}
          </div>

          <p className="font-semibold capitalize">{username}</p>
        </Link>
      )}
      <p className="text-sm ml-3 mt-2">{caption}</p>
      <div className="mt-3 flex items-center justify-around">
        {alreadyLiked ? (
          <div className="flex gap-2 items-center">
            <AiFillLike
              fontSize={24}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                likePost(post_id);
              }}
            />
            <p className="font-bold text-md">{num_likes}</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <AiOutlineLike
              fontSize={24}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                likePost(post_id);
              }}
            />
            <p className="font-bold text-md">{num_likes}</p>
          </div>
        )}

        <Link
          to={`/post-detail/${post_id}`}
          className="flex gap-2 items-center cursor-pointer"
        >
          <AiOutlineComment fontSize={24} />
          <p className="font-bold text-md">{num_comments}</p>
        </Link>

        {user_id === user.user_id && (
          <div className="flex gap-4 items-center">
            <AiFillDelete
              fontSize={24}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post_id);
              }}
            />
            <Link to={`/update-post/${post_id}`}>
              <AiTwotoneEdit fontSize={24} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
