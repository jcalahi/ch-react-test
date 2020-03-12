import React, { useState } from 'react';
import styled from 'styled-components';

import { PhonebookProvider } from './Phonebook';
import PhonebookList from './PhonebookList';
import PhonebookHeader from './PhonebookHeader';
import PhonebookForm from './PhonebookForm';

const PhonebookContainer = styled.div`
  margin-top: 50px;
  padding: 0 320px;
`;

function App() {
  const [isVisible, toggleForm] = useState(false);
  return (
    <PhonebookContainer>
      <PhonebookProvider>
        <PhonebookHeader onToggleForm={toggleForm} />
        <PhonebookForm onToggleForm={toggleForm} isVisible={isVisible} />
        <PhonebookList />
      </PhonebookProvider>
    </PhonebookContainer>
  );
}

export default App;
