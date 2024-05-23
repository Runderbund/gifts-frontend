import React, { useContext, useState} from 'react';
import { MemberContext } from '../context/MemberContext';
import AddOrEditGift from './AddOrEditGift';
import DeleteGift from './DeleteGift';
import "../App.css";

// The GiftBox component takes in three props: 
// `member` - an object containing information about a member,
// `gifts` - an array of gifts related to that member.
// `fetchGifts` - a function to fetch gifts for the member.
// Creates a table structure for displaying gifts for each member
const GiftBox = ({ member, gifts, fetchGifts }) => {

  const { selfMember, allMembers } = useContext(MemberContext);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [showDeleteGift, setShowDeleteGift] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState('');
  const [giftId, setGiftId] = useState(null);

  const isSelfView = selfMember && selfMember === member;

  const handleToggleGiftPopup = (mode, id = null) => {
    setAddOrEdit(mode);
    setGiftId(id);
    setShowGiftPopup(!showGiftPopup);
  };

  const toggleDeleteGiftPopup = (giftId) => {
    setGiftId(giftId)
    setShowDeleteGift(!showDeleteGift);
  };

  const hoverTexts = {
    exactHoverText: "Do you want the exact model you're listing (e.g. Sony WF-1000XM5 Earbuds) or any similar item (e.g. any wireless earbuds)?",
    multipleHoverText: "Do you mind getting multiple copies of the same item? E.g., if you want multiple copies of a book, or if you only want one of each item.",
    notesHoverText: "Any additional notes you want people to see. E.g., if you want a specific color, size, or brand.",
    otherNotesHoverText: "These notes are not available to the gift receiver. E.g., if you want to tell people which type of fuzzy socks you got the person, so you don't overlap, without telling the person getting the socks.",
    linkHoverText: "Any links to the item you want. E.g., Amazon, Etsy, or a specific store.",
    boughtHoverText: "Mark as not bought (green), bought but more okay (yellow), or bought and no more should be (red)."
  };

  return (
    <div>
      <h1>{member.member_name}'s Gifts</h1>
      <div className="giftBox">
        <table>
          <thead>
              <tr className="header">
                <th className="noBorderColumn"></th>
                <th className="noBorderColumn"></th>
                <th>Gift Name</th>
                <th title={hoverTexts.exactHoverText}>Exact or Similar Item?</th>
                <th title={hoverTexts.multipleHoverText}>Multiple Copies </th>
                <th className="linksAndNotes" title={hoverTexts.notesHoverText}>Notes</th>
                {!isSelfView && ( 
                  <th className="linksAndNotes" title={hoverTexts.otherNotesHoverText}>Notes (Not visible to receiver)</th>
                )}
                <th className="linksAndNotes" title={hoverTexts.linkHoverText}>Link(s)</th>
                {isSelfView && <th>Visibility</th>}
                {!isSelfView && ( 
                  <th title={hoverTexts.boughtHoverText}>Bought</th>
                )}
                {/* Only shows this column if the selfMember is the same as the member the giftBox is being called for. This should only be called from the selfView  */}
              </tr>
            </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.gift_id} className="row">
                <td className="noBorderColumn">
                  <button onClick={ () => toggleDeleteGiftPopup(gift.gift_id)}>
                  Delete
                  </button>
                </td>
                <td className="noBorderColumn">
                  <button onClick={ () => handleToggleGiftPopup('Edit', gift.gift_id)}>
                  Edit
                  </button>
                </td>
                <td>{gift.item_name}</td>
                <td>{gift.exact_item ? 'Exact' : 'Similar'}</td>
                <td>{gift.multiple ? 'Yes' : 'No'}</td>
                <td>{gift.notes}</td>
                {!isSelfView && (
                  <td>{gift.other_notes}</td>
                )}
                <td>
                {gift.links && gift.links.length > 0 && (
                  <a href={gift.links[0].url} target="_blank" rel="noopener noreferrer">
                    {/* Opens link in new window, without sending URL of current page */}
                    {gift.links[0].name || 'View Link'}
                  </a>
                )}
                </td>
                {isSelfView && (
                  <td>
                    {/* Shows All if visible to every member, otherwise lists member names */}
                  {gift.visible_to.length === allMembers.length ? 'All' : gift.visible_to.join(', ')}
                  </td>
                )}
                {!isSelfView && (
                  <td>
                    <div 
                    className={`boughtBox ${gift.bought}`} 
                    title={
                      gift.bought === 'none' ? "Don't buy any more" :
                      gift.bought === 'moreOk' ? "More OK" :
                      gift.bought === 'noMore' ? "No more" : ""
                    }>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      <button onClick={() => handleToggleGiftPopup('Add')}>Add Gift for {member.member_name}</button>

      {/* Modal popups for adding, editing, or deleting a gift. */}
      <div>
        {showGiftPopup && <AddOrEditGift member={member} isSelfView={isSelfView} closePopup={handleToggleGiftPopup} fetchGifts={fetchGifts} addOrEdit={addOrEdit} gift_id={giftId} hoverTexts={hoverTexts}/>}
        {showDeleteGift && <DeleteGift member={member} closePopup={toggleDeleteGiftPopup} fetchGifts={fetchGifts} gift_id={giftId}/>}
      </div>

    </div>
  );
};
export default GiftBox;