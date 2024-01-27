import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GiftBox from '../components/GiftBox'; 
import { MemberContext } from '../context/MemberContext'; 

// ViewOtherPage component is responsible for rendering the gift boxes for all non-self members
const ViewOtherPage = () => {
  // Destructure `otherMembers` from the context which contains all members except the current user.
  const { otherMembers } = useContext(MemberContext);

  // State for storing all the gifts fetched from the database.
  const [allGifts, setAllGifts] = useState([]);

  // Fetches all gift data when the component mounts.
  useEffect(() => {
    const fetchAllGifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_all_gifts');
        // Update the `allGifts` state with the fetched data.
        setAllGifts(response.data);
      } catch (error) {
        // If there's an error during the fetch, log it to the console.
        console.error("Error fetching all gifts: ", error);
      }
    };

    fetchAllGifts();
  }, []);

  return (
    <div>
      {/* Map over `otherMembers` to render a GiftBox for each member */}
      {otherMembers.map((member) => {
        // Filter `allGifts` to only include gifts where `gift_receiver` matches `member.member_id`
        const memberGifts = allGifts.filter(gift => gift.gift_receiver === member.member_id);
        // Render the `GiftBox` component passing the `member` and their specific `gifts`
        return <GiftBox key={member.member_id} member={member} gifts={memberGifts} />;
      })}
    </div>
  );
};

export default ViewOtherPage;