import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import { Link, useHistory } from 'umi';


const { Header, Content, Footer, Sider } = Layout;

const index = (props: {children: React.ReactNode}) => {
  const { location } = useHistory();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo} >konglinghao</div>
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/course">
            <Link to="/course">课程记录</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">关于我们</Link>
          </Menu.Item>
        </Menu>

      </Sider>
      <Layout className={styles['site-layout']}>
        <Header className={styles['site-layout-background']} />
        <Content className={styles['site-layout-background']} style={{
          margin: '24px 16px',
          padding: 24, minHeight: 'max-content'
        }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>curd page ©2020 created by xue yi</Footer>
      </Layout>

    </Layout>
  )
}

export default index;