// The GiftBox component takes in two props: 
// `member` - an object containing information about a member,
// `gifts` - an array of gifts related to that member.
// Creates a table structure for displaying gifts for each member
const GiftBox = ({ member, gifts }) => {
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
            </tr>
          </thead>
        <tbody>
          {gifts.map((gift) => (
            <tr key={gift.gift_id}>
            <td>{gift.item_name}</td>
            <td>{gift.exact_item ? 'Yes' : 'No'}</td>
            <td>{gift.multiple ? 'Yes' : 'No'}</td>
            <td>{gift.notes}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default GiftBox;