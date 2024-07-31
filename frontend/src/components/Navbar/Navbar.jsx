  import React, { useState } from "react";
  import { useMediaQuery } from "react-responsive";
  import "./Navbar.scss";
  import { Content, Header } from "antd/es/layout/layout";
  import { Drawer, Menu, notification } from "antd";
  import {
    FileAddOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    MenuOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Link, useNavigate, Navigate } from "react-router-dom";
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

  const Navbar = () => {
    const navigate = useNavigate();
    const logoutHandle = () => {
      showNotification(session.name);
      Dispatch(logout());
      navigate("/login");
    };
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    const Dispatch = useDispatch();
    
    const session = useSelector((state) => state.session);
    

    const [current, setCurrent] = useState("/");

    const onClick = (e) => {
      setOpen(false);
      console.log("click ", e);
      setCurrent(e.key);
    };

    return (
      <Header
        style={{
          padding: 15,
          // background: BlurryGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        <Content
          style={{
            color: "white",
            fontSize: "1.5rem",
            justifyContent: "left",
            display: "flex",
          }}
        >
          Note App
        </Content>

        <Content
          style={{
            color: "white",
            fontSize: "1.5rem",
            justifyContent: "right",
            display: "flex",
          }}
        >
          {isMobile && (
            <>
              <div>
                <MenuOutlined onClick={showDrawer} />
              </div>
              <Drawer
                title="Menu"
                onClose={onClose}
                open={open}
                placement="left"
                width={250}
                //  style={{background: "linear-gradient(90deg, #000F2E, #121452)"}}
              >
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="inline"
                  className="nav-ul"
                  theme="light"
                  disabledOverflow="false"
                >
                  {session.isLoggedIn && (
                    <>
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to="/notes">Notes</Link>
                  </Menu.Item>
                  <Menu.Item key="note_add" icon={<FileAddOutlined />}>
                    <Link
                      to="/notes/new"
                      rel="noopener noreferrer"
                    >
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
                </Menu>
              </Drawer>
            </>
          )}

          {session.isLoggedIn && !isMobile && (
            <Menu
              mode="horizontal"
              className="profile-ul"
              disabledOverflow="true"
            >
              <Menu.SubMenu key="profileMenu" icon={<UserOutlined />}>
                <Menu.Item key="Logout" onClick={logoutHandle}>
                  Logout
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          )}
        </Content>
      </Header>
    );
  };

  export default Navbar;
