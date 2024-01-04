import React from "react";
import "../App.css";

/**
 * ViewOther is responsible for displaying the view of all gifts.
 * @component
 */
const ViewOtherPage = () => {
  // Render the form for file upload
  return (
    <div className="container">
      <h1>Upload Meet Results</h1>
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
          <input type="radio" name="exactItem" value="yes" required />
        </label>
        <label>
          Single item:
          <input type="radio" name="exactItem" value="no" required />
        </label>
        {users.map((user, index) => (
          <label key={index}>
            {user.name}:
            <input type="checkbox" name="user" value={user.id} />
          </label>
        ))}
        <div className={styles.buttonContainer}>
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
