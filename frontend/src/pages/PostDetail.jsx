import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../context/userContext";
import Spinner from "../components/Spinner";
import { BsTrash } from "react-icons/bs";

const PostDetail = () => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { postId } = useParams();
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

  const removeComment = (commentId) => {
    axios.delete(`/post/remove-comment/${commentId}`).then(() => {
      fetchComments();
    });
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
            src={`http://localhost:5000/uploads/${postDetail.image_url}`}
            className="rounded-t-3xl rounded-b-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div>
            <p className="mt-3 ">{postDetail.caption}</p>
          </div>
          <Link
            to={`/user-profile/${postDetail.user_id}`}
            className="flex gap-2 mt-5 item-center bg-white rounded-lg"
          >
            <img
              src={`http://localhost:5000/uploads/${postDetail.image_avt}`}
              alt="user-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="font-semibold capitalize">{postDetail?.username}</p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>

          <div className="max-h-370 overflow-y-auto">
            {comments?.map((comment, i) => (
              <div className="flex justify-between items-center" key={i}>
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                  <Link to={`/user-profile/${comment?.user_id}`}>
                    <img
                      src={`http://localhost:5000/uploads/${comment?.image_avt}`}
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
                src={`http://localhost:5000/uploads/${user?.image_avt}`}
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
