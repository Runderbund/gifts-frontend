import React, { useContext, useState} from 'react';
import { MemberContext } from '../../context/MemberContext';
import ManageGift from '../ManageGift/ManageGift';
import "../../App.css";


// The GiftBox component takes in two props: 
// `member` - an object containing information about a member,
// `gifts` - an array of gifts related to that member.
// Creates a table structure for displaying gifts for each member
const GiftBox = ({ member, gifts, fetchGifts }) => {

  const { selfMember, allMembers } = useContext(MemberContext);
  const [ showManageGift, setShowManageGift ] = useState(false);

  const [ addOrEdit, setAddOrEdit ] = useState("");
  const isSelfView = selfMember && selfMember === member

  const toggleManageGiftPopup = (operation) => {
    setAddOrEdit(operation);
    setShowManageGift(!showManageGift);
  };

  return (
    <div>
      <h1>{member.member_name}'s Gifts</h1>
      <div className="giftBox">
        <table>
          <thead>
              <tr>
                <th></th>
                <th>Gift Name</th>
                <th title="Do you want the exact model you're listing (e.g. Sony WF-1000XM5 Earbuds) or any similar item (e.g. any wireless earbuds)?">Exact or Similar Item?</th>
                <th title="Do you mind multiple people getting you the same thing?">Multiple Copies </th>
                <th className="linksAndNotes" title="Any additional notes you want people to see.">Notes</th>
                <th className="linksAndNotes">Link(s)</th>
                {isSelfView && <th>Visibility</th>}
                {/* Only shows this column if the selfMember is the same as the member the giftBox is being called for. This should only be called from the selfView  */}
              </tr>
            </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.gift_id}>
                <td>
                <button key={gift.id} onClick={() => toggleManageGiftPopup('edit')}>
                Edit
                </button>
                </td>
                <td>{gift.item_name}</td>
                <td>{gift.exact_item ? 'Exact' : 'Similar'}</td>
                <td>{gift.multiple ? 'Yes' : 'No'}</td>
                <td>{gift.notes}</td>
                <td>
                {gift.links && gift.links.length > 0 && (
                  <a href={gift.links[0].url} target="_blank" rel="noopener noreferrer">
                    {/* Opens link in new window, without sending URL of current page */}
                    {gift.links[0].name || 'View Link'}
                  </a>
                )}
                {/* Not displaying. Treating as array, but not assing that way yet */}
                </td>
                {isSelfView && (
                  <td>
                    {/* Shows All if visible to every member, otherwise lists member names */}
                  {gift.visible_to.length === allMembers.length ? 'All' : gift.visible_to.join(', ')}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      <button onClick={() => toggleManageGiftPopup('add')}>Add Gift</button>
      {showManageGift && <ManageGift member={member} isSelfView={isSelfView} closePopup={toggleManageGiftPopup} fetchGifts={fetchGifts} addOrEdit={addOrEdit}/>}
      {/* Here, I can send member_ids instead of Members.
          Saves bandwidth */}
    </div>
  );
};
export default GiftBox;