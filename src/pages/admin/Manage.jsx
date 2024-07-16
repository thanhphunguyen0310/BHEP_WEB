import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Col, Row, Typography } from "antd";
import { FaUserCircle, FaMailBulk, FaShoppingBag, FaMoneyBillWave } from "react-icons/fa";
import { MdDisabledByDefault } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import DoctorSchedule from "../../components/Doctor/DoctorSchedule";
import "../../styles/Manage.scss"

import { useNavigate } from "react-router-dom";
const Manage = () => {
    const navigate = useNavigate();
    const doctorName = useSelector(
      (state) => state.auth?.user?.data?.user?.fullName
    );
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
  
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return ( 
        <>
      <div className="workspace-container">
        {/* workspace-header */}
        <Row
          align={"middle"}
          justify={"center"}
          className="workspace-header-container"
        >
          <Row className="workspace-header-content">
            <span
              style={{
                display: "flex",
                alignItems: "end",
                gap: "0px 8px",
                justifyContent: "flex-start",
              }}
            >
              <p>BHEP, Xin chào </p>
              <Typography.Title className="header-doctorname">
                {doctorName}
              </Typography.Title>
            </span>
            <Typography.Text className="header-time">
              {formattedDate}
            </Typography.Text>
          </Row>
        </Row>
        {/* main content */}
        <Row className="workspace-main-container" gutter={[16, 16]}>
          <Row className="workspace-main-content">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="workspace-card" hoverable>
                <div className="card-content">
                  <FaUserCircle className="icon manage-account-icon"/>
                  <Typography.Title level={4}>Quản lí người dùng</Typography.Title>
                  <Button 
                  type="primary" 
                //   onClick={showModal}
                  >
                    Xem
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="workspace-card" hoverable>
                <div className="card-content" onClick={() => {navigate(`/manage-job-application`)}}>
                  <FaMailBulk className="icon manage-job-icon"/>
                  <Typography.Title level={4}>
                    Đơn đăng ký nhân viên
                  </Typography.Title>
                  <Button 
                  type="primary" 
                  onClick={() => {navigate(`/manage-job-application`)}}
                  >Xem</Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="workspace-card" hoverable>
                <div className="card-content" onClick={() => {navigate(`/manage-payment`)}}>
                  <FaMoneyBillWave className="icon manage-payment-icon"/>
                  <Typography.Title level={4}>
                    Quản lí giao dịch
                  </Typography.Title>
                  <Button 
                  type="primary"
                  onClick={() => {navigate(`/manage-payment`)}}
                  >Xem</Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="workspace-card" hoverable>
                <div className="card-content" onClick={() => {navigate(`/manage-order`)}}>
                  <FaShoppingBag className="icon manage-order-icon"/>
                  <Typography.Title level={4}>
                    Danh sách đơn hàng
                  </Typography.Title>
                  <Button 
                  type="primary"
                  onClick={() => {navigate(`/manage-order`)}}
                  >Xem</Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="workspace-card" hoverable>
                <div className="card-content">
                  <IoLogoWechat className="icon manage-appointment-icon"/>
                  <Typography.Title level={4}>
                    Danh sách lịch hẹn
                  </Typography.Title>
                  <Button type="primary">Xem</Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="workspace-card" hoverable>
                <div className="card-content">
                  <MdDisabledByDefault className="icon disable-account-icon"/>
                  <Typography.Title level={4}>
                    Vô hiệu hóa tài khoản
                  </Typography.Title>
                  <Button 
                  type="primary"
                  >Xem</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Row>
      </div>
      <DoctorSchedule
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
     );
}
 
export default Manage;