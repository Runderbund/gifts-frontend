import axios from 'axios';
import "../../App.css";

const DeleteGift = ({ member, closePopup, fetchGifts, gift_id }) => {
    
  const deleteGift = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete_gift_by_id/${gift_id}`);
      fetchGifts();
      closePopup();
      console.log("Gift deleted successfully");
    } catch (error) {
      console.log("Gift delete failed");
      console.log(error);
    }
  };

  return (
    <div className="addGiftBox">
      <h1>Delete gift? {member.name}</h1>
      <div className="buttonContainer">
          <button type="submit" onClick={deleteGift}>Delete Gift</button>
          <button type="button" onClick={closePopup}>Cancel</button>
      </div>
    </div>
  );
    
  };

export default DeleteGift;