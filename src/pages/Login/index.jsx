import React, { useEffect, useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
  Button, Checkbox, Col, Drawer, Form, Input, Row, Space, message,
} from 'antd';
import { Navigate, useNavigate } from 'react-router';
import { login } from '../../api/login';
import { register } from '../../api/register';

function LoginPage() {
  const [open, setOpen] = useState(false);
  const [registeredUserName, setRegisteredUserName] = useState('');
  const navgiate = useNavigate();

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const result = await login(values);
      if (result?.data?.data?.accessToken) {
        const info = result.data.data;
        localStorage.setItem('accessToken', info.accessToken);
        const userInfo = jwtDecode(info.accessToken);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navgiate('/');
        message.success('成功登入');
      } else {
        message.error('登入失敗: 缺少訪問令牌');
      }
    } catch (error) {
      message.error('登入失敗: 未知錯誤');
    }
  };
  const [userData, setUserData] = useState({
    userName: '',
    userPwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const checkUserExists = async (userName) => {
    try {
      const response = await axios.get(
        `/api/user/checkExist?userName=${userName}`,
      );
      return response.data.exists;
    } catch (error) {
      return false;
    }
  };

  const onFinishRegister = async (values) => {
    console.log('Registration values:', values);
    try {
      const { userName, userPwd } = values;
      const userExists = await checkUserExists(userName);
      if (userExists) {
        console.error('User already exists:', userName);
        message.error('帳號已存在');
        return;
      }

      const response = await register({ userName, userPwd });
      if (response && response.status === 200) {
        console.log('Registration successful!');
        setRegisteredUserName(userName);
        message.success('註冊成功');
        navgiate('/login');
        onClose();
      } else {
        console.error('Registration failed:', response);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      message.error('註冊失敗');
    }
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
        <div
          style={{
            textAlign: 'center',
            margin: '20px',
            fontSize: '20px',
          }}
        >
          會員登入
        </div>
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
            label="Account"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your account!',
              },
            ]}
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Input style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="userPwd"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              offset: 4,
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
          />
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" style={{ right: '50px' }}>
                Log in
              </Button>
              <Button
                type="primary"
                onClick={showDrawer}
                icon={<PlusOutlined />}
                style={{ right: '50px' }}
              >
                Sign up
              </Button>
              <Button
                type="primary"
                style={{ right: '50px' }}
                // onClick={showForgetPwdDrawer}
              >
                忘記密碼
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Drawer
        title="Sign up"
        width={720}
        onClose={onClose}
        visible={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={(
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                form.validateFields().then(async (values) => {
                  const { userName, userPwd } = values;
                  if (userName && userPwd) {
                    onFinishRegister({ userName, userPwd });
                  } else {
                    console.error('Username and password are required.');
                  }
                });
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        )}
      >
        {/* 注册表单部分 */}
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinishRegister}
          form={form}
          initialValues={userData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="Account"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input
                  placeholder="Please enter user name"
                  value={userData.userName}
                  onChange={(e) => handleChange(e, 'userName')}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userPwd"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user password',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Please enter user password"
                  value={userData.userPwd}
                  onChange={(e) => handleChange(e, 'userPwd')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/* <Drawer
        title="忘記密碼"
        width={720}
        onClose={onCloseForgetPwdDrawer}
        visible={forgetPwdOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {}
        <p>請輸入您的電子郵件地址，我們將發送一個重置密碼的連結給您。</p>
        {}
      </Drawer> */}
    </div>
  );
}

export default LoginPage;
