import React, { useState } from 'react';
// import ViewAll from './ViewAll'; // Component for the "View All" tab content
// import EditOther from './EditOther'; // Component for the "Edit Other" tab content
// import EditSelf from './EditSelf'; // Component for the "Edit Self" tab content
// import './GiftListPage.css';

const GiftListPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // State to track active tab

  // Function to switch tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabClick('all')}>View All</button>
        <button onClick={() => handleTabClick('other')}>Edit Other</button>
        <button onClick={() => handleTabClick('self')}>Edit Self</button>
      </div>
      <div className="tab-content">
        {/* {activeTab === 'all' && <ViewAll />}
        {activeTab === 'other' && <EditOther />}
        {activeTab === 'self' && <EditSelf />} */}
      </div>
    </div>
  );
};

export default GiftListPage;

  // /**
  //  * Renders the component.
  //  */
  // return (
  //   <div className="container">
  //     <h1>Gifts</h1>
  //     <div className="contentBox">
  //       {gifts.map((gift) => (
  //         <div key={gift.id}>
  //             {gift.name}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );