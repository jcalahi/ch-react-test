import React, { useContext } from 'react';
import { PhonebookContext } from './Phonebook';

const PhonebookList = () => {
  const phonebook = useContext(PhonebookContext);
  console.log(phonebook.phonebookList);
  return (
    <div>
    </div>
  );
};

export default PhonebookList;
