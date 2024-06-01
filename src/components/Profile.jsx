import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="setting">
        <Link to="/settings">Cài đặt</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout} key="logout">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
};

export default Profile;
