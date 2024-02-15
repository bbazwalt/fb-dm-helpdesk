import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import ChatCard from "../components/ChatCard";
import MessageCard from "../components/MessageCard";
import Sidebar from "../components/SideBar";
import UserDetails from "../components/UserDetails";
import dp from "./../assets/dp.jpg";

const Agent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarShouldBeHidden, setSidebarShouldBeHidden] = useState(false);

  const toggleSidebar = () => {
    if (sidebarVisible) {
      setSidebarVisible(false);
      setSidebarShouldBeHidden(true);
    } else {
      setSidebarShouldBeHidden(false);
      setSidebarVisible(true);
    }
  };

  const messages = [
    {
      senderId: "user11",
      isMyMessage: false,
      message: "Hello!",
      user: {
        profileImage: dp,
        displayName: "Amit RG",
      },
      timestamp: "Feb 05, 2:22 AM",
    },
    {
      senderId: "user11",
      isMyMessage: false,
      message: "Hello, Your product is great!",
      user: {
        profileImage: dp,
        displayName: "Amit RG",
      },
      timestamp: "Feb 05, 2:22 AM",
    },
    {
      senderId: "user1",
      isMyMessage: true,
      message: "Thank you. Great to talk to you. Have a nice day!!",
      user: {
        profileImage: dp,
        displayName: "Amit RG",
      },
      timestamp: "Feb 05, 2:22 AM",
    },
    {
      senderId: "user1",
      isMyMessage: true,
      message: "Hello, Your product is great!",
      user: {
        profileImage: dp,
        displayName: "Amit RG",
      },
      timestamp: "Feb 05, 2:23 AM",
    },
    {
      senderId: "user1",
      isMyMessage: true,
      message: "Thank you. Great to talk to you. Have a nice day!",
      user: {
        profileImage: dp,
        displayName: "Amit RG",
      },
      timestamp: "Feb 05, 2:23 AM",
    },
    {
      senderId: "user11",
      isMyMessage: false,
      message: "Thank you. Great to talk to you. Have a nice day!",
      user: {
        profileImage: dp,
        displayName: "Amit RG",
      },
      timestamp: "Feb 05, 2:22 AM",
    },
  ];

  const shouldShowProfileImage = (index) => {
    if (index < messages.length - 1) {
      const currentMessage = messages[index];
      const nextMessage = messages[index + 1];
      if (
        currentMessage.senderId === nextMessage.senderId &&
        currentMessage.timestamp === nextMessage.timestamp
      ) {
        return false;
      }
    }
    return true;
  };
  return (
    <div className="flex max-w-[100rem] mx-auto min-h-screen">
      <div
        className={`fixed inset-y-0 z-10 transform transition-transform duration-300 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } ${sidebarShouldBeHidden ? "hidden" : ""} w-full`}
        style={{ width: "4.5rem" }}
      >
        <Sidebar dp={dp} />
      </div>
      <div className="flex flex-grow min-h-screen transition-all duration-300 border-r">
        <div
          className={`flex-grow transition-all duration-300 ${
            sidebarVisible
              ? "ml-[4.5rem] min-w-[20.5rem]"
              : "ml-0 min-w-[24.5rem]"
          }`}
        >
          <div className=" py-2.5 border-b  flex items-center">
            <IconButton onClick={toggleSidebar}>
              <CgMenuLeftAlt />
            </IconButton>
            <h2 className="text-lg font-bold">Conversations</h2>
            <div className="flex-grow"></div>
            <IconButton>
              <Refresh />
            </IconButton>
          </div>
          <ChatCard
            name="John Doe"
            time="10m"
            subject="Order Inquiry"
            body="Is my order shipped?"
          />
          <ChatCard
            name="John Doe"
            time="10m"
            subject="Order Inquiry"
            body="Is my order shipped?"
          />
          <ChatCard
            name="John Doe"
            time="10m"
            subject="Order Inquiry"
            body="Is my order shipped?"
          />
        </div>
      </div>
      <div className="w-[70%] bg-[#f6f6f6] flex flex-col border-r">
        <div className=" p-4 bg-white border-b">
          <h2 className="text-lg font-bold">Amit RG</h2>
        </div>
        <div className="p-3 ">
          {messages.map((msg, index) => (
            <MessageCard
              key={index}
              isMyMessage={msg.isMyMessage}
              message={msg.message}
              user={msg.user}
              timestamp={msg.timestamp}
              showProfileImage={shouldShowProfileImage(index)}
            />
          ))}
        </div>
        <div className="mt-auto p-4 mb-2 rounded-md ">
          <input
            type="text"
            placeholder="Message Amit RG"
            className="w-full px-3 p-2 rounded-md border-2 border-[#4b75a2] focus:outline-none focus:border-black ring-1 ring-[rgb(210,210,210)]"
          />
        </div>
      </div>
      <div className="w-[30%] ">
        <UserDetails />
      </div>
    </div>
  );
};

export default Agent;
