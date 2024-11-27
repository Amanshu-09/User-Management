import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { setCurrentUserData, setMenu } from '../Redux/slice';
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
    const { page: current_page, currentUserData } = useSelector(state => state)
    const [menuItems, setMenuItems] = useState(items);

    useEffect(() => {
        if (Object.keys(currentUserData).length >= 1) {
            setMenuItems([
                {
                    label: 'Home',
                    key: 'home',
                    icon: <HomeOutlined />,
                },
                {
                    label: 'Logout',
                    key: 'logout',
                    icon: <LogoutOutlined />,
                }]);
        } else {
            setMenuItems(items);
        }
    }, [currentUserData])

    const onClick = (e) => {
        if (e.key === "logout") {
            dispatch(setCurrentUserData({}));
            dispatch(setMenu('login'));
            sessionStorage.setItem("userData", JSON.stringify({}))
        } else {
            dispatch(setMenu(e.key));
        }
    };
    return <Menu onClick={onClick} selectedKeys={[current_page]} mode="horizontal" items={menuItems} />;
};

export default Navbar;