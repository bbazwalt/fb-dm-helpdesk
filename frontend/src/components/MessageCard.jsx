import React from "react";

const MessageCard = ({
  isMyMessage,
  message,
  user,
  timestamp,
  showProfileImage,
}) => {
  return (
    <div
      className={`flex ${isMyMessage ? "justify-end" : "justify-start"} my-2`}
    >
      {!showProfileImage && <div className="w-8 h-8 ml-3 mr-1" />}
      {!isMyMessage && showProfileImage && (
        <img
          src={user.profileImage}
          alt={`${user.displayName}'s profile`}
          className="w-8 h-8 rounded-full object-cover mb-4 mr-3 ml-1 self-center"
        />
      )}
      <div className="flex flex-col ">
        <div className="flex flex-col ">
          <div
            className={`p-2 rounded bg-white flex break-words shadow-sm border ${
              isMyMessage ? " justify-end " : " justify-start"
            }`}
            style={{ minWidth: "fit-content", maxWidth: "41.85rem" }}
          >
            {message}
          </div>
        </div>
        {showProfileImage && (
          <div
            className={`text-xs ${
              isMyMessage ? "self-end" : "self-start"
            } font-medium text-gray-700 mt-1`}
          >
            {user.displayName} - {timestamp}
          </div>
        )}
      </div>

      {isMyMessage && showProfileImage && (
        <img
          src={user.profileImage}
          alt={`${user.displayName}'s profile`}
          className="w-8 h-8 rounded-full mr-2  object-cover mb-4 ml-3 self-center"
        />
      )}
      {!showProfileImage && <div className="w-8 h-8 ml-4 mr-1" />}
    </div>
  );
};

export default MessageCard;
