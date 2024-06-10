import "../styles/Header.scss";
import { Menu, Button, Typography, Avatar, message, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import LOGO from "../assets/img/LOGO.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../models/LoginForm";
import RegistForm from "../models/RegisterForm";
import Profile from "./Profile";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistForm, setShowRegistForm] = useState(false);
  const auth = useSelector((state) => state.auth);

  const openLoginForm = () => {
    setShowLoginForm(true);
    setShowRegistForm(false);
  };

  const openRegistForm = () => {
    setShowLoginForm(false);
    setShowRegistForm(true);
  };

  const closeForm = () => {
    setShowLoginForm(false);
    setShowRegistForm(false);
  };

  const handleAvatarError = (e) => {
    if (e && e.target) {
      e.target.src = "/path/to/placeholder/avatar.png";
      message.error("Failed to load avatar image");
    }
  };
  return (
    <div className="header-container">
      <div className="header-content">
        <Link className="logo" to="/">
          <img src={LOGO} alt="logo" />
          <Typography.Title>BHEP</Typography.Title>
        </Link>

        <Menu className="menu-items" mode="horizontal">
          <Menu.Item className="item">
            Chuyên mục <CaretDownOutlined />
          </Menu.Item>
          <Menu.Item className="item">
            Công cụ <CaretDownOutlined />
          </Menu.Item>
          <Menu.Item className="item">
            <Link to="/store">
              Cửa hàng <CaretDownOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item className="item">
            Cộng đồng <CaretDownOutlined />
          </Menu.Item>
          <Menu.Item>
            <Link to="/doctor">
              Tìm bác sĩ <CaretDownOutlined />
            </Link>
          </Menu.Item>
        </Menu>
        <div className="button">
          {auth.user?.isSuccess ? (
            <Dropdown overlay={<Profile />} placement="bottomRight">
              <Avatar
                size="large"
                src={auth?.user?.data?.user?.avatar}
                alt={auth?.user?.data?.user?.fullName}
                onError={handleAvatarError}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          ) : (
            <>
              <Button
                onClick={openLoginForm}
                className="login-button"
                type="primary"
                size="large"
              >
                Đăng nhập
              </Button>
              <Button
                onClick={openRegistForm}
                className="regist-button"
                type="primary"
                size="large"
              >
                Đăng ký
              </Button>
            </>
          )}
        </div>
        {showLoginForm && (
          <LoginForm
            closeForm={closeForm}
            openRegistForm={openRegistForm}
            showLoginForm={showLoginForm}
          />
        )}
        {showRegistForm && (
          <RegistForm closeForm={closeForm} openLoginForm={openLoginForm} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
