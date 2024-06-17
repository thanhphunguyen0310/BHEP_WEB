import {
  Avatar,
  Col,
  Dropdown,
  Flex,
  Image,
  Input,
  Row,
  Typography,
  Space,
  Card,
  Button,
} from "antd";
import {
  ShoppingFilled,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import category from "../assets/icon/category.svg";
import "../styles/Store.scss";
import { responsiveProductCart } from "./../data";
import Carousel from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import { getDevice, getService } from "../configs/api/productApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

const Store = () => {
  const [product, setProduct] = useState([]);
  const [device, setDevice] = useState([]);
  const [service, setService] = useState([]);
  const [topRatedItems, setTopRatedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const fetchAllData = async () => {
    try {
      const [deviceRes, serviceRes] = await Promise.all([
        getDevice(),
        getService(),
      ]);

      const devices = deviceRes.items;
      const services = serviceRes.items;
      setDevice(devices);
      setService(services);
      // Combine the arrays
      const combinedData = [...devices, ...services];
      setProduct(combinedData);
      combinedData.sort((a, b) => b.rate - a.rate);
      // Get top 5 items
      const topItems = combinedData.slice(0, 3);
      setTopRatedItems(topItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // filter device or service in all product
  const filterProductsByCategory = () => {
    if (selectedCategory === "device") {
      return product.filter((item) => item.name === "Spirit");
    } else if (selectedCategory === "service") {
      return product.filter(
        (item) =>
          (item.type === 1 && item.duration === 3) ||
          (item.type === 2 && item.duration === 3)
      );
    } else {
      return product.filter(
        (item) =>
          item.name === "Spirit" ||
          (item.type === 1 && item.duration === 3) ||
          (item.type === 2 && item.duration === 3)
      );
    }
  };
  // filter device or service in top product
  const filterTopRatedItemsByCategory = () => {
    if (selectedCategory === "device") {
      return device.slice(0, 3);
    } else if (selectedCategory === "service") {
      return service.slice(0, 3);
    } else {
      return topRatedItems;
    }
  };
  const handleProductClick = (product) => {
    navigate(`/product-detail/${product.id}`);
  };

  const formatDescription = (description, type) => {
    if (type === 2) {
      const splitDescription = description.split(". ");
      return splitDescription.slice(-2).join(". ");
    }
    return description;
  };

  useEffect(() => {
    // fetchAllDevices();
    // fetchAllServices();
    fetchAllData();
  }, []);
  const items = [
    {
      label: "Thấp đến cao",
      key: "1",
    },
    {
      label: "Cao đến thấp",
      key: "2",
    },
  ];
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="store-container">
      {/* search bar */}
      <Flex className="search-bar" align="center" justify="center" gap={30}>
        <Input.Search size="large" style={{ width: "60%" }} />
        <Avatar
          style={{ backgroundColor: "white" }}
          size={"large"}
          icon={<ShoppingFilled style={{ color: "black" }} />}
        />
      </Flex>
      {/* navigation */}
      <Row
        align={"middle"}
        justify={"center"}
        className="category-container"
        style={{ width: "100vw", margin: "16px 0px" }}
      >
        <Row className="category-content">
          <Col
            span={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0px 10px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory("all")}
          >
            <Image style={{ width: "25px", height: "25px" }} src={category} />
            <Typography.Title
              style={{
                marginBottom: "0px",
                fontSize: "25px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Danh mục
            </Typography.Title>
          </Col>
          <Col
            span={20}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row style={{ width: "100%" }} justify={"center"}>
              <Col
                span={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Typography.Title
                  style={{
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
                  className="category-item"
                  onClick={() => setSelectedCategory("device")}
                >
                  Thiết bị
                </Typography.Title>
              </Col>
              <Col
                span={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Typography.Title
                  style={{
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
                  className="category-item"
                  onClick={() => setSelectedCategory("service")}
                >
                  Dịch vụ
                </Typography.Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
      {/* filter price */}
      <Row style={{ width: "100vw" }}>
        <Flex
          align="center"
          justify="flex-start"
          style={{
            width: "200px",
            height: "64px",
            backgroundColor: "white",
            marginLeft: "100px",
          }}
        >
          <Dropdown
            menu={{
              items,
            }}
          >
            <a
              style={{ padding: "0px 36px" }}
              onClick={(e) => e.preventDefault()}
            >
              <Space
                style={{ color: "black", fontSize: "18px", gap: "0px 15px" }}
              >
                Giá
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Flex>
      </Row>
      {/* top product */}
      <Row
        className="top-product-container"
        align={"middle"}
        justify={"center"}
        style={{ width: "100vw", margin: "16px 0px" }}
      >
        <Row
          className="top-product-content"
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: "0px 100px",
            padding: "25px 37px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={6}>SẢN PHẨM PHỔ BIẾN</Typography.Title>
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
            {filterTopRatedItemsByCategory().map((item) => (
              // <Link
              //   to={`/product-detail/${item.id}`}
              //   key={item.id}
              //   style={{ textDecoration: "none", color: "inherit" }}
              // >
              <div
                key={item.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  hoverable
                  style={{
                    display:"flex",
                    alignItems:"center",
                    flexDirection:"column",
                    width: 220,
                  }}
                  cover={
                    <img
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
                  <Button style={{fontWeight:"600"}} size="large" type="primary" icon={<ShoppingCartOutlined />}>
                    Thêm vào giỏ hàng
                  </Button>
                </Card>
              </div>
              // </Link>
            ))}
          </Carousel>
        </Row>
      </Row>
      {/* all product */}
      <Row
        className="all-product-container"
        align={"middle"}
        justify={"center"}
        style={{ width: "100vw", margin: "16px 0px" }}
      >
        <Row
          className="all-product-content"
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: "0px 100px",
            padding: "25px 37px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={6}>TẤT CẢ SẢN PHẨM</Typography.Title>
          <div className="product-card-list">
            {filterProductsByCategory().map((product) => (
              <div key={product.id}>
                <Card
                  hoverable
                  style={{ width: 220,
                    display:"flex",
                    alignItems:"center",
                    flexDirection:"column",
                   }}
                  cover={
                    <img
                      alt="example"
                      src={product.image}
                      onClick={() => handleProductClick(product)}
                    />
                  }
                >
                  <Meta title={product.name} />
                  <p>
                    {formatDescription(product.description, product.type)}
                  </p>
                  <Button style={{fontWeight:"600"}} size="large" type="primary" icon={<ShoppingCartOutlined />}>
                    Thêm vào giỏ hàng
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default Store;

// const fetchAllDevices = async () => {
//   try {
//     const res = await getDevice();
//     console.log(res.items, "thiet bi");
//     setDevice(res.items);
//   } catch (error) {
//     console.error("Error fetching top rated doctors:", error);
//   }
// };

// const fetchAllServices = async () => {
//   try {
//     const res = await getService();
//     console.log(res.items, "dich vu");
//     setService(res.items);
//   } catch (error) {
//     console.error("Error fetching top rated doctors:", error);
//   }
// };

{
  /* <ProductCard
                  name={product.name}
                  image={product.image}
                  description={formatDescription(
                    product.description,
                    product.type
                  )}
                /> */
}
{
  /* <ProductCard
                  name={item.name}
                  image={item.image}
                  price={formatPrice(item.price)}
                /> */
}
