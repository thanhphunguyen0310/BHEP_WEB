import { Typography, Row, Col, Spin, Button, Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getPaymentStatus } from "../../configs/api/appointmentApi";
import "../../styles/AppointmentFinish.scss";
import { useEffect, useState } from "react";

const AppointmentFinish = ({ paymentId }) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const paymentStatus = await getPaymentStatus(paymentId);
      if (paymentStatus.isSuccess) {
        setIsPaymentComplete(true);
      }
      setLoading(false);
    };

    checkPaymentStatus();
  }, [paymentId]);

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : isPaymentComplete ? (
        <Result
          status="success"
          title="Đặt lịch thành công"
          subTitle="Cảm ơn bạn đã đặt lịch khám. Chúng tôi sẽ liên hệ với bạn sớm nhất."
        />
      ) : (
        <Result
          status="info"
          title="Đang chờ bạn thanh toán"
          subTitle="Vui lòng hoàn tất thanh toán để xác nhận đặt lịch khám."
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => window.location.reload()}
            >
              Kiểm tra lại
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default AppointmentFinish;
