import React, { createContext, useState } from 'react';

export const MemberContext = createContext({
  selfMember: null,
  otherMembers: [],
});
// Having this context allows a safeguard if called outside of Provider. No reason it would be, but it doesn't hurt to set safe defaults. Won't error, just won't do anything.

export const MemberProvider = ({ children }) => {
  const [selfMember, setSelfMember] = useState(null);
  const [otherMembers, setOtherMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  // const API_BASE_URL = "http://connect-front-1.eba-hzzsfpac.us-west-2.elasticbeanstalk.com";
  // This depends on the environment url. So I'll have to change for each new environment.
  


  const contextValue = {
    allMembers,
    setAllMembers,
    selfMember,
    setSelfMember, 
    otherMembers,
    setOtherMembers,
    // API_BASE_URL
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};
