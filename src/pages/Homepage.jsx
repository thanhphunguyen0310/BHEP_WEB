import Banner from "./../components/Banner";
import "../styles/Homepage.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import DoctorCard from "../components/DoctorCard";
import { responsiveProductCart } from "../data";
import CommunityBanner from "../assets/img/community-banner.png";
import LOGO from "../assets/img/LOGO.png";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getHighRateDoctor} from "../configs/api/doctorApi"
import { getDevice, getService } from "../configs/api/productApi";
import Meta from "antd/es/card/Meta";
const Homepage = () => {
  const [topRatedItems, setTopRatedItems] = useState([]);
  const [topRatedDoctors, setTopRatedDoctors] = useState([]);
  const navigate = useNavigate();
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
  const fetchAllData = async () => {
    try {
      const [deviceRes, serviceRes] = await Promise.all([
        getDevice(),
        getService(),
      ]); 

      // Process devices
      const devices = deviceRes.items.map((item) => ({
        ...item,
        category: "Devices",
        type: "device",
      }));

      // Process services and categorize them
      const services = serviceRes.items.map((item) => {
        let category = "Services";
        let type = "";

        if (item.type === 1) {
          type = 1; // Goi dich vu ca nhan
        } else if (item.type === 2) {
          type = 2; // Goi dich vu gia dinh
        }

        return { ...item, category, type };
      });
      // Combine all products into one array
      const combinedData = [...devices, ...services];
      // Sort by rate and get top rated items
      combinedData.sort((a, b) => b.rate - a.rate);
      const topItems = combinedData.slice(0, 5);
      setTopRatedItems(topItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const handleAddToCart = () => {
  //   const item = {
  //            id: product.id,
  //            name: product.name,
  //            image: product.image,
  //            price: product.price,
  //            duration: product.duration,
  //            type: type,
  //            quantity: quantity, 
  //   }
  //   dispatch(
  //       addToCart(item)
  //     );
  //   navigate("/cart");
  // };
  const fetchTopRatedDoctors = async () => {
    try {
      const doctors = await getHighRateDoctor();
      setTopRatedDoctors(doctors);
    } catch (error) {
      console.error("Error fetching top rated doctors:", error);
    }
  };
  const handleProductClick = (product) => {
    navigate(`/product-detail/${product.type}/${product.id}`);
  };
  useEffect(() => {
    fetchAllData();
    fetchTopRatedDoctors();
  }, []);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <>
      <Banner />

      <div className="service">
        <div className="service-content">
          <h1>Sản phẩm nổi bật</h1>
          <Carousel
            className="carousel"
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            centerMode={false}
            draggable
            focusOnSelect={false}
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            arrows
            responsive={responsiveProductCart}
            containerClass="carousel-container"
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            slidesToSlide={1}
            swipeable
          >
            {topRatedItems.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  hoverable
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: 220,
                  }}
                  cover={
                    <img
                    style={{height: "108px", objectFit: "cover" }}
                      alt="example"
                      src={item.image}
                      onClick={() => handleProductClick(item)}
                    />
                  }
                >
                  <Meta title={item.name} />
                  <p style={{ padding: "10px 0px" }} className="price">
                    {formatPrice(item.price)}
                  </p>
                  <Button
                    style={{ fontWeight: "600" }}
                    size="large"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Card>
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
