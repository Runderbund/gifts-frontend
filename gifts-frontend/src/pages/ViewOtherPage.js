import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GiftBox from '../components/GiftBox/GiftBox'; 
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../context/MemberContext'; 

// ViewOtherPage component is responsible for rendering the gift boxes for all non-self members
const ViewOtherPage = () => {
  // Destructure `otherMembers` from the context which contains all members except the current user.
  const { otherMembers, selfMember } = useContext(MemberContext);
  // State for storing all the gifts fetched from the database.
  const [allGifts, setAllGifts] = useState([]);
  const navigate = useNavigate();
  
  // Redirect to the select page if the selfMember is not set.
  useEffect(() => {
    if (!otherMembers) {
      navigate('/select');
    }

  }, [otherMembers, navigate])

  // Fetches all gift data when the component mounts.
  useEffect(() => {
    const fetchAllGifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_all_gifts_other/');
        // Change to pass selfMember to filter visible gifts
        // Update the `allGifts` state with the fetched data.
        setAllGifts(response.data.gifts);
      } catch (error) {
        console.error("Error fetching all gifts: ", error);
      }
    };

    fetchAllGifts();
  }, []);

  // Need to sort gifts by id to avoid duplicates from join table.
  // const uniqueGifts = allGifts.filter((gift) =>
    

  console.log(otherMembers);
  console.log(allGifts);


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