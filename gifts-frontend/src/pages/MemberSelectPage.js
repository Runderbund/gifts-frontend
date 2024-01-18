import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MemberContext } from '../context/MemberContext';

const MemberSelectPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const { setMember } = useContext(MemberContext);

  useEffect(() => {
    // Function to fetch members
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_all_members/`);
        // Sort members alphabetically by member_name
        // localCompare makes sure sorting varies by locale, probably not important for just a few people, but good practice
        const sortedMembers = response.data.sort((a, b) => 
          a.member_name.localeCompare(b.member_name)
        );
        setMembers(sortedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleSelectMember = (event) => {
    setSelectedMember(event.target.value);
    // Find the member object by member_name
    const member = members.find(m => m.member_name === event.target.value);
    setMember(member); // Update the context with the selected member object
  };

  return (
    <div>
      <select value={selectedMember} onChange={handleSelectMember}>
        <option value="">Select a family member</option>
        {members.map((member) => (
          <option key={member.member_id} value={member.member_name}>
            {member.member_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MemberSelectPage;
