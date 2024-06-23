import { Card, Col, Image, Row, Typography } from "antd";
import SpO2Icon from "../../assets/img/spo2.png";

const SpO2Card = ({ data }) => {
  return (
    <Card
      hoverable
      style={{border:"1px solid #3285a8"}}
      title={
        <>
          <Typography.Title level={5}>Chỉ số SpO2</Typography.Title>
        </>
      }
    >
      <Row justify={"space-between"} align={"middle"} className="health-index">
        <Col span={12}>
          <Typography.Text style={{fontWeight:"600", fontSize:"25px"}}>{data} %</Typography.Text>
        </Col>
        <Col span={8}>
          <Image
            preview={false}
            src={SpO2Icon}
            style={{ width: "50px", height: "50px" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SpO2Card;
