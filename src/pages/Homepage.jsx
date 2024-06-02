import Banner from "./../components/Banner";
import "../styles/Homepage.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../components/ProductCard";
import DoctorCard from "../components/DoctorCard";
import { productData, responsiveProductCart } from "../data";
import CommunityBanner from "../assets/img/community-banner.png";
import LOGO from "../assets/img/LOGO.png";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getHighRateDoctor} from "../configs/api/doctorApi"
const Homepage = () => {
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
  const [topRatedDoctors, setTopRatedDoctors] = useState([]);
  useEffect(() => {
    const fetchTopRatedDoctors = async () => {
      try {
        const doctors = await getHighRateDoctor();
        setTopRatedDoctors(doctors);
      } catch (error) {
        console.error("Error fetching top rated doctors:", error);
      }
    };

    fetchTopRatedDoctors();
  }, []);

  return (
    <>
      <Banner />

      <div className="service">
        <div className="service-content">
          <h1>Sản phẩm nổi bật</h1>
          <Carousel
            className="carousel"
            responsive={responsiveProductCart}
            infinite={true}
          >
            {productData.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ProductCard
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="doctor">
        <h1>Bác sĩ hàng đầu</h1>
        <div className="doctor-content">
          <div className="doctor-items">
            {topRatedDoctors.map((doctor) => (
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
        </div>
      </div>

      <div className="commnunity">
        <h1>Cộng đồng BHEP</h1>
        <div className="community-content">
          <div className="header">
            <img src={CommunityBanner} />
          </div>
          <div className="content">
            <div className="avatar">
              <img src={LOGO} />
            </div>
            <div className="description">
              <h3>BHEP - SỨC KHỎE TỐT HƠN</h3>
              <section className="data">
                <div className="item">
                  <p>15</p>
                  <h4>Chủ đề</h4>
                </div>
                <div className="item">
                  <p>4.5k</p>
                  <h4>Bài viết</h4>
                </div>
                <div className="item">
                  <p>50k</p>
                  <h4>Thành viên</h4>
                </div>
              </section>
            </div>
            <Button>Tham gia cộng đồng</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
