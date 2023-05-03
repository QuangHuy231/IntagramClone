import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../context/userContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePost = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchPostDetails = async () => {
      const { data } = await axios.get(`/post/get-detail-post/${id}`);
      setCaption(data[0].caption);
      setImageAsset(data[0].image_url);
    };

    fetchPostDetails();
  }, [id]);

  const uploadPhoto = (e) => {
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    // Append only the first file to the FormData object
    data.append("photo", files[0]);
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const filename = res.data.secure_url;
        setImageAsset(filename);
        setLoading(false);
      });
  };

  const savePin = async () => {
    if (caption && imageAsset) {
      const doc = {
        caption,
        image_url: imageAsset,
      };
      if (id) {
        try {
          await axios.put(`/post/update-post/${id}`, doc).then((res) => {
            toast.success(res.data);
          });
          navigate(`/post-detail/${id}`);
        } catch (error) {
          toast.error(error.response.data);
        }
      } else {
        try {
          const { data } = await axios.post("/post/create-post", doc);

          toast.success("Post created successfully");

          navigate(`/post-detail/${data}`);
        } catch (error) {
          toast.error(error.response.data);
        }
      }
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
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
                  src={`${imageAsset}`}
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
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add your caption here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-wite rounded-lg">
              <img
                src={`${user.image_avt}`}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.username}</p>
            </div>
          )}

          <div className="flex justify-end items-end mt-5 ">
            <button
              type="button"
              onClick={savePin}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
            >
              Save Pin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
