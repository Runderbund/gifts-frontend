import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

/**
 * ViewAll is responsible for displaying the view of all gifts.
 * @component
 */
const ViewAllPage = () => {

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
    <div>
      {/* Do loop for each user. Name at top, centered and bold, then table for each */}
      <h1>
        Name
      </h1>
      <table>
        <thead>
          <tr>
            {/* Make hovertext for explanations */}
            <th>Item</th>
            <th>Exact?</th>
            <th>Multiple?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {giftData.map((gift) => (
            // Add conditional to match each user in turn
            // Add conditional to only show visibility = All
            <tr key={gift.gift_id}>  
              <td>{gift.name}</td>
              <td>{gift.exact}</td>
              <td>{gift.multiple}</td>
              <td>{gift.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllPage;
