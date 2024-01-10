import React from "react";
import "../App.css";
import axios from "axios";

/**
 * ViewOther is responsible for displaying the view of all gifts.
 * @component
 */
const ViewOtherPage = () => {
  // Render the form for adding a gift object

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append("itemName", event.target.meetName.value);
    formData.append("exactItem", event.target.exactItem.value);
    formData.append("multiple", event.target.multiple.value);
    formData.append("user", event.target.user.value);
    formData.append("notes", event.target.notes.value);


    // Axios post request to upload the fields to the backend as a Gift object
    axios
      .post("http://localhost:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Clear the fields and say Gift Updated beneath
      .then((response) => {
        console.log("Gift uploaded successfully");
      })
      .catch((error) => {
        console.log("Gift upload failed");
        console.log(error);
      });
  };
};

export default ViewOtherPage;
