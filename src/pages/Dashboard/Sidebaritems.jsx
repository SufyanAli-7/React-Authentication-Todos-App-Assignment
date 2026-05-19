import { ProductOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [

    { key : '1', label: <Link to='/dashboard'>Dashboard</Link>, icon: <ProductOutlined /> },
    { key : '2', label: <Link to='/dashboard/todos'>Todos</Link>, icon: <ScheduleOutlined /> },
]