import React, { createContext, useState } from 'react';

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [member, setMember] = useState(null);

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  );
};
