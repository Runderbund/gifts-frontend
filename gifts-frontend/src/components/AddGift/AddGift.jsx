import React, { useState } from 'react';
import axios from 'axios';
import { MemberContext } from '../../context/MemberContext'; 
import { useContext } from 'react';
import "../../App.css";

const AddGift = ({ member, isSelfView, closePopup, fetchGifts}) => {

  const { selfMember, allMembers } = useContext(MemberContext);
  const [allSelected, setAllSelected] = useState(true); // Default visibility is all members
  const [selectedMembers, setSelectedMembers] = useState({}); 

  const handleAllChange = () => {
    setAllSelected(!allSelected);
    // When All is selected, uncheck  individual member selections
    setSelectedMembers({});
  };

  const handleMemberChange = (memberId) => {
    // If any member is selected, uncheck 'All'
    setAllSelected(false);
    // Update the selected members state
    setSelectedMembers(prevSelectedMembers => ({
      ...prevSelectedMembers,
      [memberId]: !prevSelectedMembers[memberId]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append("giftAdder", selfMember.member_id);
    formData.append("giftReceiver", member.member_id);
    formData.append("itemName", event.target.itemName.value);
    formData.append("exactItem", event.target.exactItem.value);
    formData.append("multiple", event.target.multiple.value);
    formData.append("notes", event.target.notes.value);
    formData.append("linkURL", event.target.linkURL.value);
    formData.append("linkName", event.target.linkName.value);
    // formData.append("dateToRemove", null);
    // formData.append("bought", 0);

    let visibleTo;
    if (allSelected) {
      visibleTo = '0';
    } else if (selfMember !== member) {
      visibleTo = '0'; // If it's a ViewOther, assign '0' (no match to member_id) automatically to signal Visible to All
    } else {
      visibleTo = Object.entries(selectedMembers)
        .filter(([_, isSelected]) => isSelected)
        .map(([id, _]) => id);
    }
    
    formData.append("visibility", JSON.stringify(visibleTo));
    //formData can't handle lists. Turn back into a list on backend.

    // Axios post request to upload the file
    axios.post("http://localhost:8000/add_gift/", formData)
      .then((response) => {
        console.log("Gift added successfully");
        fetchGifts(); // Fetch gifts again to update the list
        closePopup(); // Close the popup on successful add
      })
      .catch((error) => {
        console.log("Gift add failed");
        console.log(error);
      });
  };

  return (
    <div className="addGiftBox">
      <h1>Add gift for {member.member_name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="addGiftGroup">
          <label>Gift Name:</label>
          <input type="text" name="itemName" required />
        </div>
        <div className="addGiftGroup">
          <label>Exact Item
          <input type="radio" name="exactItem" value="exact" required />
          </label>
          {/* Inputs nested in labels to make the text clickable for the radio button */}
          <label>Similar Items Okay
          <input type="radio" name="exactItem" value="similar" required />
          </label>
        </div>
        <div className="addGiftGroup">
          <label>Multiple Items
          <input type="radio" name="multiple" value="multiple" required />
          </label>
          <label>Single Item
          <input type="radio" name="multiple" value="single" required />
          </label>
        </div>
        <div className="addGiftGroup">
          <label>Notes:</label>
          <textarea name="notes"></textarea>
        </div>
        <div className="addGiftGroup">
          <label>Link URL:</label>
          <textarea name="linkURL"></textarea>
          <label>Link Label:</label>
          <textarea name="linkName"></textarea>
        </div>
        {isSelfView && (
          <div className="addGiftGroup">
            <label>Visibile to:</label>
            <label>All
            <input type="checkbox" name="allMembers" checked={allSelected} onChange={handleAllChange} />
            </label>
            {allMembers.map((member) => (
            <div key={member.member_id}>
              <label>
                {member.member_name}
                <input
                  type="checkbox"
                  name="user"
                  value={member.member_id}
                  checked={selectedMembers[member.member_id] || false}
                  onChange={() => handleMemberChange(member.member_id)}
                />
              </label>
            </div>
        ))}
        </div>
      )}
        
        
        <div className="buttonContainer">
          <button type="submit">Add Gift</button>
          <button type="button" onClick={closePopup}>Cancel</button>
        </div>
        </form>
      </div>
    );
};

export default AddGift;
