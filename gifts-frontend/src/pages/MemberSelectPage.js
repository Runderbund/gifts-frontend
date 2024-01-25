import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MemberContext } from '../context/MemberContext';

const MemberSelectPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const { setSelfMember, setOtherMembers } = useContext(MemberContext);

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
    const value = event.target.value;
    setSelectedMember(value);

    // Find the member object by member.name
    const self = members.find(m => m.member_name === value);
    setSelfMember(self); // Update the context with the selected member object

    // Filter out the self member to get other members
    const others = members.filter(m => m.member_name !== value);
    setOtherMembers(others); // Update the context with the other members
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

// Add redirect to ViewOtherPage after selecting a member