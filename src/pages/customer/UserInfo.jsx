import { useSelector } from "react-redux";
import "../../styles/UserInfo.scss";
import { useEffect, useState } from "react";
import { getUserDetail, updateUserDetail } from "./../../configs/api/userApi";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Radio,
  Row,
  Typography,
  Upload,
  message,
} from "antd";
import { AiFillEdit } from "react-icons/ai";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    balance: "",
  });
  const userId = useSelector((state) => state.auth?.user?.data?.user?.id);
  const userDetail = async () => {
    try {
      const res = await getUserDetail(userId);
      setUser(res.data);
      setFormData({
        fullName: res.data.fullName,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber,
        gender: res.data.gender,
        balance: res.data.balance,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    console.log(formData, "form data");
    userDetail();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleGenderChange = (e) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
  };
  const handleSave = async () => {
    try {
      const formDataUpdate = new FormData();
      formDataUpdate.append("Id", userId);
      formDataUpdate.append("FullName", formData.fullName);
      formDataUpdate.append("Email", formData.email);
      formDataUpdate.append("PhoneNumber", formData.phoneNumber);
      formDataUpdate.append("Gender", formData.gender);
      // formDataUpdate.append("Avatar", user.avatar);

      console.log(formDataUpdate, "form Update");
      await updateUserDetail(userId, formDataUpdate);
      message.success("Cập nhật thông tin thành công!");
      userDetail();
      setEditMode(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };
  return (
    <div className="profile-container">
      <div className="profile-content">
        <Row justify={"space-between"} align={"middle"} className="header">
          <Typography.Title level={2}>THÔNG TIN CÁ NHÂN</Typography.Title>
          <Typography.Text onClick={() => setEditMode(!editMode)}>
            {editMode ? "" : <Row align={"middle"}>Chỉnh sửa <AiFillEdit style={{width:"20px", height:"20px"}} color="#71a9fe"/></Row>}
          </Typography.Text>
        </Row>
        {editMode ? (
          <Row justify={"center"}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              beforeUpload={() => false}
            >
              Upload
            </Upload>
          </Row>
        ) : (
          <Row justify={"center"} className="user-avatar">
            <Avatar src={user?.avatar} />
          </Row>
        )}

        <Row className="user-info">
          <Typography.Text>Họ và Tên:</Typography.Text>
          {editMode ? (
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          ) : (
            <Typography.Text>{user?.fullName}</Typography.Text>
          )}
        </Row>
        <Divider />
        <Row className="user-info">
          <Typography.Text>Email:</Typography.Text>
          {editMode ? (
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <Typography.Text>{user?.email}</Typography.Text>
          )}
        </Row>
        <Divider />
        <Row className="user-info">
          <Typography.Text>Số điện thoại:</Typography.Text>
          {editMode ? (
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <Typography.Text>{user?.phoneNumber}</Typography.Text>
          )}
        </Row>
        <Divider />
        <Row className="user-info">
          <Typography.Text>Giới tính:</Typography.Text>
          {editMode ? (
            <Radio.Group onChange={handleGenderChange} value={formData.gender}>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
              <Radio value={3}>Khác</Radio>
            </Radio.Group>
          ) : (
            <Typography.Text>
              {user?.gender === 1
                ? "Nam"
                : user?.gender === 2
                ? "Nữ"
                : user?.gender === 3
                ? "Khác"
                : "Không xác định"}
            </Typography.Text>
          )}
        </Row>
        <Divider />
        <Row className="user-info">
          <Typography.Text>BHEP xu:</Typography.Text>
          <Typography.Text style={{ color: "#fb8500" }}>
            {formatBalance(user?.balance)}
          </Typography.Text>
        </Row>
        {editMode ? (
          <Row className="profile-button">
            <Button onClick={() => setEditMode(false)}>Hủy</Button>
            <Button type="primary" onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </Row>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
