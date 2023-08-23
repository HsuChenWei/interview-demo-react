import React from 'react';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router';

const { Header, Content, Sider } = Layout;

const navItems = [
  {
    key: 'users',
    icon: <UserOutlined />,
    label: '使用者列表',
  },
  {
    key: 'login',
    icon: <LoginOutlined />,
    label: '登入',
  },
];

export default function MainLayout() {
  const navgiate = useNavigate();

  const handleMenuClick = (e) => {
    navgiate(e.key);
  };
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            onClick={handleMenuClick}
            items={navItems}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
