import React, { useState } from 'react';
import axios from 'axios';
import { MemberContext } from '../context/MemberContext'; 
import { useContext, useEffect} from 'react';
import "../App.css";

// New Branch

const AddOrEditGift = ({ member, isSelfView, closePopup, fetchGifts, addOrEdit, gift_id, hoverTexts}) => {

  // const { selfMember, allMembers, API_BASE_URL } = useContext(MemberContext);
  const [visibleToAll, setVisibleToAll] = useState(true); // Default visibility is all members
  const [visibleToMembers, setVisibleToMembers] = useState(new Set());
  const [itemName, setItemName] = useState('');
  const [exactItem, setExactItem] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [notes, setNotes] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [linkName, setLinkName] = useState('');
  const [boughtStatus, setBoughtStatus] = useState('none');

  const handleVisibleToAllChange = () => {
    if (!visibleToAll) {
      setVisibleToAll(true);
      const allMemberIds = new Set(allMembers.map(member => member.member_id));
      setVisibleToMembers(allMemberIds);
    } else {
      setVisibleToAll(false);
      setVisibleToMembers(new Set());  // Clear all individual checkboxes
    }
  };

  const handleSelectedMemberChange = (memberId) => {
    if (visibleToAll) {
      handleVisibleToAllChange(); // Uncheck 'All' when any specific member is selected
    } 
    setVisibleToMembers(currentVisibleToMembers => {
      const newVisibleToMembers = new Set(currentVisibleToMembers);
      if (newVisibleToMembers.has(memberId)) {
        newVisibleToMembers.delete(memberId); // Remove memberId if it's already present.
      } else {
        newVisibleToMembers.add(memberId); // Add memberId if it's not already present.
      }
      return newVisibleToMembers;
    });
  };
  
  const handleCheckboxChange = (type, memberId = null) => {
    if (type === 'member') {
      setVisibleToAll(false); // Uncheck 'All' when any specific member is selected

      if (visibleToMembers.length === 0){
        setVisibleToMembers(new Set([memberId]));
      } else {
        if (visibleToMembers.has(memberId)) {
          visibleToMembers.delete(memberId); // Remove memberId if it's already present.
        } else {
          visibleToMembers.add(memberId); // Add memberId if it's not already present.
        };
      };
    } else if (type === 'all') {
      setVisibleToAll(!visibleToAll);
      if (visibleToAll) {
        const allMemberIds = new Set(allMembers.map(member => member.member_id));
        setVisibleToMembers(allMemberIds);
      } else {
        setVisibleToMembers(new Set());
      };
    };
  };

  const fetchGift = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/get_gift_by_id/${gift_id}`);
      // const response = await axios.get(`${API_BASE_URL}/get_gift_by_id/${gift_id}`);

      const giftData = response.data.gift;
      setItemName(giftData.item_name);
      setExactItem(giftData.exact_item);
      setMultiple(giftData.multiple);
      setNotes(giftData.notes);
      setOtherNotes(giftData.other_notes);
      setBoughtStatus(giftData.bought);
      if (giftData.links && giftData.links.length > 0) {
        setLinkURL(giftData.links[0].url);
        setLinkName(giftData.links[0].name);
      }

      // Update individual member visibility based on gift data
      const newVisibleToMembers = new Set(giftData.visible_to);
      setVisibleToMembers(newVisibleToMembers);
      setVisibleToAll(giftData.visible_to.length === allMembers.length);
      // console.log("giftData.visible_to: ", giftData.visible_to);
      // console.log("newVisibleToMembers: ", newVisibleToMembers);
      // console.log("visibleToMembers: ", visibleToMembers);
      // console.log("giftData.visible_to: ", giftData.visible_to);
      // console.log("VisibleToAll: ", VisibleToAll);

    } catch (error) {
      console.error('Error fetching gift:', error);
    }
  };
  
  useEffect(() => {
    if (addOrEdit === 'Edit') {
      fetchGift();
    }
  }, [addOrEdit, gift_id]); // Re-fetch if gift_id changes

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (addOrEdit === 'Add') {
      formData.append("giftAdder", selfMember.member_id);
    }// Do not change giftAdder on edit
    formData.append("giftReceiver", member.member_id);
    formData.append("itemName", itemName);
    formData.append("exactItem", exactItem);
    formData.append("multiple", multiple);
    formData.append("notes", notes);
    formData.append("otherNotes", otherNotes);
    formData.append("linkURL", linkURL);
    formData.append("linkName", linkName);
    formData.append("boughtStatus", boughtStatus);

    // Setting visibility - Always add selfMember to avoid invisible gifts
    visibleToMembers.add(selfMember.member_id);
    const visibleMemberArray = Array.from(visibleToMembers); // Convert Set to Array to pass to Django
    formData.append("visibility", JSON.stringify(visibleMemberArray));

    // Axios request for add or edit
      if (addOrEdit === 'Add') {
        axios.post(`http://localhost:8000/add_gift/`, formData)
        // axios.post(`${API_BASE_URL}/add_gift/`, formData)

          .then((response) => {
            console.log('Gift added successfully');
            fetchGifts();
            closePopup();
          })
          .catch((error) => {
            console.log('Gift add failed');
            console.log(error);
          });
      } else {
        axios.put(`http://localhost:8000/edit_gift_by_id/${gift_id}/`, formData)
        // axios.put(`${API_BASE_URL}/edit_gift_by_id/${gift_id}/`, formData)
          .then((response) => {
            console.log('Gift edited successfully');
            fetchGifts(); // Fetch gifts again to update the list
            closePopup(); // Close the popup on successful add
          })
          .catch((error) => {
            console.log('Gift edit failed');
            console.log(error);
          });
      }
  };

  return (
    <div className="modalBackground">
      <div className="handleGiftBox">
        <h1>{addOrEdit} gift for {member.member_name}</h1>
        <form onSubmit={handleSubmit}>
        <div className="handleGiftGroup">
          <label>Gift Name:</label>
            <input
              type="text"
              name="itemName"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="handleGiftGroup" title={hoverTexts.exactHoverText}>
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
          <div className="handleGiftGroup" title={hoverTexts.multipleHoverText}>
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
          <div className="handleGiftGroup" title={hoverTexts.notesHoverText}>
            <label>Notes:</label>
            <textarea
              name="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            ></textarea>
          </div>
          {!isSelfView && (
            <div>
              <div className="handleGiftGroup" title={hoverTexts.otherNotesHoverText}>
                <label>Notes (not visible to {member.member_name}):</label>
                <textarea
                  name="otherNotes"
                  value={otherNotes}
                  onChange={e => setOtherNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
          <div className="handleGiftGroup" title={hoverTexts.linkHoverText}>
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
            <div className="boughtStatus" title={hoverTexts.boughtHoverText}>
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
            <div className="handleGiftGroup">
              <label>Visible to:</label>
              <label>All
              <input type="checkbox" name="allMembers" checked={visibleToAll} onChange={handleVisibleToAllChange} />
              </label>
              <div className="checkboxesVertical">
                {allMembers.map(member => (
                  <label key={member.member_id}>
                    {member.member_name}
                    <input
                      type="checkbox"
                      name="user"
                      value={member.member_id}
                      checked={visibleToMembers.has(member.member_id) && !visibleToAll}
                      // Should be checked only if the gift is visible to the member, but not visible to all members.
                      onChange={() => handleSelectedMemberChange(member.member_id)}
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
      </div>
    );
};

export default AddOrEditGift;