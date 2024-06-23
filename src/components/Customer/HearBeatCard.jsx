import { Card, Col, Image, Row, Typography } from "antd";
import HeartBeat from "../../assets/icon/heartbeat.svg";

const HealthTrackingCard = ({ data }) => {
  return (
    <Card
      hoverable
      style={{border:"1px solid #3285a8"}}
      title={
        <>
          <Typography.Title level={5}>Chỉ số nhịp tim</Typography.Title>
        </>
      }
    >
      <Row justify={"space-between"} align={"middle"} className="health-index">
        <Col span={12}>
          <Typography.Text style={{fontWeight:"600", fontSize:"25px"}}>{data} bpm</Typography.Text>
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
