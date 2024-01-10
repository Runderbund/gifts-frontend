import React from 'react';
import styles from './AddGift.module.css';

const AddGift = () => {
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

export default AddGift;
