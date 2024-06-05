import { useSelector } from "react-redux";
import "../../styles/Workspace.scss"
import { Button, Card, Col, Row, Typography } from "antd";
import { CalendarOutlined, ClockCircleOutlined, HistoryOutlined, MessageOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const Workspace = () => {
    const doctorName = useSelector((state) => state.auth?.user?.data?.user?.fullName);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return ( 
        <>
            {/* workspace-header */}
            <Row align={"middle"} justify={"center"} className="workspace-header-container">
                <Row className="workspace-header-content">
                    <span style={{display:"flex", alignItems:"end", gap:"0px 8px", justifyContent:"flex-start"}}><p>BHEP, Xin chào </p><Typography.Title className="header-doctorname">{doctorName}</Typography.Title></span>
                    <Typography.Text className="header-time">{formattedDate}</Typography.Text>
                </Row>
            </Row>
            {/* main content */}
            <Row className="workspace-main-container" gutter={[16, 16]}>
                <Row className="workspace-main-content">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="workspace-card" hoverable>
                            <CalendarOutlined className="workspace-icon" />
                            <Typography.Title level={4}>Lịch làm việc</Typography.Title>
                            <Button type="primary">Tạo lịch làm việc</Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="workspace-card" hoverable>
                            <ClockCircleOutlined className="workspace-icon" />
                            <Typography.Title level={4}>Lịch hẹn với bệnh nhân</Typography.Title>
                            <Button type="primary">Xem lịch hẹn</Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="workspace-card" hoverable>
                            <HistoryOutlined className="workspace-icon" />
                            <Typography.Title level={4}>Lịch sử khám bệnh</Typography.Title>
                            <Button type="primary">Xem lịch sử khám bệnh</Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="workspace-card" hoverable>
                            <MessageOutlined className="workspace-icon" />
                            <Typography.Title level={4}>Tin nhắn từ bệnh nhân</Typography.Title>
                            <Button type="primary">Xem tin nhắn</Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card className="workspace-card" hoverable>
                            <QuestionCircleOutlined className="workspace-icon" />
                            <Typography.Title level={4}>Câu hỏi từ bệnh nhân</Typography.Title>
                            <Button type="primary">Xem câu hỏi</Button>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </>
     );
}
 
export default Workspace;
