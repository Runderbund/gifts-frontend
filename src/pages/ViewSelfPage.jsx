import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GiftBox from '../components/GiftBox'; 
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../context/MemberContext'; 

/**
 * ViewSelf is responsible for displaying the view of all gifts for the current user.
 * @component
 */
const ViewSelfPage = () => {
  // Destructure `selfMember` from the context
  const { selfMember } = useContext(MemberContext);
  // State for storing all the gifts fetched from the database.
  const [selfGifts, setSelfGifts] = useState([]);
  const navigate = useNavigate();
  const { BASE_URL } = useContext(MemberContext);


  const fetchSelfGifts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_gifts_self/${selfMember.member_id}/`, {
      }, [selfMember]);
      const giftsData = response.data.gifts;
    
      setSelfGifts(Object.values(giftsData));
    } catch (error) {
      console.error('Error fetching all gifts: ', error);
    }
  };

  useEffect(() => {
    if (!selfMember) {
      navigate('/select'); // If selfMember is not set, navigate to the select page
    }
    else {
      fetchSelfGifts(); // Otherwise, fetch all gifts for selfMembers
    }
  }, [selfMember, navigate])

  return (
    <div className="container">
      {selfMember && (
        <>
          <h1>Viewing as {selfMember.member_name}</h1>
          <GiftBox member={selfMember} gifts={selfGifts} fetchGifts={fetchSelfGifts}/>
        </>
      )}
    </div>
  );
};

export default ViewSelfPage;