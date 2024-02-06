import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GiftBox from '../components/GiftBox/GiftBox'; 
import { MemberContext } from '../context/MemberContext'; 

/**
 * ViewSelf is responsible for displaying the view of all gifts for the current user.
 * @component
 */
const ViewSelfPage = () => {
  const { selfMember } = useContext(MemberContext);
  const [allGifts, setAllGifts] = useState([]);

  useEffect(() => {
    const fetchAllGifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_all_gifts');
        setAllGifts(response.data);
      } catch (error) {
        console.error('Error fetching all gifts: ', error);
      }
    };

    fetchAllGifts();
  }, []);

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
