import { useDispatch, useSelector } from "react-redux";
import "../../styles/Cart.scss";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Space, Table } from "antd";
import {
  removeItemFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  getTotal,
} from "../../store/cartSlice";
import { ShoppingFilled } from "@ant-design/icons";
import { useEffect } from "react";

const Cart = () => {
  const items = useSelector((state) => state?.cart);
  const groupCode = useSelector((state) => state?.cart);
  console.log(items);
  console.log(groupCode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [items, dispatch]);
  const columns = [
    {
      title: <Typography.Title level={4}>Sản phẩm</Typography.Title>,
      dataIndex: "image",
      className: "custom-header",
      key: "image",
      render: (text, record) => {
        return text ? (
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              src={text}
              alt="product"
              style={{
                marginRight: "16px",
                width: "80px",
                height: "80px",
                borderRadius: "4px",
                objectFit: "cover",
                objectPosition: "right",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography.Title level={4}>{record.name}</Typography.Title>
              {(record.type === "1" || record.type === "2") && (
                <Typography.Text type="secondary">
                  Phân loại: {record.duration} tháng
                </Typography.Text>
              )}
              {record.type === "2" && (
                <Typography.Text type="secondary">
                  Mã gia đình: {items?.groupCode}
                </Typography.Text>
              )}
            </div>
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography.Title level={4}>{record.name}</Typography.Title>
              {(record.type === "1" || record.type === "2") && (
                <Typography.Text type="secondary">
                  Phân loại: {record.duration} tháng
                </Typography.Text>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: <Typography.Title level={4}>Giá tiền</Typography.Title>,
      dataIndex: "price",
      key: "price",
      className: "custom-header",
      render: (text) => <span>{formatPrice(text)}</span>,
    },
    {
      title: <Typography.Title level={4}>Số lượng</Typography.Title>,
      dataIndex: "quantity",
      key: "quantity",
      className: "custom-header",
      render: (text, record) => (
        <>
          {record.type === "device" ? (
            <InputNumber
             style={{textAlign:"center", width:"60px"}}
              value={record.quantity}
              onChange={(value) => handleItemQuantityChange(record, value)}
            />
          ) : (
            <Typography.Text>{record.quantity}</Typography.Text>
          )}
        </>
      ),
    },
    {
      title: <Typography.Title level={4}>Thành tiền</Typography.Title>,
      key: "total",
      dataIndex: "total",
      className: "custom-header",
      render: (text, record) => {
        const total = record.price * record.quantity;
        return (
          <span style={{ color: "#ED1C1C", fontWeight: "600" }}>
            {formatPrice(total)}
          </span>
        );
      },
    },
    {
      title: "",
      key: "action",
      className: "custom-header",
      render: (text, record) => (
        <Space size="middle">
          <MdDelete
            color="#3058A6"
            onClick={() => handleRemoveFromCart(record)}
          />
        </Space>
      ),
    },
  ];

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeItemFromCart(cartItem));
  };
  const handleItemQuantityChange = (cartItem, value) => {
    if (cartItem.type === "device") {
      if (value > cartItem.quantity) {
        handleIncreaseCart(cartItem);
      } else if (value < cartItem.quantity) {
        handleDecreaseCart(cartItem);
      }
    }
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <div className="cart-container">
      <Flex className="search-bar" align="center" justify="center" gap={30}>
        <Input.Search size="large" style={{ width: "60%" }} />
        <Badge count={items?.cartTotalQuantity}>
          <Avatar
            onClick={() => navigate(`/cart`)}
            style={{ cursor: "pointer", backgroundColor: "white" }}
            size={"large"}
            icon={<ShoppingFilled style={{ color: "black" }} />}
          />
        </Badge>
      </Flex>
      <div className="cart-content">
        <Row className="cart-header">
          <div className="cart-header-left">
            <IoIosArrowBack
              fontSize={"28px"}
              cursor={"pointer"}
              onClick={() => navigate(-1)}
            />
            <Typography.Title level={3}>GIỎ HÀNG</Typography.Title>
          </div>
          <div className="cart-header-right">
            <Typography.Text
              style={{ cursor: "pointer" }}
              className="delete-all-items"
              onClick={() => handleClearCart()}
            >
              Xóa tất cả giỏ hàng
            </Typography.Text>
          </div>
        </Row>

        <Row justify={"center"} className="cart-items">
          <Table
            pagination={false}
            columns={columns}
            dataSource={items?.cartItems}
            rowKey={(record) => record.id}
            rowClassName={() => "custom-row"}
          />
        </Row>

        <Row className="cart-footer">
          <Row align={"middle"} justify={"center"} className="total-price">
            <Typography.Text>Tổng tiền tạm tính</Typography.Text>
            <Typography>{formatPrice(items?.cartTotalAmount)}</Typography>
          </Row>

          <Row className="cart-footer-btn">
            <Button onClick={() => navigate(`/store`)}>Mua thêm</Button>
            <Button onClick={() => navigate(`/order`)}>Đặt hàng</Button>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
