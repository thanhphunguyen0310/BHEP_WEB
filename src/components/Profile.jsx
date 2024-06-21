import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth?.user?.data?.user?.roleId);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(`/`)
    dispatch(logout());
  };

  return (
    <Menu>
      {userRole === 3 && (
        <Menu.Item key="workspace">
          <Link to="/workspace">Bàn làm việc</Link>
        </Menu.Item>
      )}
      {userRole === 1 && (
        <Menu.Item key="manage">
          <Link to="/manage">Quản lí</Link>
        </Menu.Item>
      )}
      {userRole === 2 && (
        <Menu.Item key="add-coin">
          <Link to="/add-coin">Nạp coin</Link>
        </Menu.Item>
      )}
      {userRole === 2 && (
        <Menu.Item key="manage">
          <Link to="/list-appointment">Lịch hẹn</Link>
        </Menu.Item>
      )}
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
