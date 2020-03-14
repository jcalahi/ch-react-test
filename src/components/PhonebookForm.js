import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form, Input, Modal } from 'antd';
import { PhonebookContext } from './Phonebook';

const initialState = {
  firstName: '',
  lastName: '',
  countryCode: '',
  phoneNumber: ''
};

const PhonebookForm = (props) => {
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();
  const phonebook = useContext(PhonebookContext);

  const handleFormChange = (fieldName) => (e) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [fieldName]: e.target.value
      }
    ));
  };

  const handleOk = () => {
    phonebook.setPhonebookList(prevList => {
      return [...prevList, formData].map((item) => ({ ...item, key: uuid() }));
    });
    // reset
    form.resetFields();
    setFormData(initialState);
    phonebook.selectContacts([]);
    // hides form
    props.onToggleForm(false);
  };

  const handleCancel = () => {
    props.onToggleForm(false);
  };

  return (
    <Modal
      title="Add new contacts"
      visible={props.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={420}
    >
      <Form form={form} name="contactsForm" layout="vertical">
        <Form.Item label="Firstname" name="firstName" rules={[{ required: true, message: 'This field is required' }]}>
          <Input onChange={handleFormChange('firstName')} />
        </Form.Item>
        <Form.Item label="Lastname" name="lastName" rules={[{ required: true, message: 'This field is required' }]}>
          <Input onChange={handleFormChange('lastName')} />
        </Form.Item>
        <Form.Item label="Country Code" name="countryCode" rules={[{ required: true, message: 'This field is required' }]}>
          <Input onChange={handleFormChange('countryCode')} />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'This field is required' }]}>
          <Input onChange={handleFormChange('phoneNumber')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PhonebookForm;
