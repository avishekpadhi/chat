import React, { useEffect, useState } from "react";
import { ChatState, setLoadingChat } from "../Context/ChatProvider";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { AddIcon } from "@chakra-ui/icon";
import { getSender } from "../config/ChatLogics";

// import { Box, Stack, Text } from "@chakra-ui/layout";

import axios from "axios";
import { Button } from "@chakra-ui/react";
import GroupChatModal from "./miscellaneous/GroupChatModal";

export default function Chats() {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();

  const toast = useToast();

  const fetchChats = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/api/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col m-3 rounded-lg  bg-slate-100 items-center inline-block w-1/4 h-9/12">
      <div className="flex w-full flex justify-around h-20 items-center px-10">
        <p className="font-bold text-2xl">My Chats</p>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            className="#4b4f56'"
            // rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </div>
      <div className="w-4/5 mt-2 overflow-scroll">
        {chats ? (
          <div className="overflow-y-scroll">
            {chats.map((chat) => (
              // <div
              //   onClick={() => setSelectedChat(chat)}
              //   key={chat._id}
              //   className={`cursor-pointer rounded-lg px-1 py-1 ${
              //     selectedChat === chat ? "#38B2AC" : "#E8E8E8"
              //   }`}
              // >
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className="cursor-pointer rounded-lg mb-2 px-2 py-3 w-full black overflow-y-scroll"
                style={{
                  backgroundColor:
                    selectedChat === chat
                      ? "rgb(165 180 252)"
                      : "rgb(191 219 254)",
                  // color: selectedChat === chat ? "white" : "black",
                }}
              >
                <span>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </span>
                {/* {chat.latestMessage && (
                  <span fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </span>
                )} */}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
