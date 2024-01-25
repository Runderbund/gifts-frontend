import React, { createContext, useState } from 'react';

export const MemberContext = createContext({
  selfMember: null,
  otherMembers: [],
  setSelfMember: () => {},
  setOtherMembers: () => {}
});
// Having this context allows a safeguard if called outside of Provider. No reason it would be, but it doesn't hurt to set safe defaults. Won't error, justr won't do anything.

export const MemberProvider = ({ children }) => {
  const [selfMember, setSelfMember] = useState(null);
  const [otherMembers, setOtherMembers] = useState([]);

  const contextValue = {
    selfMember,
    otherMembers,
    setSelfMember,
    setOtherMembers
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};
