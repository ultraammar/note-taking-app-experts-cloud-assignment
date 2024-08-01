import React, { useState } from "react";
import {
  AppstoreOutlined,
  FileAddOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  ProductOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/login/isLoggedIn/sessionSlice";

//notification popup
const showNotification = (user) => {
  console.log("Logging out!", user);
  notification.info({
    message: "Logging out!",
    description: `Goodbye ${user}! we hope to see you again.`,
    placement: "topLeft",
  });
};

const Sidebar = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const [current, setCurrent] = useState("/");

  const session = useSelector((state) => state.session);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logoutHandle = () => {
    showNotification(session.username);
    Dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="vertical"
        className="nav-ul"
        theme="dark"
        disabledOverflow="false"
      >
        <>
          {session.isLoggedIn && (
            <>
              <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to="/notes">Notes</Link>
              </Menu.Item>
              <Menu.Item key="note_add" icon={<FileAddOutlined />}>
                <Link to="/notes/new" rel="noopener noreferrer">
                  Add New Note
                </Link>
              </Menu.Item>

              <Menu.Item icon={<UserOutlined />} onClick={logoutHandle}>
                  Logout
              </Menu.Item>
            </>
          )}

          {!session.isLoggedIn && (
            <>
              <Menu.Item icon={<UserOutlined />} key="login">
                <Link to="/login" rel="noopener noreferrer">
                  Login
                </Link>
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />} key="signup">
                <Link to="/signup" rel="noopener noreferrer">
                  Signup
                </Link>
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    </>
  );
};
export default Sidebar;
