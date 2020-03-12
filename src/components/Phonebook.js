import React, { createContext, useState } from 'react';

const initialState = [
  {
    firstName: 'Saul',
    lastName: 'Goodman',
    countryCode: '+1',
    phoneNumber: '800-1234-5678',
    key: 1
  },
  {
    firstName: 'Paul',
    lastName: 'Phoenix',
    countryCode: '+11',
    phoneNumber: '9000-1000-1111',
    key: 2
  }
]

export const PhonebookContext = createContext();
export const PhonebookProvider = ({ children }) => {
  // holds the list of contacts
  const [phonebookList, setPhonebookList] = useState(initialState);
  // holds the selected contacts via checkbox
  const [contacts, selectContacts] = useState([]);
  return (
    <PhonebookContext.Provider value={{
      phonebookList,
      setPhonebookList,
      contacts,
      selectContacts
    }}>
      {children}
    </PhonebookContext.Provider>
  );
};
