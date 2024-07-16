import { EyeOutlined } from "@ant-design/icons";
import {
  Descriptions,
  Divider,
  Modal,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import "../../styles/ManageOrder.scss";
import { getAllOrder, getOrderById } from "../../configs/api/orderApi";
const ManageOrder = () => {
  const [order, setOrder] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchOrderDetail = async (orderId) => {
    try {
      const dataDetail = await getOrderById(orderId);
      console.log(dataDetail.data);
      setSelectedOrder(dataDetail.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching job application details:", error);
    }
  };

  const fetchOrder = async (pageIndex = 1, pageSize = 10) => {
    const data = await getAllOrder(pageIndex, pageSize);
    setOrder(data.items);
    setPagination({
      ...pagination,
      current: pageIndex,
      pageSize: pageSize,
      total: data.totalCount,
    });
  };

  const handleTableChange = (pagination) => {
    fetchOrder(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchOrder(pagination.current, pagination.pageSize);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      responsive: ["md"],
      render: (_, record) => {
        const productName = [];
        if (record.service) {
          productName.push(record.service.name);
        }
        if (record.products) {
          productName.push(...record.products.map((product) => product.name));
        }
        return productName.join(", ");
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      render: (_, record) => formatPrice(record.amount),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <EyeOutlined
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => fetchOrderDetail(record.id)}
        />
      ),
    },
  ];

  const renderOrderDetails = (order) => {
    return (
      <div style={{minWidth:"800px"}}>
        <Descriptions labelStyle={{width:"20%", fontWeight:"bold"}} style={{width:"100%"}} bordered column={1}>
          <Descriptions.Item  label="Mã đơn hàng">{order.id}</Descriptions.Item>
          <Descriptions.Item  label="ID khách hàng">
            {order.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {formatPrice(order.amount)}
          </Descriptions.Item>
          <Descriptions.Item  label="Chi tiết">
            {order.description}
          </Descriptions.Item>
          <Descriptions.Item  label="Ngày đặt">
            {order.createdDate}
          </Descriptions.Item>
          <Descriptions.Item  label="Voucher">{order.voucher == null ? "Không" : order.voucher}</Descriptions.Item>
        </Descriptions>
        {order.products && (
          <>
            <Divider>Sản phẩm</Divider>
            {order.products.map((product) => (
              <Descriptions labelStyle={{width:"20%", fontWeight:"bold"}} style={{width: "100%"}} bordered column={1} key={product.id}>
                <Descriptions.Item label="Tên sản phẩm">
                  {product.name}
                </Descriptions.Item>
                <Descriptions.Item label="Giá">
                  {formatPrice(product.price)}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Hình ảnh">
                    <img src={product.image} alt={product.name} style={{ width:"80px", height:"80px" }} />
                  </Descriptions.Item> */}
              </Descriptions>
            ))}
            {order.devices && (
              <>
                <Divider>Thiết bị</Divider>
                {order.devices.map((device) => (
                  <Descriptions labelStyle={{width:"20%", fontWeight:"bold"}} style={{width: "100%"}} bordered column={1} key={device.id}>
                    <Descriptions.Item label="Mã thiết bị" key={device.id}>
                      {device.code}
                    </Descriptions.Item>
                  </Descriptions>
                ))}
              </>
            )}
          </>
        )}
        {order.service && (
          <>
            <Divider>Gói Dịch vụ</Divider>
            <Descriptions labelStyle={{width:"20%", fontWeight:"bold"}} style={{width: "100%"}} bordered column={1}>
              <Descriptions.Item label="Tên dịch vụ">
                {order.service.name}
              </Descriptions.Item>
              {/* {order.service.type === 2 && (
                <Descriptions.Item label="Thời hạn dịch vụ">
                  {order.service.duration} tháng
                </Descriptions.Item>
              )} */}
              <Descriptions.Item label="Thời hạn dịch vụ">
                {order.service.duration} tháng
              </Descriptions.Item>
              <Descriptions.Item label="Giá">
              {formatPrice(order.service.price)}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
        {order.familyCode && (
          <Descriptions labelStyle={{width:"20%", fontWeight:"bold"}} style={{width: "100%"}} bordered column={1}>
            <Descriptions.Item label="Mã gia đình">
              {order.familyCode}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
    );
  };

  return (
    <div className="order-container">
      <div className="order-content">
        <Table
          size="large"
          columns={columns}
          dataSource={order}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange}
        />
        {selectedOrder && (
          <Modal
            title={`Chi tiết đơn hàng ${selectedOrder.id}`}
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            width={3000}
          >
            {renderOrderDetails(selectedOrder)}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
