import React, { useState, useEffect } from "react";

const FetchPageIds = ({ userAccessToken, userId }) => {
  const [pageIds, setPageIds] = useState([]);

  useEffect(() => {
    const fetchPageIds = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/${userId}/accounts?access_token=${userAccessToken}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const ids = data.data.map((page) => page.id);
        setPageIds(ids);
      } catch (error) {
        console.error("Error fetching page ids:", error);
      }
    };

    fetchPageIds();
  }, [userAccessToken, userId]);

  return (
    <div>
      <h1>Facebook Page IDs</h1>
      <ul>
        {pageIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPageIds;
