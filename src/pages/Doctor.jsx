import { Button, Carousel, Input, Row, Typography } from "antd";
import { SearchOutlined, DoubleRightOutlined } from "@ant-design/icons";
import DoctorCard from "../components/DoctorCard";
import { doctorData } from "../data";
import "../styles/Doctor.scss";
import { Link, useNavigate } from "react-router-dom";
import { getHighRateDoctor } from "../configs/api/doctorApi";
import DoctorBanner1 from "../assets/img/doctor-banner1.png";
import DoctorBanner2 from "../assets/img/doctor-banner2.png";
import DoctorBanner3 from "../assets/img/doctor-banner3.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchHighRateDoctors } from "../store/doctorsSlice";
import { useEffect } from "react";

const Doctors = () => {
  const navigate = useNavigate();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
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
  const dispatch = useDispatch();
  const { highRateDoctors, status, error } = useSelector(
    (state) => state.doctors
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHighRateDoctors());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      {/* // banner doctor */}
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
          onSearch={onSearch}
        />
      </Row>
      {/* doctor outstanding list */}
      <div className="doctor">
        <h1>Bác sĩ nổi bật</h1>
        <div className="doctor-content">
          <div className="doctor-items">
            {highRateDoctors.map((doctor) => (
              <Link
                to={`/doctor-detail/${doctor.id}`}
                key={doctor.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div key={doctor.id}>
                  <DoctorCard
                    avatar={doctor.avatar}
                    fullName={doctor.fullName}
                    specialistId={getSpecialistState(doctor.specialistId)}
                    description={doctor.description}
                    rate={doctor.rate}
                    workPlace={doctor.workPlace}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="doctor-button">
            <Button
              icon={<DoubleRightOutlined />}
              size="large"
              onClick={() => navigate("/all-doctor")}
              style={{ backgroundColor: "#3058a6", color: "white" }}
            >
              Tất cả Bác sĩ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
