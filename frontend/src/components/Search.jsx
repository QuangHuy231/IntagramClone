import React, { useState, useEffect, useContext } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      axios.get(`/post/search?searchTerm=${searchTerm}`).then((data) => {
        setPosts(data.data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Search for posts..." />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No posts Found</div>
      )}
    </div>
  );
};

export default Search;
