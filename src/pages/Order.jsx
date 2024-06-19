import { Avatar, Badge, Divider, Flex, Input, Row, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingFilled } from "@ant-design/icons";
import "../styles/Order.scss"
import { MdDelete } from "react-icons/md";
const Order = () => {
  const items = useSelector((state) => state?.cart);
  console.log(items)
  const groupCode = useSelector((state) => state?.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
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
            <Typography.Text>{record.quantity}</Typography.Text>
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
  ];
  return (
    <div className="order-container">
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
      <div className="order-content">
        <Row className="order-header">
            <Typography.Title>THANH TOÁN</Typography.Title>
            <Row className="order-info">
            <Typography.Text>Giỏ hàng: {items.cartTotalQuantity}  sản phẩm</Typography.Text>
            <Typography.Text>{formatPrice(items.cartTotalAmount)}</Typography.Text>
            <Typography.Text onClick={() => navigate(-1)}>Ấn để thay đổi</Typography.Text>
            </Row>
        </Row>
        <Row justify={"center"} className="order-items">
          <Table
            showHeader={false}
            pagination={false}
            columns={columns}
            dataSource={items?.cartItems}
            rowKey={(record) => record.id}
            rowClassName={() => "custom-row"}
          />
        </Row>
        <Row style={{width:"80%"}}>
        <Divider dashed={true} style={{height:"1px", color:"red"}}/>
        </Row>
      </div>
    </div>
  );
};

export default Order;
