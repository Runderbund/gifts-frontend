import React, { useState } from 'react';
import axios from 'axios';
import { MemberContext } from '../context/MemberContext'; 
import { useContext } from 'react';
import "../App.css";

const AddGift = ({ member, isSelfView, closePopup, fetchGifts, addOrEdit}) => {

  const { selfMember, allMembers } = useContext(MemberContext);
  const [allSelected, setAllSelected] = useState(true); // Default visibility is all members
  const [selectedMembers, setSelectedMembers] = useState({});
  const [itemName, setItemName] = useState('');
  const [exactItem, setExactItem] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [notes, setNotes] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [linkName, setLinkName] = useState('');
  const [boughtStatus, setBoughtStatus] = useState('none');

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

  const handleAddSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append("giftAdder", selfMember.member_id);
    formData.append("giftReceiver", member.member_id);
    formData.append("itemName", itemName);
    formData.append("exactItem", exactItem);
    formData.append("multiple", multiple);
    formData.append("notes", notes);
    formData.append("otherNotes", otherNotes);
    formData.append("linkURL", linkURL);
    formData.append("linkName", linkName);
    formData.append("boughtStatus", boughtStatus);

    let visibleTo;
    if (allSelected) {
      visibleTo = '0';
    } else if (selfMember !== member) {
      visibleTo = '0'; // If it's a ViewOther, assign '0' (no match to member_id) automatically to signal Visible to All
    } else {
      visibleTo = Object.entries(selectedMembers)
        .filter(([_, isSelected]) => isSelected)
        .map(([id, _]) => id);
      // Always add selfMember to the list of visible members
      if (!visibleTo.includes(selfMember.member_id))
        visibleTo.push(selfMember.member_id);
    }
    
    formData.append("visibility", JSON.stringify(visibleTo));
    //formData can't handle lists. Turn back into a list on backend.

    // Axios post request to upload the file
    // POST
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

  const fetchGift = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/get_gift_by_id/${gift_id}`);
      const giftData = response.data.gift;
      setItemName(giftData.item_name);
      setExactItem(giftData.exact_item);
      setMultiple(giftData.multiple);
      setNotes(giftData.notes);
      setOtherNotes(giftData.other_notes);
      setBoughtStatus(giftData.bought);
      console.log("bought:", giftData.bought);
      if (giftData.links && giftData.links.length > 0) {
        setLinkURL(giftData.links[0].url);
        setLinkName(giftData.links[0].name);
      }
      // setSelectedMembers();
      // Set checkboxes to visible_to members
      // Set allSelected to false if visible_to excludes any members
    } catch (error) {
      console.error('Error fetching gift:', error);
    }
  };
  
  useEffect(() => {
    fetchGift();
  }, [gift_id]); // Re-fetch if gift_id changes
  

  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("exactItem", exactItem);
    formData.append("multiple", multiple);
    formData.append("notes", notes);
    formData.append("otherNotes", otherNotes);
    formData.append("linkURL", linkURL);
    formData.append("linkName", linkName);
    formData.append("boughtStatus", boughtStatus);

    let visibleTo;
    if (allSelected) {
      visibleTo = '0';
    } else if (selfMember !== member) {
      visibleTo = '0'; // If it's a ViewOther, assign '0' (no match to member_id) automatically to signal Visible to All
      // Probably a smoother/clearer way to do this.
    } else {
      visibleTo = Object.entries(selectedMembers)
        .filter(([_, isSelected]) => isSelected)
        .map(([id, _]) => id);
      // Always adds selfMember to the list of visible members
      if (!visibleTo.includes(selfMember.member_id))
        visibleTo.push(selfMember.member_id);
    }
    
    formData.append("visibility", JSON.stringify(visibleTo));
    //formData can't handle lists. Turn back into a list on backend.

    // Axios put request to upload the gift
    axios.put(`http://localhost:8000/edit_gift_by_id/${gift_id}/`, formData)
    .then((response) => {
      console.log("Gift edited successfully");
      fetchGifts(); // Fetch gifts again to update the list
      closePopup(); // Close the popup on successful add
    })
    .catch((error) => {
      console.log("Gift edit failed");
      console.log(error);
    });
  };

  return (
    <div className="handleGiftBox">
      <h1>Add gift for {member.member_name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="addGiftGroup">
        <label>Gift Name:</label>
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="addGiftGroup">
          <label>Exact Item
          <input
            type="radio"
            name="exactItem"
            checked={exactItem === true}
            onChange={() => setExactItem(true)}
            required
          />
          </label>
          <label>Similar Items Okay
          <input
            type="radio"
            name="exactItem"
            checked={exactItem === false}
            onChange={() => setExactItem(false)}
            required
          />
          </label>
        </div>
        <div className="addGiftGroup">
          <label>Multiple Items
          <input
            type="radio"
            name="multiple"
            checked={multiple === true}
            onChange={() => setMultiple(true)}
            required
          />
          </label>
          <label>Single Item
          <input
            type="radio"
            name="multiple"
            checked={multiple === false}
            onChange={() => setMultiple(false)}
            required
          />
          </label>
        </div>
        <div className="addGiftGroup">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          ></textarea>
        </div>
        {!isSelfView && (
          <div>
            <div className="addGiftGroup">
              <label>Notes (not visible to {member.member_name}):</label>
              <textarea
                name="otherNotes"
                value={otherNotes}
                onChange={e => setOtherNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}
        <div className="addGiftGroup">
          <label>Link URL:</label>
          <textarea
            type="text"
            name="linkURL"
            value={linkURL}
            onChange={e => setLinkURL(e.target.value)}
          />
          <label>Link Name:</label>
          <textarea
            type="text"
            name="linkName"
            value={linkName}
            onChange={e => setLinkName(e.target.value)}
          />
        </div>
        {!isSelfView && (
          <div className="boughtStatus">
            <label className="boughtOption none"> None Bought
              <input
                type="radio"
                name="boughtStatus"
                title="none"
                checked={boughtStatus === 'none'}
                onChange={() => setBoughtStatus('none')}
              />
              <span>
              </span>
            </label>
            <label className="boughtOption moreOk"> Bought, More Okay
              <input
                type="radio"
                name="boughtStatus"
                title="moreOk"
                checked={boughtStatus === 'moreOk'}
                onChange={() => setBoughtStatus('moreOk')}
              />
              <span>
              </span>
            </label>
            <label className="boughtOption noMore"> Bought, No More
              <input
                type="radio"
                name="boughtStatus"
                value="noMore"
                checked={boughtStatus === 'noMore'}
                onChange={() => setBoughtStatus('noMore')}
              />
              <span>
              </span>
            </label>
          </div>
        )}
        {isSelfView && (
          <div className="addGiftGroup">
            <label>Visible to:</label>
            <label>All
            <input type="checkbox" name="allMembers" checked={allSelected} onChange={handleAllChange} />
            </label>
            <div>
              {allMembers.map(member => (
                <label key={member.member_id}>
                  {member.member_name}
                  <input
                    type="checkbox"
                    name="user"
                    value={member.member_id}
                    checked={selectedMembers[member.member_id] || false}
                    onChange={() => handleMemberChange(member.member_id)}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
        
        
        <div className="buttonContainer">
          <button type="submit">Submit Gift</button>
          <button type="button" onClick={closePopup}>Cancel</button>
        </div>
        </form>
      </div>
    );
};

export default AddGift;