import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import Loading from "./Loading";
import UserListItem from "./UserListItem";

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");

  const { user, setSelectedChat, setChats, chats } = ChatState();
  const btnRef = React.useRef();
  const toast = useToast();

  const handleSubmit = async () => {
    if (!search) {
      toast({
        title: "No search",
        description: "Enter a value to search",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        description: "Failed to get search results",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:3000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="w-screen h-14 bg-gray-200 flex px-5">
        <span
          className="border border-black px-3 py-1 text-white bg-blue-400 rounded h-9 my-auto cursor-default "
          onClick={onOpen}
        >
          Search People
        </span>
      </div>

      <div>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search for people</DrawerHeader>

            <DrawerBody>
              <Input
                placeholder="Type here..."
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />

              <Button onClick={handleSubmit}>Search</Button>
              {loading ? (
                <Loading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
