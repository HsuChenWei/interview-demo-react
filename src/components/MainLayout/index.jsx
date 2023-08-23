import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LoginOutlined,
  HomeOutlined,
  EditOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import {
  Layout, Menu, Button, theme,
} from 'antd';
import { Outlet, useNavigate } from 'react-router';

const { Header, Sider, Content } = Layout;

const navItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首頁',
  },
  {
    key: 'booking',
    icon: <EditOutlined />,
    label: '會議室預約',
  },
  {
    key: 'order',
    icon: <FileSearchOutlined />,
    label: '預約管理',
  },
  {
    key: 'admin',
    icon: <UserOutlined />,
    label: '管理員維護',
  },
];

export default function MainLayout() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/login');
  };

  const handleMenuClick = (e) => {
    navigate(e.key);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // State to hold the current viewport width
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Update viewport width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
        <div className="demo-logo-vertical" />
        <div className="logo" style={{ height: '64px', background: '#001529' }}>
          {/* Add your logo content here */}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={navItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            {/* Add additional header items here */}
          </div>
          <div
            style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
          >
            {/* 登入按鈕 */}
            <Button
              type="primary"
              icon={<LoginOutlined />}
              style={{ marginRight: '20px' }}
              onClick={clickHandler} // 使用登入按鈕的點擊事件
            >
              登入
            </Button>
            {/* 其他頭部項目 */}
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: '24px',
            minHeight: '100vh', // Set minHeight to fill viewport
            background: colorBgContainer,
            fontSize: `${viewportWidth * 0.01}px`, // Adjust font size based on viewport width
            display: 'flex', // Use flex layout
            flexDirection: 'column', // Stack elements vertically
          }}
        >
          <div
            style={{
              flex: 1,
              marginBottom: '24px',
              border: '1px solid #ccc',
              padding: '16px',
            }}
          >
            {/* 上半部分的內容 */}
            上半部分的內容...
          </div>
          <div style={{ flex: 1, border: '1px solid #ccc', padding: '16px' }}>
            {/* 下半部分的內容 */}
            下半部分的內容...
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
