import React from "react";
import Masonry from "react-masonry-css";
import Post from "./Post";

const breakpointObj = {
  default: 3,
  3000: 4,
  2000: 3,
  1200: 2,
  1000: 1,
  // 500: 1,
};

const MasonryLayout = ({ posts }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {posts?.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
