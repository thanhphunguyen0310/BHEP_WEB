import {
  Avatar,
  Card,
  Carousel,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Typography,
} from "antd";
import DoctorBanner1 from "../assets/img/doctor-banner1.png";
import DoctorBanner2 from "../assets/img/doctor-banner2.png";
import DoctorBanner3 from "../assets/img/doctor-banner3.png";
import stethoscope from "../assets/icon/stethoscope.svg";
import hospital from "../assets/icon/hospital.svg";
import { SearchOutlined, StarFilled } from "@ant-design/icons";
import "../styles/AllDoctor.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDoctor } from "../configs/api/doctorApi";
const { Meta } = Card;

const AllDoctor = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const pageSize = 8; // Number of doctors per page

  const getSpecialistState = (specialistId) => {
    switch (specialistId) {
      case 1:
        return "Nội khoa";
      case 2:
        return "Răng hàm mặt";
      case 3:
        return "Da liễu";
      case 4:
        return "Tai mũi họng";
      case 5:
        return "Hô hấp";
      case 7:
        return "Tim mạch";
      case 8:
        return "Xương khớp";
      case 9:
        return "Phụ sản";
      case 10:
        return "Thần kinh";
      case 11:
        return "Dinh dưỡng";
      case 12:
        return "Ký sinh trùng";
      default:
        return "Không xác định";
    }
  };

  useEffect(() => {
    const fetchDoctors = async (pageIndex) => {
      try {
        const doctorData = await getDoctor(pageIndex, pageSize);
        setDoctorData(doctorData.items);
        setTotalDoctors(doctorData.totalCount);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* banner doctor */}
      <Carousel style={{ width: "100vw" }} infinite={false}>
        <div>
          <img style={{ width: "100vw" }} src={DoctorBanner1} />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={DoctorBanner2} />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={DoctorBanner3} />
        </div>
      </Carousel>

      {/* search doctor */}
      <Row
        justify={"center"}
        align={"middle"}
        style={{ width: "100vw", height: "150px", backgroundColor: "#F5FEFE" }}
      >
        <Input.Search
          prefix={
            <SearchOutlined
              style={{
                color: "rgba(0,0,0,.25)",
              }}
            />
          }
          style={{ width: "50%" }}
          placeholder="Tìm theo chuyên khoa, tên bác sĩ,..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
        />
      </Row>

      <div className="doctor-container">
        <div className="title">
          <Typography.Title level={6}>Tất cả bác sĩ</Typography.Title>
        </div>
        <div className="all-doctor">
          <div className="doctor-card-list">
            {doctorData.map((doctor) => (
              <Link
                to={`/doctor-detail/${doctor.id}`}
                key={doctor.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  key={doctor.id}
                  hoverable
                  bordered={false}
                  style={{
                    width: "256px",
                    margin: "10px",
                  }}
                >
                  <Meta
                    avatar={
                      <Avatar
                        size={70}
                        src={doctor.avatar || "https://via.placeholder.com/70"}
                        shape="square"
                      />
                    }
                    title={
                      <div
                        style={{
                          fontSize: "13px",
                          maxWidth: "200px",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <span>
                          <p>{doctor.description}</p>
                          <p>{doctor.fullName}</p>
                        </span>
                      </div>
                    }
                    description={
                      <div
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Row align="middle" gutter={8}>
                          <Col>{doctor.rate}</Col>
                          <Col>
                            <StarFilled style={{ color: "#FFC107" }} />
                          </Col>
                        </Row>
                      </div>
                    }
                  />
                  <div style={{ marginTop: "10px", textAlign: "left" }}>
                    <Row align="middle" gutter={8}>
                      <Col>
                        <Image
                          height={"10px"}
                          width={"10px"}
                          preview={false}
                          src={stethoscope}
                        />
                      </Col>
                      <Col>
                        <p style={{ margin: 0 }}>
                          {getSpecialistState(doctor.specialistId)}
                        </p>
                      </Col>
                    </Row>
                    <Row align="middle" gutter={8}>
                      <Col>
                        <Image
                          height={"10px"}
                          width={"10px"}
                          preview={false}
                          src={hospital}
                        />
                      </Col>
                      <Col>
                        <p style={{ margin: 0 }}>Bệnh viện Nhân dân Gia Định</p>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        {/* Pagination */}
        <Row
          className="pagination"
          justify={"end"}
          style={{
            width: "70%",
            padding: "20px 0px",
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalDoctors}
            onChange={handlePageChange}
            style={{ textAlign: 'center', marginTop: '20px' }}
          />
        </Row>
      </div>
    </>
  );
};

export default AllDoctor;

