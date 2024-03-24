import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GiftBox from '../components/GiftBox/GiftBox'; 
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../context/MemberContext'; 

/**
 * ViewSelf is responsible for displaying the view of all gifts for the current user.
 * @component
 */
const ViewSelfPage = () => {
  // Destructure `selfMember` from the context
  const { selfMember, allMembers } = useContext(MemberContext);
  // State for storing all the gifts fetched from the database.
  const [allGifts, setAllGifts] = useState([]);
  const navigate = useNavigate();

  const fetchAllGifts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_all_gifts_self/', {
        params: {
          member_id: selfMember.member_id // Using member_id from selfMember object
        }
      });
      const giftsData = response.data.gifts;
    
      setAllGifts(Object.values(giftsData)); // Now this will be an array of objects, each object including a visible_to array
    } catch (error) {
      console.error('Error fetching all gifts: ', error);
    }
  };

  useEffect(() => {
    if (!selfMember) {
      navigate('/select');
    }
    fetchAllGifts();
  }, [selfMember, navigate])

  return (
    <div>
      {selfMember && (
        <GiftBox member={selfMember} gifts={allGifts} />
      )}
    </div>
  );
};

export default ViewSelfPage;