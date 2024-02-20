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
  const { selfMember } = useContext(MemberContext);
  // State for storing all the gifts fetched from the database.
  const [allGifts, setAllGifts] = useState([]);
  const navigate = useNavigate();

  const fetchAllGifts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_all_gifts/');
      setAllGifts(response.data.gifts);
    } catch (error) {
      console.error('Error fetching all gifts: ', error);
    }
  };

  useEffect(() => {
    if (!selfMember) {
      navigate('/select');
      console.log('No selfMember');
    }
    fetchAllGifts();
  }, [selfMember, navigate])

  // Filter the gifts for selfMember from allGifts
  const selfGifts = allGifts.filter(gift => gift.gift_receiver === selfMember.member_id);

  return (
    <div>
      {selfMember && (
        <GiftBox member={selfMember} gifts={selfGifts} />
      )}
    </div>
  );
};

export default ViewSelfPage;
