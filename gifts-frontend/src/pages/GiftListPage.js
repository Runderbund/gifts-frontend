import React, { useState } from 'react';

const GiftListPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // State to track active tab

  // Function to switch tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Gifts</h1>
    </div>
  );
};

export default GiftListPage;