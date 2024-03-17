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
  const { allMembers } = useContext(MemberContext);
  // State for storing all the gifts fetched from the database.
  const [allGifts, setAllGifts] = useState([]);
  const navigate = useNavigate();

  const fetchAllGifts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_all_gifts/');
      const giftsData = response.data.gifts;

      const selfGifts = giftsData.filter(gift => {
        // Checks if the gift is for the selfMember and if the gift_id is unique
        if (gift.gift_receiver === selfMember.member_id) {
          return true;
        }
        return false;
      })
    
    // Create an object to hold gifts by ID with their visibility
      const giftsById = {};
      console.log('selfGifts: ', selfGifts)
      console.log('giftsById: ', giftsById)

      selfGifts.forEach((gift) => {
        const memberObject = allMembers.find(member => member.member_id === gift.visible_to);
        const memberName = memberObject.member_name;

        
        if (!giftsById[gift.gift_id]) {
          // If the gift hasn't been added yet, add it with the member who can see it
          giftsById[gift.gift_id] = {
            ...gift,
            visible_to: [memberName],
          };
        } else {
          // If it has been added, just push the new member into the `visible_to` array
          giftsById[gift.gift_id].visible_to.push(memberName);
        }
      });

      setAllGifts(Object.values(giftsById)); // Now this will be an array of objects, each object including a visible_to array
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