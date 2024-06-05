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
} from "antd";
import {
  ShoppingFilled,
  DownOutlined,
} from "@ant-design/icons";
import category from "../assets/icon/category.svg";
import "../styles/Store.scss";
import { productData, responsiveProductCart } from "./../data";
import Carousel from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import { getAllProduct } from "../configs/api/productApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Store = () => {
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

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await getAllProduct();
        console.log(res.items, ">>>>>");
        setProduct(res.items);
      } catch (error) {
        console.error("Error fetching top rated doctors:", error);
      }
    };
    fetchAllProducts();
  }, []);

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
            }}
          >
            <Image style={{ width: "25px", height: "25px" }} src={category} />
            <Typography.Title
              style={{
                marginBottom: "0px",
                fontSize: "25px",
                fontWeight: "600",
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
                }}
              >
                <Typography.Title
                  style={{
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
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
                }}
              >
                <Typography.Title
                  style={{
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
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
            {productData.map((item) => (
              <Link
              to={`/product-detail/${product.id}`}
              key={product.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                key={item.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ProductCard
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
              </Link>
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
            {product.map((product) => (
              <Link
                to={`/product-detail/${product.id}`}
                key={product.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div key={product.id}>
                  <ProductCard
                    name={product.name}
                    image={product.image}
                    price={product.price}
                  />
                </div>
              </Link>
            ))}
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default Store;
