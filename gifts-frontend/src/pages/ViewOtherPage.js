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

  return (
    <div className="container">
      <h1>View Other</h1> 
      {/* Change to {name} once switched to a dropdown . */}
      <form onSubmit={handleSubmit}>
        <label>
          Gift Name:
          <input type="text" name="itemName" required />
        </label>
        <label>
          Yes:
          <input type="radio" name="exactItem" value="yes" required />
        </label>
        <label>
          No:
          <input type="radio" name="exactItem" value="no" required />
        </label>
        <label>
          Multiple Items:
          <input type="radio" name="multiple" value="yes" required />
        </label>
        <label>
          Single item:
          <input type="radio" name="multiple" value="no" required />
        </label>
        Visibile to:
        {/* {users.map((user, index) => (
          <label key={index}>
            {user.name}:
            <input type="checkbox" name="user" value={user.id} />
          </label>
        ))} */}
        <label>
          Notes:
          {/* Control the size of the textarea by using the rows and cols attributes, or use CSS to set a specific width and height. */}
          <input type="textarea" name="itemName" required />
        </label>
        <div className="buttonContainer">
          <button type="submit">Add Gift</button>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, true)}
          >
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewOtherPage;
