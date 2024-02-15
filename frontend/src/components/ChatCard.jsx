import React from "react";

const ChatCard = ({ name, time, subject, body }) => {
  return (
    <div className="flex hover:bg-zinc-200 cursor-pointer justify-between items-start p-3 border-b">
      <div className="flex">
        <div className="flex flex-col items-start mr-3">
          <div className="flex flex-row justify-center">
            <div className="pr-1 py-3 mr-2">
              <input
                onClick={(event) => event.stopPropagation()}
                type="checkbox"
                className="form-checkbox cursor-pointer h-4 w-4 text-blue-600 "
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="font-semibold">{name}</span>
              <span className="text-sm font-medium text-gray-800">
                Facebook DM
              </span>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-800">{subject}</span>
          <span className="text-sm text-gray-600">{body}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm mt-1 font-medium text-gray-700">{time}</span>
      </div>
    </div>
  );
};

export default ChatCard;
