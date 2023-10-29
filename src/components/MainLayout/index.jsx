import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LoginOutlined,
  HomeOutlined,
  EditOutlined,
  FileSearchOutlined,
  // PoweroffOutlined,
} from '@ant-design/icons';
import {
  Layout, Menu, Button, theme,
} from 'antd';
import { useNavigate, BrowserRouter as Router } from 'react-router-dom';
import OrderPage from '../../pages/Order/index';
import BookingPage from '../../pages/Booking/index';
import AdminPage from '../../pages/Admin/index';

const { Header, Sider, Content } = Layout;

const { userType } = JSON.parse(localStorage.getItem('userInfo') || '{}');

const navItems = [
  {
    key: '/booking',
    icon: <EditOutlined />,
    label: '會議室預約',
    component: BookingPage,
  },
  {
    key: '/order',
    icon: <FileSearchOutlined />,
    label: '預約管理',
    component: OrderPage,
  },
];
const adminNavItem = {
  key: '/admin',
  icon: <UserOutlined />,
  label: '管理員維護',
  component: AdminPage,
};

export default function MainLayout() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const [selectedNavItem, setSelectedNavItem] = useState('/');
  const [baseNavItems, setBaseNavItems] = useState([]);

  const clickHandler = () => {
    navigate('/login');
  };

  const handleMenuClick = (e) => {
    if ((!userInfo || !userInfo.userType) && e.key !== '/') {
      navigate('/login');
      return;
    }

    setSelectedNavItem(e.key);
    navigate(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const path = window.location.pathname;
    setSelectedNavItem(path);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (!userInfo || !userInfo.userType) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const { userType: localUserType } = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (parseInt(localUserType, 10) === 1) {
      setBaseNavItems([...navItems, adminNavItem]);
    } else {
      setBaseNavItems([...navItems]);
    }
  }, []);
  useEffect(() => {
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    // window.location.reload();

    navigate('/login');
  };

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
          items={baseNavItems}
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
            <Button
              type="primary"
              icon={<LoginOutlined />}
              style={{ marginRight: '20px' }}
              onClick={userInfo && userInfo.userType ? logoutHandler : clickHandler}
            >
              {userInfo && userInfo.userType ? '登出' : '登入'}
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: '24px',
            minHeight: '100vh',
            background: colorBgContainer,
            fontSize: `${viewportWidth * 0.01}px`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {selectedNavItem === '/booking' && (
            <div>
              <BookingPage />
            </div>
          )}

          {selectedNavItem === '/order' && (
            <div>
              <OrderPage />
            </div>
          )}

          {selectedNavItem === '/admin' && (
            <div>
              <AdminPage />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
