import React, { useState, useEffect } from 'react';
import {
  DatePicker, Space, Select, Card, Button, message, Table,
} from 'antd';
import PageLayout from '../../components/PageLayout/index';
import { addBooking, getAvailableTime } from '../../api/booking';

const { RangePicker } = DatePicker;
const columns = [
  {
    title: () => <div style={{ textAlign: 'center' }}>可預約時段區間</div>,
    dataIndex: '',
    key: 'range',
    width: '800px',
    render: (text, record) => `${record.startTime} ~ ${record.endTime}`,
  },
];

export default function BookingPage() {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [roomId, setRoomId] = useState(undefined);
  const [rangeDate, setRangeDate] = useState();
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setRoomId(value);
  };

  const handleRangePicker = (value) => {
    // console.log(`selected ${value}`);
    setRangeDate(value);
  };

  const onSubmit = async () => {
    if (!roomId) {
      message.error('請選擇會議室');
      return;
    }
    if (!rangeDate || rangeDate.length !== 2) {
      message.error('請選擇預約時間');
      return;
    }
    const [dateStart, dateEnd] = rangeDate;
    try {
      await addBooking({
        roomId,
        startTime: dateStart.format('YYYY-MM-DD HH:00:00'),
        endTime: dateEnd.format('YYYY-MM-DD HH:00:00'),
      });
      message.success('預約成功');
      setRoomId(undefined);
      setRangeDate([null, null]);
    } catch (e) {
      console.log(e);
      message.error('此時段已預約');
      message.error('預約失敗');
    }
  };

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (!roomId) return;
      try {
        const payload = {
          roomId,
        };
        const response = await getAvailableTime(payload);

        if (response && response.data) {
          setAvailableTimeSlots(response.data);
        }
      } catch (e) {
        console.log('Error fetching available time slots:', e);
      }
    };

    fetchAvailableTimeSlots();
  }, [roomId]);

  return (
    <PageLayout>
      <Card
        title="會議室預約"
        bordered={false}
        style={{
          width: 950,
          border: '1px solid #ccc',
          margin: '20px',
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            marginLeft: '200px',
            fontSize: '17px',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>會議室：</p>
          <Space direction="vertical" size={12}>
            <Select
              defaultValue="請選擇"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: undefined,
                  label: '請選擇',
                  disabled: true,
                },
                {
                  value: 1,
                  label: '會議室(一)',
                },
                {
                  value: 2,
                  label: '會議室(二)',
                },
                {
                  value: 3,
                  label: '會議室(三)',
                },
                {
                  value: 4,
                  label: '會議室(四)',
                },
                {
                  value: 5,
                  label: '會議室(五)',
                },
              ]}
            />
          </Space>
          <p style={{ fontWeight: 'bold' }}>預約時間：</p>
          <Space>
            <RangePicker onChange={handleRangePicker} format="YYYY-MM-DD HH:00:00" showTime={{ format: 'hh' }} />
          </Space>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '25px',
            }}
          >
            <Button
              type="primary"
              onClick={onSubmit}
              style={{ marginRight: '400px' }}
            >
              送出
            </Button>
          </div>
        </div>
      </Card>
      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          marginLeft: '10px',
          fontSize: '17px',
          width: '970px',
        }}
      >
        <Table dataSource={availableTimeSlots} columns={columns} />
      </div>

    </PageLayout>
  );
}
