import React, { useState } from 'react';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { setMenu } from '../Redux/slice';
import { useDispatch, useSelector } from 'react-redux';

const items = [
    {
        label: 'Register',
        key: 'register',
        icon: <UserAddOutlined />,
    },
    {
        label: 'Login',
        key: 'login',
        icon: <LoginOutlined />,
    }
]

const Navbar = () => {
    const dispatch = useDispatch();
    const { page: current_page } = useSelector(state => state)
    const [menuItems, setMenuItems] = useState(items);

    const onClick = (e) => {
        dispatch(setMenu(e.key));
    };
    return <Menu onClick={onClick} selectedKeys={[current_page]} mode="horizontal" items={menuItems} />;
};

export default Navbar;