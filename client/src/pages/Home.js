import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
  const getData = async () => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is retrieved
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const response = await axios.post(
        '/api/user/get-user-info-by-id',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected: Add space after "Bearer"
          },
        }
      );

      console.log("User data:", response.data); // Provide context for console logs

    } catch (error) {
      console.error("Error fetching data:", error); // Use console.error for error logging
    }
  };

  useEffect(() => {
    getData(); // Fetch data when the component is mounted
  }, []); // Empty array to ensure useEffect runs only once on mount

  return <div>Home</div>;
}

export default Home;
