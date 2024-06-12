import { Button, Modal, Radio, Space, Typography, message } from "antd";
import { MdPayment } from "react-icons/md";
import { FaMoneyBillWave, FaCreditCard, FaRegCreditCard } from "react-icons/fa";
import "../../styles/AppointmentPayment.scss"; // Import file for custom styling
import { useState } from "react";
import { makePayment } from "../../configs/api/appointmentApi"
import { useSelector } from "react-redux";

const AppointmentPayment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector((state) => state.auth?.user?.data?.user?.id);
  const price = useSelector((state) => state?.appointment?.price);

  const getPaymentMethod = (selectedPaymentMethod) => {
    switch (selectedPaymentMethod) {
      case 1:
        return "Thanh toán tiền mặt";
      case 2:
        return "Thanh toán bằng thẻ Visa / Mastercard";
      case 3:
        return "Thanh toán bằng thẻ ATM nội địa";
      case 4:
        return "Thanh toán bằng VNPay";
      default:
        return " ";
    }
  };
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const handlePaymentButtonClick = () => {
    if (selectedPaymentMethod) {
      setIsModalVisible(true);
    } else {
      message.error(
        "Vui lòng chọn hình thức thanh toán trước khi tiến hành thanh toán."
      );
    }
  };
  const handleConfirmPayment = async () => {
    try {
      const payment = await makePayment(userId, price);
      if (payment?.data?.isSuccess) {
        const paymentUrl = payment?.data?.data?.paymentUrl;
        console.log(paymentUrl)
        window.location.href = paymentUrl;
      } else {
        message.error("Có lỗi xảy ra khi tạo lịch hẹn. Vui lòng thử lại.");
      }
      console.log(payment)
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error making appointment:", error);
      message.error("Có lỗi xảy ra khi tạo lịch hẹn. Vui lòng thử lại.");
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="payment-container">
      <Typography.Title level={5}>Chọn hình thức thanh toán</Typography.Title>
      <Radio.Group onChange={handlePaymentMethodChange} className="radio-group">
        <Space direction="vertical">
          <Radio disabled className="radio-option" value={1}>
            <FaMoneyBillWave
              style={{
                color: "#32a852",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />{" "}
            Thanh toán tiền mặt
          </Radio>
          <Radio disabled className="radio-option" value={2}>
            <FaCreditCard
              style={{
                color: "#a83242",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />{" "}
            Thanh toán bằng thẻ Visa / Mastercard
          </Radio>
          <Radio disabled className="radio-option" value={3}>
            <FaRegCreditCard
              style={{
                color: "#d6f525",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />{" "}
            Thanh toán bằng thẻ ATM nội địa
          </Radio>
          <Radio className="radio-option" value={4}>
            <MdPayment
              style={{
                color: "#2f81f5",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />{" "}
            Thanh toán bằng VNPay
          </Radio>
        </Space>
      </Radio.Group>
      {selectedPaymentMethod && (
        <Button
          type="primary"
          size="large"
          onClick={handlePaymentButtonClick}
          className="payment-button"
        >
          Thanh toán
        </Button>
      )}
      <Modal
        title="Xác nhận thanh toán"
        open={isModalVisible}
        onOk={handleConfirmPayment}
        onCancel={handleCancel}
      >
        <p>
          Bạn xác nhận thanh toán bằng hình thức{" "}
          <strong>{getPaymentMethod(selectedPaymentMethod)}</strong> chứ?
        </p>
      </Modal>
    </div>
  );
};

export default AppointmentPayment;
