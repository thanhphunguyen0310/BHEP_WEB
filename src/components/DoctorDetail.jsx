import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  DatePicker,
  Image,
  List,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../styles/DoctorDetail.scss";
import { getDoctorDetail, getScheduleByDate } from "../configs/api/doctorApi";
import DoctorBanner1 from "../assets/img/doctor-banner1.png";
import DoctorBanner2 from "../assets/img/doctor-banner2.png";
import DoctorBanner3 from "../assets/img/doctor-banner3.png";
import stethoscope from "../assets/icon/stethoscope.svg";
import hospital from "../assets/icon/hospital.svg";
import briefcase from "../assets/icon/briefcase.svg";
import star from "../assets/icon/star.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

dayjs.extend(customParseFormat);
const dateFormat = "DD-MM-YYYY";
const DoctorDetail = () => {
  const data = [
    "(1986 - 1994) Bác sĩ nội khoa truyền nhiễm,Bệnh viện Nhân Dân Gia Định",
    "(1994 - 1997) Phó trưởng phòng Kế hoach tổng hợp, Bác sĩ tim mach, Bệnh viện Nhân Dân Gia Định",
    "(1997 - 1999) Phó trưởng khoa Cơ Xương khớp, Bệnh viện Nhân Dân Gia Định",
    "(2004 - 2007) Phó phòng Tổ chức cán bộ, Bệnh viện Nhân Dân Gia Định",
    "(2007 - 2008) Trưởng phòng Tổ chức cán bộ, Bệnh viện Nhân Dân Gia Định",
    "(2008 - 2010) Phó giám đốc bệnh viện, Bệnh viện Nhân Dân Gia Định",
    "(2010 - 2016) Giám đốc Trung tâm Cơ Xương khớp, Bệnh viện Nhân Dân Gia Định",
    "(2016 - 2018) Tiến sĩ Nội xương khớp, Bệnh viện Nhân Dân Gia Định",
    "(2020 - Hiện nay) Giám đốc Phòng khám, Tổ hợp y tế Mediplus",
  ];
  const getSpecialistState = (specialistId) => {
    switch (specialistId) {
      case 1:
        return "Nội khoa";
      case 2:
        return "Răng hàm mặt";
      case 3:
        return "Da liễu";
      case 4:
        return "Tai mũi họng";
      case 5:
        return "Hô hấp";
      case 7:
        return "Tim mạch";
      case 8:
        return "Xương khớp";
      case 9:
        return "Phụ sản";
      case 10:
        return "Thần kinh";
      case 11:
        return "Dinh dưỡng";
      case 12:
        return "Ký sinh trùng";
      default:
        return "Không xác định";
    }
  };
  const { id } = useParams();
  const today = dayjs();
  const maxDate = today.add(7, "day");
  const [selectedDate, setSelectedDate] = useState(today);
  const [schedule, setSchedule] = useState([]);
  const [doctorDetail, setDoctorDetail] = useState("")
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = date.format(dateFormat);
    try {
      const data = await getScheduleByDate(formattedDate);
      setSchedule(data.weekSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const doctorData = await getDoctorDetail(id);
        console.log(doctorData.data);
        setDoctorDetail(doctorData.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctorDetail();
  }, [id]);

  return (
    <>
      {/* banner doctor */}
      <Carousel style={{ width: "100vw" }} infinite={false}>
        <div>
          <img style={{ width: "100vw" }} src={DoctorBanner1} />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={DoctorBanner2} />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={DoctorBanner3} />
        </div>
      </Carousel>
      {/* doctor infor */}
      <Row
        justify={"center"}
        style={{ backgroundColor: "#D7ECFF", width: "100vw" }}
      >
        <Row
          style={{
            borderRadius: "8px",
            width: "80%",
            margin: "20px 0px",
            backgroundColor: "white",
          }}
          justify="space-around"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col
            span={8}
            style={{
              justifyContent: "flex-end",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar src={DoctorBanner1} size={160} shape="square" />
          </Col>

          <Col style={{ padding: "24px 20px" }} span={16}>
            <Row
              style={{
                justifyContent: "flex-start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography.Title
                style={{
                  marginBottom: "0px",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                {doctorDetail.description} {doctorDetail.fullName}
              </Typography.Title>
             
              <Row align={"middle"}>
                <Col span={12}>
                  <Row
                    style={{ padding: "10px 0px" }}
                    align="middle"
                    gutter={8}
                  >
                    <Col>
                      <Image
                        height={"20px"}
                        width={"20px"}
                        preview={false}
                        src={stethoscope}
                      />
                    </Col>
                    <Col>
                      <p style={{ margin: 0 }}>Tim mạch</p>
                    </Col>
                  </Row>

                  <Row
                    style={{ padding: "10px 0px" }}
                    align="middle"
                    gutter={8}
                  >
                    <Col>
                      <Image
                        height={"20px"}
                        width={"20px"}
                        preview={false}
                        src={hospital}
                      />
                    </Col>
                    <Col>
                      <p style={{ margin: 0 }}>Bệnh viện Nhân dân Gia Định</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row
                    style={{ padding: "10px 0px" }}
                    align="middle"
                    gutter={8}
                  >
                    <Col>
                      <Image
                        height={"20px"}
                        width={"20px"}
                        preview={false}
                        src={briefcase}
                      />
                    </Col>
                    <Col>
                      <p style={{ margin: 0 }}>Lượt đặt</p>
                    </Col>
                  </Row>

                  <Row
                    style={{ padding: "10px 0px" }}
                    align="middle"
                    gutter={8}
                  >
                    <Col>
                      <Image
                        height={"20px"}
                        width={"20px"}
                        preview={false}
                        src={star}
                      />
                    </Col>
                    <Col>
                      <p style={{ margin: 0 }}>Đánh giá: {doctorDetail.rates[0].rate.toFixed(1)}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Row>
      {/* doctor schedule */}
      <Row
        className="schedule-container"
        justify={"center"}
        style={{ width: "100vw", backgroundColor: "#D7ECFF", padding:"24px 0px" }}
      >
        <Row
          className="time-booking"
          align={"top"}
          justify={"center"}
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "24px 16px",
            borderRadius: "8px",
          }}
        >
          <Row
            className="header-time-picker"
            align={"middle"}
            justify={"center"}
            style={{ width: "70%" }}
          >
            <Col span={4}>
              <Typography.Title level={5}>Lịch hẹn</Typography.Title>
            </Col>
            <Col span={12}>
              <DatePicker
                size={"middle"}
                defaultValue={today}
                format={dateFormat}
                disabledDate={(current) =>
                  current &&
                  (current < today.startOf("day") ||
                    current > maxDate.endOf("day"))
                }
                onChange={handleDateChange}
              />
            </Col>
          </Row>
          <Row
            className="time-picker"
            align={"middle"}
            justify={"center"}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Row style={{ width: "80%" }} align={"top"}>
              {schedule.length > 0 ? (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={schedule[0].time}
                  renderItem={(time) => (
                    <List.Item>
                      <Card size="small">
                        <p>{time}</p>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Typography.Text>
                  No schedule available for the selected date
                </Typography.Text>
              )}
            </Row>
          </Row>
          <Row style={{ width: "90%" }} justify={"end"} className="booking-btn">
              <Button>
                Đặt lịch ngay
              </Button>
          </Row>
        </Row>
      </Row>
      {/* doctor experience */}
      <Row
        className="doctor-experience-container"
        justify={"center"}
        style={{ width: "100vw", padding:"24px 0px" }}
      >
        <Row
          className="doctor-experience-content"
          style={{ marginTop: "1rem", width: "60%" }}
        >
          <Row
            align={"top"}
            className="work-experience"
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <Typography.Title level={5.5}>
              Kinh nghiệm làm việc
            </Typography.Title>
            <p>
              Giám đốc Phòng khám Tổ hợp Y tế Mediplus Nguyên Phó Giám đốc Bệnh
              viện Nhân Dân Gia ĐịnhHơn 30 năm kinh nghiệm khám và điều trị các
              bệnh nội cơ xương khớp Bác sĩ nhận khám bệnh nhân từ 16 tuổi trở
              lên
            </p>
          </Row>
          <Row
            align={"top"}
            className="work-experience"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              marginTop: "1.5rem",
            }}
          >
            <Typography.Title level={5.5}>Quá trình công tác</Typography.Title>
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>{item}</Typography.Text> 
                </List.Item>
              )}
            />
          </Row>
        </Row>
      </Row>
    </>
  );
};

export default DoctorDetail;
{
  /* <Col
style={{
  justifyContent: "flex-end",
  display: "flex",
  alignItems: "center",
}}
span={8}
>
<Avatar src={DoctorBanner1} size={140} shape="square" />
</Col>
<Col style={{ justifyContent: "center", display: "flex", flexDirection:"column", alignItems:"flex-start" }} span={8}>
<Typography.Title level={5}>Bác sĩ Trường Sơn</Typography.Title>
<Row style={{padding:"10px 0px"}} align="middle" gutter={8}>
<Col>
  <Image
    height={"20px"}
    width={"20px"}
    preview={false}
    src={stethoscope}
  />
</Col>
<Col>
  <p style={{ margin: 0 }}>Tim mạch</p>
</Col>
</Row>

<Row style={{padding:"10px 0px"}} align="middle" gutter={8}>
<Col>
  <Image
    height={"20px"}
    width={"20px"}
    preview={false}
    src={hospital}
  />
</Col>
<Col>
  <p style={{ margin: 0 }}>Bệnh viện Nhân dân Gia Định</p>
</Col>
</Row>

</Col>
<Col style={{ justifyContent: "center", display: "flex" }} span={8}>
a
</Col> */
}
