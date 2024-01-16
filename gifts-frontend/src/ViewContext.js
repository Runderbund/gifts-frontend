import React, { createContext, useState, useContext } from 'react';

const ViewContext = createContext();

export const useView = () => useContext(ViewContext);

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState('other'); // default view

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
