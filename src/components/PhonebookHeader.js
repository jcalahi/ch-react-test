import React, { useContext } from 'react';
import {
  Button,
  Descriptions,
  PageHeader
} from 'antd';
import { PhonebookContext } from './Phonebook';

const PhonebookHeader = (props) => {
  const phonebook = useContext(PhonebookContext);
  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Phone Book"
      subTitle="Manage your contacts"
      extra={[
        <Button key="1" onClick={() => props.onToggleForm(true)}>
          Add Contacts
        </Button>
      ]}
    >
      <Descriptions size="small">
        <Descriptions.Item label="No. of Contacts">
          {phonebook.phonebookList.length}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};

export default PhonebookHeader;
