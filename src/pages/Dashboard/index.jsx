import { useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, theme, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Sidebaritems';
import { useAuth } from '@/context/AuthContext';
import Routes from './Routes';
import { LogoutOutlined, DashboardOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleLogout, user } = useAuth()
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const currentYear = new Date().getFullYear();
  const selectedKeys = location.pathname.startsWith('/dashboard/todos') ? ['2'] : ['1']

  const itemsDrop = [
    {
      key: '1',
      label: 'Home',
      icon: <DashboardOutlined />,
      onClick: () => {
        navigate('/')
      }
    },
    {
      key: '2',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        handleLogout()
      }
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint='lg'
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'auto', alignSelf: 'flex-start' }}
      >
        <div className='py-4 text-center'>
          <Typography.Title level={4} style={{ margin: 0 }}>
            <Link to='/' style={{ color: '#fff' }}>
              Todos
            </Link>
          </Typography.Title>
        </div>
        <Menu theme='dark' selectedKeys={selectedKeys} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className='text-end' style={{ background: colorBgContainer , paddingRight: '16px' }}>
          <div className="flex items-center justify-end gap-3 mt-2"> 
            <h2 className="text-xl">{user?.fullName}</h2>
            <Dropdown menu={{ items: itemsDrop }} placement="bottomRight">
              <Avatar size={48} className="cursor-pointer shadow">
                {user?.fullName?.charAt(0).toUpperCase()}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content className='p-3'>
          <Routes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Todos &copy;{currentYear} Created by <b>Muhammad Sufyan Ali</b>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;