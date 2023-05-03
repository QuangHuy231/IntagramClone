import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../context/userContext";
import Spinner from "../components/Spinner";
import { BsTrash } from "react-icons/bs";
import {
  AiFillDelete,
  AiFillLike,
  AiOutlineLike,
  AiTwotoneEdit,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const PostDetail = () => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { postId } = useParams();

  const navigate = useNavigate();

  const [like, setLike] = useState([]);

  const alreadyLiked = !!like?.filter((item) => item.user_id === user.user_id)
    ?.length;

  const fetchComments = async () => {
    const { data } = await axios.get(`/post/get-user-comment-post/${postId}`);
    setComments(data);
  };
  const fetchPostDetails = async () => {
    const { data } = await axios.get(`/post/get-detail-post/${postId}`);
    setPostDetail(data[0]);
  };
  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      axios
        .post(`/post/add-comment/${postDetail.post_id}`, {
          comment: comment,
        })
        .then(() => {
          fetchComments();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPostDetails();
    fetchComments();
  }, [postId, postDetail?.post_id]);

  useEffect(() => {
    axios.get(`/post/get-user-like-post/${postDetail?.post_id}`).then((res) => {
      setLike(res.data);
    });
  }, [postDetail?.post_id]);

  const removeComment = (commentId) => {
    axios.delete(`/post/remove-comment/${commentId}`).then(() => {
      fetchComments();
    });
  };

  const likePost = (id) => {
    if (!alreadyLiked) {
      axios.post(`/post/like-post/${id}`).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } else {
      axios.post(`/post/unlike-post/${id}`).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    }
  };

  const deletePost = (id) => {
    try {
      axios.delete(`/post/delete-post/${id}`).then(() => {
        toast.success("Deleted successfully");

        navigate("/");
      });
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  if (!postDetail) return <Spinner message="Loading pin ..." />;

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={postDetail.image_url}
            className="rounded-t-3xl rounded-b-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div>
            <p className="mt-3 ">{postDetail.caption}</p>
          </div>
          <div className="flex justify-between">
            <Link
              to={`/user-profile/${postDetail.user_id}`}
              className="flex gap-2 mt-5 item-center bg-white rounded-lg"
            >
              <img
                src={postDetail.image_avt}
                alt="user-profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-semibold capitalize">{postDetail?.username}</p>
            </Link>

            {alreadyLiked ? (
              <div className="flex gap-2 items-center">
                <AiFillLike
                  fontSize={24}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    likePost(postDetail?.post_id);
                  }}
                />
                <p className="font-bold text-md">{postDetail?.num_likes}</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <AiOutlineLike
                  fontSize={24}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    likePost(postDetail?.post_id);
                  }}
                />
                <p className="font-bold text-md">{postDetail?.num_likes}</p>
              </div>
            )}

            {user?.user_id === postDetail?.user_id && (
              <div className="flex gap-4 items-center">
                <AiFillDelete
                  fontSize={24}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(postDetail?.post_id);
                  }}
                />
                <Link to={`/update-post/${postDetail?.post_id}`}>
                  <AiTwotoneEdit fontSize={24} />
                </Link>
              </div>
            )}
          </div>

          <h2 className="mt-5 text-2xl">Comments</h2>

          <div className="max-h-370 overflow-y-auto">
            {comments?.map((comment, i) => (
              <div className="flex justify-between items-center" key={i}>
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                  <Link to={`/user-profile/${comment?.user_id}`}>
                    <img
                      src={comment?.image_avt}
                      alt="user-profile"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  </Link>

                  <div className="flex flex-col ">
                    <Link to={`/user-profile/${comment?.user_id}`}>
                      <p className="font-bold">{comment?.username}</p>
                    </Link>
                    <p>{comment.comment}</p>
                  </div>
                </div>
                {user?.user_id === comment?.user_id && (
                  <button
                    className="text-lg"
                    onClick={() => removeComment(comment.comment_id)}
                  >
                    <BsTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user?.user_id}`}>
              <img
                src={user?.image_avt}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white font-semibold px-6 rounded-full text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting the comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
