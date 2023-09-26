import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import {
  Space, Input, Select, Card, Table, message, Modal,
} from 'antd';
import PageLayout from '../../components/PageLayout/index';
import { getAllUserList, changeRole } from '../../api/admin';

export default function AdminPage() {
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const columns = [
    {
      title: '會員編號',
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: '會員名稱',
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
    },
    {
      title: '角色權限',
      dataIndex: 'userType',
      key: 'userType',
      width: 150,
      render: (userType) => {
        if (userType === 0) {
          return '一般會員';
        } if (userType === 1) {
          return '管理員';
        }
        return '未知';
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <button type="button" onClick={() => handleOpenModal(record.id)}>
            更改
          </button>
        </Space>
      ),
    },
  ];
  const [userId, setUserId] = useState(undefined);
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUserType, setNewUserType] = useState('0');
  const { Option } = Select;

  const onSearch = (value) => {
    setUserId(value);
  };

  const getUserList = useCallback(async () => {
    try {
      const { userType } = JSON.parse(localStorage.getItem('userInfo'));
      if (parseInt(userType, 10) === 1) {
        const response = await getAllUserList({
          id: userId || undefined,
        });
        if (response?.data?.data) {
          let updatedList = response?.data?.data;
          if (userId) {
            updatedList = updatedList.filter((user) => user.id === userId);
          }
          setList(updatedList);
        }
      }
      if (parseInt(userType, 10) === 0) {
        message.error('403');
      }
    } catch (e) {
      if (e.code === 'ERR_NETWORK') {
        message.error('403');
      }
    }
  }, [userId]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);
  // 更新
  const handleOpenModal = (selectedId) => {
    setSelectedUserId(selectedId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const newUserTypeInt = parseInt(newUserType, 10);
    if (Number.isNaN(newUserTypeInt)) {
      console.error('Invalid UserType: Not a number');
      return;
    }
    try {
      const response = await changeRole(newUserTypeInt, selectedUserId);
      if (response?.status === 200) {
        console.log('Successfully updated user type');
        getUserList();
        setIsModalVisible(false);
      } else {
        console.log('Failed to update user type');
      }
    } catch (error) {
      console.log('Error updating user type', error);
    }
  };
  return (
    <PageLayout>
      <Card
        title="預約查詢"
        bordered={false}
        style={{
          width: 950,
          border: '1px solid #ccc',
          margin: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            borderRadius: '10px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              display: 'flex',
              gap: '12px',
            }}
          >
            會員ID :
            <Space direction="vertical">
              <Input.Search
                placeholder="請輸入會員ID"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Space>
          </div>
        </div>
      </Card>
      <Card
        bordered={false}
        style={{
          width: 950,
          border: '1px solid #ccc',
          // height: 500,
          margin: '20px',
        }}
      >
        <Space wrap>
          <div
            style={{
              flexDirection: 'column',
            }}
          >
            {/* <div
              style={{
                display: 'flex',
                gap: '12px',
                fontSize: '20px',
                margin: '15px',
              }}
            >
              Show
              <Select
                defaultValue="10"
                style={{ width: 70 }}
                onChange={handleChange}
                options={[
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '50', label: '50' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
              entries
            </div> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                fontSize: '20px',
              }}
            >
              <Table
                columns={columns}
                dataSource={list}
              />
            </div>
          </div>
        </Space>
        <Modal title="更改角色" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
          <Select placeholder="請選擇" onChange={(value) => setNewUserType(value)}>
            <Select.Option value="0">一般會員</Select.Option>
            <Select.Option value="1">管理員</Select.Option>
          </Select>
        </Modal>
      </Card>
    </PageLayout>
  );
}
