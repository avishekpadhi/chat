import React, { useEffect, useState } from "react";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/SideDrawer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ChatState } from "../Context/ChatProvider";
import { AuthState } from "../Context/AuthProvider";

const ChatPage = () => {
  const history = useHistory();
  const { chats, setChats } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, setSelectedChat } = useState();
  const { user } = AuthState();

  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      {user?.name}
      <div className="flex w-screen h-screen p-1">
        {/* {user && <Chats fetchAgain={fetchAgain} />} */}
        {/* {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} */}
      </div>
    </div>
  );
};

export default ChatPage;
