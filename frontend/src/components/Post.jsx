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
    post_date,
    num_likes,
    num_comments,
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
          {/* {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`http://localhost:5000/uploads/${image}`}
                  //chỉ tải không chuyển đến trang pin detail
                  target="_blank"
                  onClick={handleDownload}
                  download
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  rel="noreferrer"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destinantion && (
                <a
                  href={destinantion}
                  target="_blank"
                  rel="noneferrer noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <BsFillArrowRightCircleFill />
                  {destinantion.length > 15
                    ? `${destinantion.slice(0, 15)}...`
                    : destinantion}
                </a>
              )}
              {postedBy?._id === user._id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100  font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none mr-4"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )} */}
        </div>
      )}
      {user_id && (
        <Link
          to={`/user-profile/${user_id}`}
          className="flex gap-2 mt-2 item-center"
        >
          <img
            src={`${image_avt}`}
            alt="user-profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="font-semibold capitalize">{username}</p>
        </Link>
      )}
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
