import React, { useState, useEffect, useContext } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import axios from "axios";
import { UserContext } from "../context/userContext";
import ListUsers from "./ListUsers";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      axios.get(`/post/search?searchTerm=${searchTerm}`).then((data) => {
        setPosts(data.data);
        setLoading(false);
      });
      axios.get(`/user/search?searchTerm=${searchTerm}`).then((data) => {
        setUsers(data.data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Search for posts..." />}
      {users?.length !== 0 && <ListUsers users={users} />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {users?.length === 0 &&
        posts?.length === 0 &&
        searchTerm !== "" &&
        !loading && (
          <div className="mt-10 text-center text-xl">No posts Found</div>
        )}
    </div>
  );
};

export default Search;
