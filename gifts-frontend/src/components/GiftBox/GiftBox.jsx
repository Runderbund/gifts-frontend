import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const GiftBox = ({ member }) => {
  const [giftData, setGiftData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGiftData = async () => {
      setIsLoading(true);
      try {
        // Assuming you have an endpoint to get gifts for a specific member
        const response = await axios.get(`http://localhost:8000/get_gifts_for_member/${member.member_id}`);
        setGiftData(response.data);
      } catch (error) {
        console.error("Error fetching gift data: ", error);
        setError('Failed to load gifts.');
      } finally {
        setIsLoading(false);
      }
    };

    if (member) {
      fetchGiftData();
    }
  }, [member]);

  if (isLoading) return <div>Loading gifts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{member.member_name}'s Gifts</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Exact?</th>
            <th>Multiple?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {giftData.map((gift) => (
            <tr key={gift.gift_id}>
              <td>{gift.item_name}</td>
              <td>{gift.exact_item ? 'Yes' : 'No'}</td>
              <td>{gift.multiple ? 'Yes' : 'No'}</td>
              <td>{gift.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GiftBox;
