import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

/**
 * GiftListPage is responsible for displaying a list of gifts.
 */
const GiftListPage = () => {
  /**
   * State hook to store gifts.
   * @type {Array} gifts - Array of gift objects.
   */
  const [gifts, setGifts] = useState([]);

  /**
   * Effect hook to fetch gifts data when the component mounts.
   */
  // useEffect(() => {
  //   /**
  //    * Function to fetch gifts data from the API.
  //    * @async
  //    */
  //   const fetchGifts = async () => {
  //     const response = await axios.get("http://localhost:8000/gifts/");
  //     setGifts(response.data.gifts);
  //   };
  //   fetchGifts();
  // }, []);

  /**
   * Renders the component.
   */
  return (
    <div className="container">
      <h1>Gifts</h1>
      <div className="contentBox">
        {gifts.map((gift) => (
          <div key={gift.id}>
              {gift.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftListPage;
