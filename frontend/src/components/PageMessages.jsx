import React, { useState, useEffect } from "react";

const PageMessages = ({ pageAccessToken, pageId }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const url = `https://graph.facebook.com/v19.0/${pageId}/conversations?fields=messages.limit(10){message,from,to,created_time}&access_token=${pageAccessToken}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setConversations(data.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [pageAccessToken, pageId]);

  return (
    <div>
      <h1>Page Messages</h1>
      {conversations.map((conversation) => (
        <div key={conversation.id}>
          <h2>Conversation ID: {conversation.id}</h2>
          {conversation.messages.data.map((message, index) => (
            <p key={index}>
              <strong>{message.from.name}:</strong> {message.message}
              <br />
              <small>{new Date(message.created_time).toLocaleString()}</small>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PageMessages;
