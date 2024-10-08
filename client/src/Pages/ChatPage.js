import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/SideDrawer";
import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChatPage = () => {
  const history = useHistory();
  const { user, setUser } = ChatState();
  const { chats, setChats } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, setSelectedChat } = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) history.push("/");
  }, [history]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="flex w-screen h-screen p-1">
        {user && <Chats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
