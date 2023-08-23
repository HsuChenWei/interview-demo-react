import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
} from 'antd';
import { useNavigate } from 'react-router';
import { login } from '../../api/login';

// const { Option } = Select;

function LoginPage() {
  const [open, setOpen] = useState(false);
  const navgiate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    const result = await login(values);
    const info = result?.data?.data;
    localStorage.setItem('accessToken', info?.accessToken);

    navgiate('/admin');
  };

  const onFinishRegister = async (values) => {
    // console.log('Received values of register form:', values);
    // 在这里添加注册逻辑
    onClose(); // 注册成功后关闭 Drawer
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '50px',
          background: '#ffffff',
          borderRadius: '15px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="accountId"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
            labelCol={{
              span: 0, // 隱藏標籤
            }}
            wrapperCol={{
              offset: 4, // 將輸入框向左移動
              span: 16,
            }}
          >
            <Input style={{ width: '200px', marginLeft: '-8px' }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            labelCol={{
              span: 0, // 隱藏標籤
            }}
            wrapperCol={{
              offset: 4, // 將輸入框向左移動
              span: 16,
            }}
          >
            <Input.Password style={{ width: '200px', marginLeft: '-8px' }} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                type="primary"
                onClick={showDrawer}
                icon={<PlusOutlined />}
                style={{ marginRight: '80px' }}
              >
                New account
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={(
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onFinishRegister} type="primary">
              Submit
            </Button>
          </Space>
        )}
      >
        {/* 注册表单部分 */}
        <Form layout="vertical" hideRequiredMark onFinish={onFinishRegister}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user password',
                  },
                ]}
              >
                <Input placeholder="Please enter user password" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user email',
                  },
                ]}
              >
                <Input placeholder="Please enter user email" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

export default LoginPage;
