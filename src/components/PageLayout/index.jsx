/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, theme } from 'antd';
// 假设这是主题
const { Content } = Layout;

function PageLayout(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const viewportWidth = window.innerWidth;

  return (
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
      {props.children}
    </Content>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
