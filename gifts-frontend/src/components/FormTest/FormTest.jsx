import React, { useState } from 'react';
import axios from 'axios';
import { MemberContext } from '../../context/MemberContext'; 
import { useContext } from 'react';
import "../../App.css";

const FormTest = ({ member, isSelfView, closePopup }) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();

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
    <div className="testFormBox">
      {/* No CSS Yet */}
      <form onSubmit={handleSubmit}>
        
      </form>
    </div>
    );
};

export default FormTest;
