import { useState } from 'react';
import { Avatar, Dropdown, Grid, Layout, Menu, theme, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Sidebaritems';
import { useAuth } from '@/context/AuthContext';
import Routes from './Routes';
import { LogoutOutlined, DashboardOutlined, ScheduleOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleLogout, user } = useAuth()
  const [collapsed, setCollapsed] = useState(false);
  const screens = Grid.useBreakpoint();
  const { token: { colorBgContainer } } = theme.useToken();
  const currentYear = new Date().getFullYear();
  const isMobile = !screens.lg;
  const selectedKeys = location.pathname.startsWith('/dashboard/todos') ? ['2'] : ['1']
  const mobileNavItems = [
    {
      key: '1',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      to: '/dashboard',
    },
    {
      key: '2',
      label: 'Todos',
      icon: <ScheduleOutlined />,
      to: '/dashboard/todos',
    },
  ]

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
      {!isMobile && (
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
      )}
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
        <Content className='p-3' style={isMobile ? { paddingBottom: '96px' } : undefined}>
          <Routes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Todos &copy;{currentYear} Created by <b>Muhammad Sufyan Ali</b>
        </Footer>
      </Layout>
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            background: '#001529',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.18)',
            padding: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {mobileNavItems.map(item => {
              const isActive = selectedKeys.includes(item.key)

              return (
                <Link
                  key={item.key}
                  to={item.to}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 10px',
                    borderRadius: '12px',
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.72)',
                    background: isActive ? '#1677ff' : 'transparent',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Dashboard;