import React from "react";
import { ChatState } from "../Context/ChatProvider";

export default function UserListItem({ user, handleFunction }) {
  return (
    <div>
      <div onClick={handleFunction}>
        <span>{user.name}</span>
      </div>
    </div>
  );
}
