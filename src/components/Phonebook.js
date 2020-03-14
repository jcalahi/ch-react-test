import React, { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

const initialState = [
  {
    firstName: 'Luke',
    lastName: 'Skywalker',
    countryCode: '+1',
    phoneNumber: '800-1234-5678',
    key: uuid()
  },
  {
    firstName: 'Biff',
    lastName: 'Tannen',
    countryCode: '+63',
    phoneNumber: '9000-1000-1111',
    key: uuid()
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
