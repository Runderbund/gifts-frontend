import React, { useContext, useState} from 'react';
import { MemberContext } from '../../context/MemberContext';
import AddGift from '../AddGift/AddGift';


// The GiftBox component takes in two props: 
// `member` - an object containing information about a member,
// `gifts` - an array of gifts related to that member.
// Creates a table structure for displaying gifts for each member
const GiftBox = ({ member, gifts }) => {

  const { selfMember } = useContext(MemberContext);
  const [ showAddGift, setShowAddGift ] = useState(false);

  const isSelfMember = selfMember && selfMember === member

  const toggleAddGiftPopup = () => {
    setShowAddGift(!showAddGift);
  };

  return (
    <div>
      <h1>{member.member_name}'s Gifts</h1>
      <table>
        <thead>
            <tr>
              <th>Item</th>
              <th>Exact?</th>
              <th>Multiple?</th>
              <th>Notes</th>
              {isSelfMember && <th>Visibility</th>}
              {/* Only shows this column if the selfMember is the same as the member the giftBox is being called for. This should only be called from the selfView  */}
            </tr>
          </thead>
        <tbody>
          {gifts.map((gift) => (
            <tr key={gift.gift_id}>
              <td>{gift.item_name}</td>
              <td>{gift.exact_item ? 'Yes' : 'No'}</td>
              <td>{gift.multiple ? 'Yes' : 'No'}</td>
              <td>{gift.notes}</td>
              {isSelfMember && (
                <td>
                  {/* Render visibility options of all Members here. Probably checkboxes in add/edit, but just list here. Cap on width, probably. Maybe 4 names/row. 
                  Default, and probably most common, will be All. */}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={toggleAddGiftPopup}>Add Gift</button>
      {showAddGift && <AddGift member={member} isSelfMember={isSelfMember} closePopup={toggleAddGiftPopup} />}
    </div>
  );
};
export default GiftBox;