import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import GiftBox from "../components/GiftBox";

/**
 * ViewOther is responsible for displaying the view of all gifts.
 * @component
 */
const ViewOtherPage = () => {
  const [giftData, setGiftData] = useState(null); // State to store the gift data

  // Effect to fetch the gift data from the server
  useEffect(() => {
    const fetchGiftData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_all_gifts`);
        setGiftData(response.data.gifts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchGiftData();
  }, []);

  return (
    <h1>View All</h1>
    // For each user, display their name, then a table of their gifts
    // Name at top, centered and bold
    // Call GiftBox for each user 
  );
};

export default ViewOtherPage;
