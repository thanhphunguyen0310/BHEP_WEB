import "../styles/Header.scss";
import {
  Menu,
  Button,
  Typography,
  Avatar,
  message,
  Dropdown,
  Badge,
  List,
  Space,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import LOGO from "../assets/img/LOGO.png";
import ALT_AVATAR from "../assets/img/alt-avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../models/LoginForm";
import RegistForm from "../models/RegisterForm";
import Profile from "./Profile";
import { IoIosNotifications } from "react-icons/io";
import { db } from '../configs/firebase/firebaseConfig'; // Make sure to import your firebase config
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { getAppointmentById, updateAppointment } from "../configs/api/appointmentApi";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistForm, setShowRegistForm] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [unreadNoti, setUnreadNoti] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
  const handleNotificationClick = async (appointmentId, notificationId) => {
    await updateNotificationReadStatus(notificationId);
    setOpenNoti(false);
    navigate('/list-appointment', { state: { appointmentId } });
  };
  const updateNotificationReadStatus = async (notificationId) => {
    const notificationRef = doc(db, 'notification', notificationId);
    await updateDoc(notificationRef, {
      isRead: true,
    });
  };
  const handleMessage = () => {
    message.loading(
      "Tính năng đang được BHEP phát triển. Bạn quay lại sau nhé!",
      [2]
    );
  };
  const fetchNotifications = async () => {
    try {
      const q = query(
        collection(db, 'notification'), 
        where('toUserId', '==', auth?.user?.data?.user?.id)
      );
      const querySnapshot = await getDocs(q);
      const fetchedNotifications = [];
  
      for (const doc of querySnapshot.docs) {
        const notification = doc.data();
        const appointment = await getAppointmentById(notification.appointmentId);
        setAppointments(appointment.data)
        fetchedNotifications.push({
          id: doc.id,
          ...notification,
          avatar: appointment?.data?.customer?.avatar,
          userName: appointment?.data?.customer?.fullName,
          status: appointment?.data?.status
        });
      }
  
      fetchedNotifications.sort((a, b) => {
        if (a.isRead && !b.isRead) return 1;
        if (!a.isRead && b.isRead) return -1;
        return 0;
      });
  
      setNotifications(fetchedNotifications);
  
      const unreadNotifications = fetchedNotifications.filter((noti) => !noti.isRead);
      setUnreadNoti(unreadNotifications);
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu thông báo:', error);
    }
  };
  useEffect(() => {
    if (auth.user?.data?.user?.roleId === 3) {
      fetchNotifications();
      const q = query(
        collection(db, 'notification'), 
        where('toUserId', '==', auth?.user?.data?.user?.id));
      const unsubscribe = onSnapshot(q, async () => {
        fetchNotifications();
      });
      return () => unsubscribe();
    }
  }, [auth.user]);
  const notificationMenu = (
    <Menu className="menu-notification">
      <List
        itemLayout="vertical"
        dataSource={notifications}
        renderItem={({id, appointmentId,  avatar, userName, content, createdAt, isRead, status })=> (
          <>
          <List.Item 
          key={id} 
          onClick={() => handleNotificationClick(appointmentId, id)}
            className={isRead ? 'read-notification' : 'unread-notification'}>
            <List.Item.Meta
              avatar={<Avatar src={avatar} />}
              title={userName}
              description={content}
            />
            <p>{new Date(createdAt).toLocaleString()}</p>
          </List.Item>
          {status === 0 && ( // Chỉ hiển thị nút khi status === 0
            <Space size={1}  className={isRead ? 'read-notification' : 'unread-notification'}>
              <Button type="primary" onClick={() => handleAcceptAppointment(appointmentId, id)}>Xác nhận</Button>
              <Button danger style={{ marginLeft: '10px' }} onClick={() => handleRejectAppointment(appointmentId, id)}>Từ chối</Button>
            </Space>
          )}
          </>
        )}
      />
    </Menu>
  );
  // Hàm xử lý khi nhấn nút Xác nhận
const handleAcceptAppointment = async (appointmentId, notificationId) => {
  try {
    const updatedAppointment = {
      id: appointmentId,
      customerId: appointments?.customer?.id,
      employeeId: appointments?.employee?.id,
      status: 1, //Update status to "Xác nhận"
    };
    await updateAppointment(updatedAppointment);
    message.success('Đã xác nhận cuộc hẹn thành công!');
    await updateNotificationReadStatus(notificationId);
    fetchNotifications();
  } catch (error) {
    console.error('Lỗi khi xác nhận cuộc hẹn:', error);
    message.error('Đã xảy ra lỗi khi xác nhận cuộc hẹn.');
  }
};

// Hàm xử lý khi nhấn nút Từ chối
const handleRejectAppointment = async (appointmentId, notificationId) => {
  try {
    const updatedAppointment = {
      id: appointmentId,
      customerId: appointments?.customer?.id,
      employeeId: appointments?.employee?.id,
      status: 3, //Update status to "Từ chối"
    };
    await updateAppointment(updatedAppointment);
    message.success('Đã từ chối cuộc hẹn thành công!');
    await updateNotificationReadStatus(notificationId);
    fetchNotifications();
  } catch (error) {
    console.error('Lỗi khi từ chối cuộc hẹn:', error);
    message.error('Đã xảy ra lỗi khi từ chối cuộc hẹn.');
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
          <Menu.Item className="item" onClick={handleMessage}>
            Chuyên mục <CaretDownOutlined />
          </Menu.Item>
          <Menu.Item className="item" onClick={handleMessage}>
            Công cụ <CaretDownOutlined />
          </Menu.Item>
          <Menu.Item className="item">
            <Link to="/store">
              Cửa hàng <CaretDownOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item className="item" onClick={handleMessage}>
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
            <div className="user-loggedin">
              <div style={{marginRight:"12px"}}>
              <Dropdown 
              arrow 
              overlay={notificationMenu} 
              placement="bottomRight" 
              trigger={['click']}
              open={openNoti}
              onOpenChange={(open)=>setOpenNoti(open)}
              >
              <Badge count={unreadNoti.length} overflowCount={99}>
                <IoIosNotifications className="notification-icon" />
              </Badge>
              </Dropdown>
              </div>
              <Dropdown overlay={<Profile />} placement="bottomRight">
                <Avatar
                  className="avatar"
                  src={auth?.user?.data?.user?.avatar || ALT_AVATAR}
                  alt="User Avatar"
                  onError={(e) => { e.target.onerror = null; e.target.src = ALT_AVATAR; }}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            </div>
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
