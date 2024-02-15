import React, { useState, useEffect } from "react";

const FacebookPageData = ({ accessToken, pageId }) => {
  const [pageInfo, setPageInfo] = useState(null);
  const [messages, setMessages] = useState(null);

  const fetchPageInfo = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${pageId}?fields=id,name,about&access_token=${accessToken}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPageInfo(data);
    } catch (error) {
      console.error("Error fetching page info:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${pageId}/conversations?fields=messages{message,from,to,created_time}&access_token=${accessToken}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchPageInfo();
    fetchMessages();
  }, [accessToken, pageId]);

  return (
    <div>
      <h1>Facebook Page Information</h1>
      {pageInfo && (
        <div>
          <p>ID: {pageInfo.id}</p>
          <p>Name: {pageInfo.name}</p>
          <p>About: {pageInfo.about}</p>
        </div>
      )}

      <h2>Messages</h2>
      {messages && (
        <ul>
          {messages.data.map((conversation) => (
            <li key={conversation.id}>
              {conversation.messages.data.map((message, index) => (
                <p key={index}>{message.message}</p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FacebookPageData;
