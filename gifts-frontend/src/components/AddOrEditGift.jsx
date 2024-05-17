import React, { useState } from 'react';
import axios from 'axios';
import { MemberContext } from '../context/MemberContext'; 
import { useContext, useEffect} from 'react';
import "../App.css";

const AddOrEditGift = ({ member, isSelfView, closePopup, fetchGifts, addOrEdit, gift_id, hoverTexts}) => {

  const { selfMember, allMembers } = useContext(MemberContext);
  const [visibleToAll, setVisibleToAll] = useState(true); // Default visibility is all members
  const [visibleToMembers, setVisibleToMembers] = useState({});
  const [itemName, setItemName] = useState('');
  const [exactItem, setExactItem] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [notes, setNotes] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [linkName, setLinkName] = useState('');
  const [boughtStatus, setBoughtStatus] = useState('none');

  const handleAllChange = () => {
    setVisibleToAll(!visibleToAll);
    // When All is selected, uncheck  individual member selections
    setVisibleToMembers({});
  };

  const handleSelectedMemberChange = (memberId) => {
    // If any member is selected, uncheck 'All'
    setVisibleToAll(false);
    // Update the selected members state
    setVisibleToMembers(prevVisibleToMembers => ({
      ...prevVisibleToMembers,
      [memberId]: !prevVisibleToMembers[memberId]
    }));
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
      if (giftData.links && giftData.links.length > 0) {
        setLinkURL(giftData.links[0].url);
        setLinkName(giftData.links[0].name);
      }

      // Update individual member visibility based on gift data
      const memberVisibility = {};
      giftData.visible_to.forEach(memberName => {
        const member = allMembers.find(m => m.member_name === memberName);
        if (member) {
          memberVisibility[member.member_id] = true;
        }
      });

      setVisibleToMembers(memberVisibility);
      const isVisibleToAll = giftData.visible_to.length === allMembers.length;
      setVisibleToAll(isVisibleToAll);

      // console.log("giftData.visible_to", giftData.visible_to);
      // console.log("memberVisibility:", memberVisibility);
      // console.log("visibleToMembers", visibleToMembers);
      // console.log("giftData.visible_to", giftData.visible_to);
      // console.log("isVisibleToAll", isVisibleToAll);

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

    // Form data for file upload
    const formData = new FormData();

    // Do not change giftAdder on edit
    if (addOrEdit === 'Add') {
      formData.append("giftAdder", selfMember.member_id);
    }
    formData.append("giftReceiver", member.member_id);
    formData.append("itemName", itemName);
    formData.append("exactItem", exactItem);
    formData.append("multiple", multiple);
    formData.append("notes", notes);
    formData.append("otherNotes", otherNotes);
    formData.append("linkURL", linkURL);
    formData.append("linkName", linkName);
    formData.append("boughtStatus", boughtStatus);

    // Setting visibility
    let visibleTo;
    if (visibleToAll) {
      visibleTo = '0';
    } else if (selfMember !== member) {
      visibleTo = '0'; // If it's a ViewOther, assign '0' (no match to member_id) automatically to signal Visible to All
    } else {
      visibleTo = Object.entries(visibleToMembers)
        .filter(([_, isSelected]) => isSelected)
        .map(([id, _]) => id);
      // Always add selfMember to the list of visible members
      if (!visibleTo.includes(selfMember.member_id))
        visibleTo.push(selfMember.member_id);
    }
    
    formData.append("visibility", JSON.stringify(visibleTo));
    //formData can't handle lists. Turn back into a list on backend.

    // Axios request for add or edit
      if (addOrEdit === 'Add') {
        axios.post('http://localhost:8000/add_gift/', formData)
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
              <input type="checkbox" name="allMembers" checked={visibleToAll} onChange={handleAllChange} />
              </label>
              <div>
                {allMembers.map(member => (
                  <label key={member.member_id}>
                    {member.member_name}
                    <input
                      type="checkbox"
                      name="user"
                      value={member.member_id}
                      checked={(visibleToMembers[member.member_id] && !visibleToAll) || false }
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