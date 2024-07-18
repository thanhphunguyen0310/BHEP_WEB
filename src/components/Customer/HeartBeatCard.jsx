import { Card, Col, Image, Row, Typography } from "antd";
import HeartBeat from "../../assets/icon/heartbeat.svg";

const HealthTrackingCard = ({ data }) => {
  const getFontSize = (dataString) => {
    if (dataString.length >= 3) {
      return "20px"; // Kích thước nhỏ hơn nếu dữ liệu dài
    }
    return "25px"; // Kích thước mặc định
  };
  const formattedData = data.toFixed(2); // Format data to 2 decimal places and round
  const dataString = formattedData.toString(); 
  return (
    <Card
      hoverable
      style={{ border: "1px solid #3285a8" }}
      title={
        <>
          <Typography.Title level={5}>Chỉ số nhịp tim</Typography.Title>
        </>
      }
    >
      <Row justify={"space-between"} align={"middle"} className="health-index">
        <Col span={12}>
          <Typography.Text
            style={{
              fontWeight: "600",
              fontSize: getFontSize(data.toString()), // Áp dụng kích thước font
            }}
          >
            {dataString} bpm
          </Typography.Text>
        </Col>
        <Col span={8}>
          <Image
            preview={false}
            src={HeartBeat}
            style={{ width: "50px", height: "50px" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default HealthTrackingCard;
