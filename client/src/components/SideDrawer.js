import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { AuthState } from "../Context/AuthProvider";
import Loading from "./Loading";
import UserListItem from "./UserListItem";
import { searchUsers, findOrCreateChat } from "../services/service";
import { ChatState } from "../Context/ChatProvider";

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = AuthState();
  const { setSelectedChat, setChats, chats } = ChatState();
  const btnRef = React.useRef();
  const toast = useToast();
  console.log("sidedrawer re-remdered");

  const handleSearch = async () => {
    if (!search) {
      console.log("no search value");
      toast({
        title: "No search",
        description: "Enter a value to search",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      try {
        setLoading(true);
        const data = await searchUsers(search, user.token);
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
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const data = await findOrCreateChat(userId, user.token);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSideBarClosing = () => {
    setSearch("");
    setSearchResult([""]);
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
            <DrawerCloseButton onClick={handleSideBarClosing} />
            <DrawerHeader>Search for people</DrawerHeader>

            <DrawerBody>
              <div className="flex">
                <Input
                  placeholder="Type here..."
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />

                <Button ml="4" px="6" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <div className="mt-4">
                  {searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))}
                </div>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
