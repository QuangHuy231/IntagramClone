import React from "react";
import Masonry from "react-masonry-css";
import Post from "./Post";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
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
