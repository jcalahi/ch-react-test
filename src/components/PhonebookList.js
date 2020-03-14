import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Form,
  Input,
  Row,
  Popconfirm,
  Table
} from 'antd';
import { PhonebookContext } from './Phonebook';

const StyledTable = styled(Table)`
  & {
    thead .ant-table-cell:last-child {
      text-align: center;
    }
  }
`;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      { editing
        ? (
            <Form.Item
              name={dataIndex}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )
        : children
      }
    </td>
  );
};

const PhonebookList = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const phonebook = useContext(PhonebookContext);

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...phonebook.phonebookList];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        phonebook.setPhonebookList(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        phonebook.setPhonebookList(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const tableColumns = [
    {
      title: 'Firstname',
      dataIndex: 'firstName',
      width: '20%',
      editable: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastName',
      width: '20%',
      editable: true,
    },
    {
      title: 'Country Code',
      dataIndex: 'countryCode',
      width: '20%',
      editable: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      width: '20%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Row type="flex" justify="center">
            <Button
              type="link"
              onClick={() => save(record.key)}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </Row>
        ) : (
          <Row type="flex" justify="center">
            <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
          </Row>
        );
      }
    }
  ];

  const mergedColumns = tableColumns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputtype: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const rowSelection = {
    onSelect: (selectedRow, isSelected) => {
      if (!isSelected) {
        phonebook.selectContacts((prevArr) => prevArr.filter(item => item.key !== selectedRow.key));
      } else {
        phonebook.selectContacts((prevArr) => [...prevArr, selectedRow]);
      }
    },
    onSelectAll: (selected, selectedRows) => {
      const selection = selectedRows.filter(item => item !== undefined);
      phonebook.selectContacts(() => selection);
    }
  };

  return (
    <Form form={form} component={false}>
      <StyledTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={phonebook.phonebookList}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowSelection={rowSelection}
        pagination={false}
      />
    </Form>
  );
};

export default PhonebookList;
