import { EyeOutlined } from "@ant-design/icons";
import { Descriptions, Divider, Modal, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import "../../styles/ManagePayment.scss";
import {
  getOrderById,
  getAllPayment,
} from "../../configs/api/orderApi";
import { getUserDetail } from "../../configs/api/userApi"

const ManagePayment = () => {
  const [payment, setPayment] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

    const fetchPaymentDetail = async (orderId) => {
      try {
        const dataDetail = await getOrderById(orderId);
        setSelectedPayment(dataDetail.data);
        setOpenModal(true);
      } catch (error) {
        console.error("Error fetching job application details:", error);
      }
    };

  const fetchPayment = async (pageIndex = 1, pageSize = 10) => {
    const data = await getAllPayment(pageIndex, pageSize);
    setPayment(data.items);
    setPagination({
      ...pagination,
      current: pageIndex,
      pageSize: pageSize,
      total: data.totalCount,
    });
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
  };
  const handleTableChange = (pagination) => {
    fetchPayment(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchPayment(pagination.current, pagination.pageSize);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: "id",
      width: 120,
      onHeaderCell: () => ({
        style: {
          textAlign: "center",
        },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Khách hàng",
      dataIndex: "userId",
      render: (userId) => <UserName userId={userId} />,
      onHeaderCell: () => ({
        style: {
          textAlign: "center",
        },
      }),
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "createdDate",
      sorter: (a, b) => parseDate(b.createdDate) - parseDate(a.createdDate),
      defaultSortOrder: 'descend',  // Display most recent date first by default
      onHeaderCell: () => ({
        style: {
          textAlign: "center",
        },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title:   "Số tiền",
      dataIndex: "amount",
      render: (_, record) => formatPrice(record.amount),
      sorter: (a, b) => a.amount - b.amount,
      onHeaderCell: () => ({
        style: {
          textAlign: "center",
        },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Trạng thái",
      dataIndex: "title",
      responsive: ["md"],
      onHeaderCell: () => ({
        style: {
          textAlign: "center",
        },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      render: (text) => (
        <span style={{ color: "#23db2c", fontWeight:"bold"}}>{text}</span>
      )
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <EyeOutlined
          style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => fetchPaymentDetail(record.id)}
        />
      ),
    },
  ];

  const renderOrderDetails = (order) => {
    return (
      <div style={{ minWidth: "800px" }}>
        <Descriptions
          labelStyle={{ width: "20%", fontWeight: "bold" }}
          style={{ width: "100%" }}
          bordered
          column={1}
        >
          <Descriptions.Item label="Mã giao dịch">{order.id}</Descriptions.Item>
          <Descriptions.Item label="ID khách hàng">
            {order.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Khách hàng"><UserName userId={order.userId} /></Descriptions.Item>
          <Descriptions.Item label="Số tiền">
            {formatPrice(order.amount)}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {order.description}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao dịch">
            {order.createdDate}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <span style={{ color: "#23db2c", fontWeight:"bold"}}>{order.title}</span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  return (
    <div className="paymentcontainer">
      <div className="paymentcontent">
      <Typography.Title level={2} >Quản lí giao dịch</Typography.Title>
        <Table
          size="large"
          columns={columns}
          dataSource={payment}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange}
        /> 
         {selectedPayment && (
          <Modal
            title={`Chi tiết giao dịch ${selectedPayment.id}`}
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            width={3000}
          >
            {renderOrderDetails(selectedPayment)}
          </Modal>
        )}
      </div>
    </div>
  );
};

const UserName = ({ userId }) => {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const dataUser = await getUserDetail(userId);
        setUserName(dataUser.data.fullName);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserName("Không tìm thấy người dùng");
      }
    };

    fetchUserName();
  }, [userId]);

  return <span>{userName}</span>;
};
export default ManagePayment;
