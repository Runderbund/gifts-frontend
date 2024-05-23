import axios from 'axios';
import "../App.css";

const DeleteGift = ({ member, closePopup, fetchGifts, gift_id }) => {
    
  const deleteGift = async () => {
    try {
      await axios.delete(`http://localhost:8000/delete_gift_by_id/${gift_id}`);
      fetchGifts();
      closePopup();
      console.log("Gift deleted successfully");
    } catch (error) {
      console.log("Gift delete failed");
      console.log(error);
    }
  };

  return (
    <div className="modalBackground">
      <div className="handleGiftBox">
        <h1>Delete gift for {member.member_name}?</h1>
        <div className="buttonContainer">
            <button type="submit" onClick={deleteGift}>Delete Gift</button>
            <button type="button" onClick={closePopup}>Cancel</button>
        </div>
      </div>
      </div>
  );
    
  };

export default DeleteGift;