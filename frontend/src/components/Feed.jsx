import axios from "axios";
import React, { useState, useEffect } from "react";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios.get("/post/get-post-of-user-following").then((data) => {
      setPosts(data.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed" />;
  if (!posts?.length) return <h2>No pins available</h2>;
  return <div>{posts && <MasonryLayout posts={posts} />}</div>;
};

export default Feed;
