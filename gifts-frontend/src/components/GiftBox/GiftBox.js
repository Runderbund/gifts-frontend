import AddGift from "../components/AddGift/AddGift";


return (
    <div>
      {/* Do loop for each user. Name at top, centered and bold, then table for each */}
      <h1>
        Name
      </h1>
      <table>
        <thead>
          <tr>
            {/* Make hovertext for explanations */}
            <th>Item</th>
            <th>Exact?</th>
            <th>Multiple?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {giftData.map((gift) => (
            // Add conditional to match each user in turn
            // Add conditional to only show visibility = All
            <tr key={gift.gift_id}>  
              <td>{gift.name}</td>
              <td>{gift.exact}</td>
              <td>{gift.multiple}</td>
              <td>{gift.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );