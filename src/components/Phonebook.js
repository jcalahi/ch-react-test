import React, { createContext, useState } from 'react';

export const PhonebookContext = createContext();
export const PhonebookProvider = ({ children }) => {
  const [phonebookList, setPhonebookList] = useState([]);
  return (
    <PhonebookContext.Provider value={{ phonebookList, setPhonebookList }}>
      {children}
    </PhonebookContext.Provider>
  );
};
