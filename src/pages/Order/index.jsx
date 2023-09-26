import React, { useState, useEffect, useCallback } from 'react';
import {
  Space, Input, Card, Table, message, Modal, Form,
} from 'antd';
import PageLayout from '../../components/PageLayout/index';
import {
  getAdminBookings, getMemberBookings, deleteMemberBooking, deleteAdminBooking,
  updateMemberBooking, updateAdminBooking, getOneBooking,
} from '../../api/order';

export default function OrderPage() {
  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: '會員編號',
      dataIndex: 'userId',
      key: 'userId',
      width: 150,
    },
    {
      title: '會議室',
      dataIndex: 'roomId',
      key: 'roomId',
      width: 180,
      render: (roomId) => {
        console.log('roomId:', roomId);
        if (roomId === 1) {
          return '(一)';
        } if (roomId === 2) {
          return '(二)';
        } if (roomId === 3) {
          return '(三)';
        } if (roomId === 4) {
          return '(四)';
        } if (roomId === 5) {
          return '(五)';
        }
        return '未知';
      },
    },
    {
      title: '開始時間',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 500,
    },
    {
      title: '結束時間',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 500,
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            onClick={() => showModal(record)}
          >
            更改
            {' '}
            {record.name}
          </button>
          <button
            type="button"
            onClick={() => handleDelete(record)}
          >
            刪除
          </button>
        </Space>
      ),
    },
  ];
  const [orderId, setOrderId] = useState(undefined);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [list, setList] = useState([]);

  console.log(list);

  const onSearch = async (value) => {
    setOrderId(value);
    const { userType } = JSON.parse(localStorage.getItem('userInfo'));
    try {
      if (parseInt(userType, 10) === 0) {
        const response = await getOneBooking(value);
        if (response && response.data) {
          setList([response.data]);
          console.log(setList);
        } else {
          message.error('查詢失敗');
        }
      } else {
        message.warning('您無權進行此查詢');
      }
    } catch (e) {
      message.error('網絡錯誤');
    }
  };

  // const onShowSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize);
  // };

  const getBookingList = useCallback(async () => {
    try {
      const { userType } = JSON.parse(localStorage.getItem('userInfo'));
      if (parseInt(userType, 10) === 0) {
        const bookings = await getMemberBookings({
          // page,
          // size,
          id: orderId || undefined,
        });
        setList(bookings?.data?.data || []);
      }
      if (parseInt(userType, 10) === 1) {
        const bookings = await getAdminBookings({
          // page,
          // size,
          id: orderId || undefined,
        });
        setList(bookings?.data?.data || []);
      }
    } catch (e) {
      if (e.code === 'ERR_NETWORK') {
        message.error('403');
      }
    }
  }, [orderId]);
  useEffect(() => {
    console.log(list);
  }, [list]);

  useEffect(() => {
    getBookingList();
  }, [getBookingList]);

  // 刪除
  const handleDelete = async (record) => {
    const { userType } = JSON.parse(localStorage.getItem('userInfo'));
    try {
      if (parseInt(userType, 10) === 0) {
        await deleteMemberBooking(record.id);
      } else if (parseInt(userType, 10) === 1) {
        await deleteAdminBooking(record.id);
      }
      message.success('刪除成功');
      getBookingList();
    } catch (error) {
      message.error('刪除失敗');
    }
  };

  // 更新
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showModal = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };
  const updateBooking = async (record) => {
  };
  const isBookingDuplicate = (newRecord) => list.some((record) => record.roomId === newRecord.roomId
  && record.startTime === newRecord.startTime
  && record.endTime === newRecord.endTime
  && record.id !== newRecord.id);

  const handleOk = async () => {
    console.log('Current Record before checking: ', currentRecord);
    if (isBookingDuplicate(currentRecord)) {
      message.error('不能重複預定相同的會議室和時段');
      return;
    }
    try {
      const { userType } = JSON.parse(localStorage.getItem('userInfo'));
      if (parseInt(userType, 10) === 0) {
        await updateMemberBooking(currentRecord.id, {
          roomId: currentRecord.roomId,
          startTime: currentRecord.startTime,
          endTime: currentRecord.endTime,
        });
      } else if (parseInt(userType, 10) === 1) {
        await updateAdminBooking(currentRecord.id, {
          roomId: currentRecord.roomId,
          startTime: currentRecord.startTime,
          endTime: currentRecord.endTime,
        });
      }

      message.success('更新成功');
      setVisible(false);
      getBookingList();
    } catch (error) {
      message.error('更新失敗');
    }
  };
  useEffect(() => {
    console.log('Visible is now:', visible);
  }, [visible]);

  return (
    <PageLayout style={{ fontSize: '20px' }}>
      <Card
        title="預約查詢"
        bordered={false}
        style={{
          width: 1000,
          border: '1px solid #ccc',
          margin: '10px',
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
            訂單編號 :
            <Space direction="vertical">
              <Input.Search
                placeholder="請輸入訂單編號"
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
          width: 1000,
          border: '1px solid #ccc',
          margin: '10px',
          fontSize: '10px',
        }}
      >
        <Space wrap>
          <div
            style={{
              flexDirection: 'column',
            }}
          >
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
                // pagination={{
                //   pageSize: size,
                //   current: page + 1,
                //   total: 100,
                //   onChange: (val) => setPage(val - 1),
                //   onShowSizeChange: (_, next) => setSize(next),
                // }}
              />
            </div>
          </div>
          <Modal
            title="更新項目"
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
          >
            <Form>
              <Form.Item label="會議室">
                <Input
                  value={currentRecord?.roomId}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, roomId: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="開始時間">
                <Input
                  value={currentRecord?.startTime}
                  onChange={(e) => setCurrentRecord({
                    ...currentRecord,
                    startTime: e.target.value,
                  })}
                />
              </Form.Item>
              <Form.Item label="結束時間">
                <Input
                  value={currentRecord?.endTime}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, endTime: e.target.value })}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </Card>
    </PageLayout>
  );
}
