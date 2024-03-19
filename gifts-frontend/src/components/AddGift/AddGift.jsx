import React from 'react';
import axios from 'axios';
import { MemberContext } from '../../context/MemberContext'; 
import { useContext } from 'react';
import "../../App.css";



const AddGift = ({ member, isSelfMember, closePopup }) => {

  const { otherMembers } = useContext(MemberContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append("itemName", event.target.meetName.value);
    formData.append("exactItem", event.target.exactItem.value);
    formData.append("multiple", event.target.multiple.value);
    formData.append("user", event.target.user.value);
    formData.append("notes", event.target.notes.value);


    // Axios post request to upload the file
    axios.post("http://localhost:8000/create_gift/", formData)
      .then((response) => {
        console.log("Gift added successfully");
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
          <label>Exact Item Please:</label>
          <input type="radio" name="exactItem" value="yes" required />
          <label>Similar Items Okay:</label>
          <input type="radio" name="exactItem" value="no" required />
        </div>
        <div className="addGiftGroup">
          <label>Multiple Items:</label>
          <input type="radio" name="multiple" value="yes" required />
          <label>Single item:</label>
          <input type="radio" name="multiple" value="no" required />
        </div>
        <div className="addGiftGroup">
          <label>Notes:</label>
          <textarea name="notes" required></textarea>
        </div>
        <div className="addGiftGroup">
          <label>Visibile to:</label>
          {/* {users.map((user, index) => (
          <label key={index}>
            {user.name}:
            <input type="checkbox" name="user" value={user.id} />
          </label>
        ))} */}
          <textarea name="notes" required></textarea>
        </div>
        
        
        <div className="buttonContainer">
          <button type="submit">Add Gift</button>
          <button type="button" onClick={closePopup}>Cancel</button>
        </div>
        </form>
      </div>
    );
};

export default AddGift;
