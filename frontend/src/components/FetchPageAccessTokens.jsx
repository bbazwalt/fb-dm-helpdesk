import React, { useState, useEffect } from "react";

const FetchPageAccessTokens = ({ userAccessToken }) => {
  const [pageAccessTokens, setPageAccessTokens] = useState([]);

  useEffect(() => {
    const fetchPageAccessTokens = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v19.0/me/accounts?access_token=${userAccessToken}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPageAccessTokens(data.data);
      } catch (error) {
        console.error("Error fetching page access tokens:", error);
      }
    };

    fetchPageAccessTokens();
  }, [userAccessToken]);

  return (
    <div>
     
    </div>
  );
};

export default FetchPageAccessTokens;
