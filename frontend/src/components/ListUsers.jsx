import React from "react";

import User from "./User";

const ListUsers = ({ users }) => {
  return (
    <div className="flex flex-col">
      {users?.map((value) => (
        <User key={value.user_id} value={value} />
      ))}
    </div>
  );
};

export default ListUsers;
