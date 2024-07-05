import { useEffect, useState } from "react";
import {
  getAllJobApplication,
  getJobApplicationById,
  updateJobApplicationStatus,
} from "../../configs/api/jobApplicationApi";
import "../../styles/ManageJobApplication.scss";
import { Avatar, Button, Descriptions, Modal, Space, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const ManageJobApplication = () => {
  const [jobApplication, setJobApplication] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobApplication, setSelectedJobApplication] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchJobApplication = async (pageIndex = 1, pageSize = 10) => {
    const data = await getAllJobApplication();
    setJobApplication(data);
    setPagination({
      ...pagination,
      current: data.pageIndex,
      pageSize: data.pageSize,
      total: data.totalCount,
    });
  };
  const fetchJobApplicationDetail = async (jobApplicationId) => {
    try {
      const data = await getJobApplicationById(jobApplicationId);
      console.log(data.data);
      setSelectedJobApplication(data.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching job application details:", error);
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedJobApplication(null);
  };
  const handleTableChange = (pagination) => {
    fetchJobApplication(pagination.current, pagination.pageSize);
  };
  useEffect(() => {
    fetchJobApplication(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);
  const getStatusApplication = (status) => {
    switch (status) {
      case 1:
        return <p style={{ color: "blue" }}>Đang xử lí</p>;
      case 2:
        return <p style={{ color: "green" }}>Chấp nhận</p>;
      case -1:
        return <p style={{ color: "red" }}>Từ chối</p>;
      default:
        return "Không xác định";
    }
  };
  const getMajor = (majorId) => {
    switch (majorId) {
      case 1:
        return "Bác sĩ";
      case 2:
        return "Dược sĩ";
      case 3:
        return "Y tá";
      case 4:
        return "Điều dưỡng";
      case 5:
        return "Kỹ thuật viên";
      default:
        return "Không xác định";
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      showSorterTooltip: {
        target: "full-header",
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Chuyên khoa",
      dataIndex: "majorId",
      render: (text, record) => getMajor(record.majorId),
    },
    {
      title: "Nơi làm việc",
      dataIndex: "workPlace",
    },
    {
      title: "Năm kinh nghiệm",
      dataIndex: "experienceYear",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.experienceYear - b.experienceYear,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đang xử lí",
          value: 1,
        },
        {
          text: "Chấp nhận",
          value: 2,
        },
        {
          text: "Từ chối",
          value: -1,
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => getStatusApplication(record.status),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <EyeOutlined
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => fetchJobApplicationDetail(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="job-application-container">
      <div className="job-application-content">
        <Table
          size="large"
          columns={columns}
          dataSource={jobApplication?.items}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </div>
      <Modal
        title="Chi tiết đơn ứng tuyển"
        open={openModal}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        
      >
        {selectedJobApplication ? (
          <div className="job-application-details">
            <div className="avatar-container">
              <Avatar
                shape="square"
                size={100}
                src={selectedJobApplication.customer.avatar}
              />
            </div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="ID">
                {selectedJobApplication.id}
              </Descriptions.Item>
              <Descriptions.Item label="Họ và tên">
                {selectedJobApplication.customer.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Vị trí ứng tuyển">
                {getMajor(selectedJobApplication.majorId)}
              </Descriptions.Item>
              <Descriptions.Item label="Nơi làm việc">
                {selectedJobApplication.workPlace}
              </Descriptions.Item>
              <Descriptions.Item label="Năm kinh nghiệm">
                {selectedJobApplication.experienceYear}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {getStatusApplication(selectedJobApplication.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Chứng nhận">
                {selectedJobApplication.certification}
              </Descriptions.Item>
              <Descriptions.Item label="Lý do hủy">
                {selectedJobApplication.cancelReason}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedJobApplication.customer.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedJobApplication.customer.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {selectedJobApplication.customer.gender === 1 ? "Nam" : "Nữ"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái hoạt động">
                {selectedJobApplication.customer.isActive
                  ? "Hoạt động"
                  : "Không hoạt động"}
              </Descriptions.Item>
            </Descriptions>
            <Space align="center" size={20}>
                    <Button type="primary">Xác nhận</Button>
                    <Button type="primary" danger>Từ chối   </Button>
            </Space>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </Modal>
    </div>
  );
};

export default ManageJobApplication;
