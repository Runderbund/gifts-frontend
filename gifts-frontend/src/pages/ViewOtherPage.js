import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import GiftBox from "../components/GiftBox";
import { MemberContext } from '../context/MemberContext';

/**
 * ViewOther is responsible for displaying the view of all gifts.
 * @component
 */
const ViewOtherPage = () => {
  const [giftData, setGiftData] = useState(null); // State to store the gift data
  const { selfMember, otherMembers, setSelfMember, setOtherMembers } = useContext(MemberContext);



  // Effect to fetch the gift data from the server
  useEffect(() => {
    const fetchGiftData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_all_gifts`);
        setGiftData(response.data.gifts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchGiftData();
  }, []);

  useEffect(() => {
    // Function to fetch members
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_all_members/`);
        // Sort members alphabetically by member_name
        const sortedMembers = response.data.sort((a, b) => 
          a.member_name.localeCompare(b.member_name)
        );
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div>
      {/* Loop through members and render GiftBox for each non-selected member */}
      {members.filter(member => member.member_id !== selectedMember.member_id)
              .map(nonSelectedMember => (
        <GiftBox key={nonSelectedMember.member_id} member={nonSelectedMember} />
      ))}
    </div>
  );
    // For each user, display their name, then a table of their gifts
    // Name at top, centered and bold
    // Call GiftBox for each user 
  
};

export default ViewOtherPage;
