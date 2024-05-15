import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GiftBox from '../components/GiftBox'; 
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../context/MemberContext'; 

// ViewOtherPage component is responsible for rendering the gift boxes for all non-self members
const ViewOtherPage = () => {
  // Destructure `otherMembers` from the context which contains all members except the current user.
  const { otherMembers, selfMember } = useContext(MemberContext);
  // State for storing all the gifts fetched from the database.
  const [otherGifts, setOtherGifts] = useState([]);
  const navigate = useNavigate();
  
  const fetchOtherGifts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/get_gifts_other/${selfMember.member_id}/`, {
      }, [selfMember]);
      const giftsData = response.data.gifts;
    
      setOtherGifts(Object.values(giftsData));
    } catch (error) {
      console.error('Error fetching all gifts: ', error);
    }
  };

  useEffect(() => {
    if (!selfMember) {
      navigate('/select'); // If selfMember is not set, navigate to the select page
    }
    else {
      fetchOtherGifts(); // Otherwise, fetch all gifts for otherMembers
    }
  }, [selfMember, navigate])

  return (
    <div  className="container">
      <h1>Viewing as {selfMember.member_name}</h1>
      {/* Map over `otherMembers` to render a GiftBox for each member */}
      {otherMembers.map((member) => {
        // Filter `otherGifts` to only include gifts where `gift_receiver` matches `member.member_id`
        const memberGifts = otherGifts.filter(gift => gift.gift_receiver === member.member_name);
        // Render the `GiftBox` component passing the `member` and their specific `gifts`
        return <GiftBox key={member.member_id} member={member} gifts={memberGifts} fetchGifts={fetchOtherGifts}/>;
      })}
    </div>
  );
};

export default ViewOtherPage;