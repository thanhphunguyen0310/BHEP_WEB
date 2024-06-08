import { useState, useEffect } from "react";
import {
  Modal,
  TimePicker,
  Form,
  Typography,
  Button,
  List,
  message,
} from "antd";
import Calendar from "react-calendar";
import moment from "moment";
import "../../styles/DoctorSchedule.scss";
import "react-calendar/dist/Calendar.css";
import {
  createDoctorSchedule,
  getDoctorSchedule,
} from "../../configs/api/doctorApi";
import { useSelector } from "react-redux";

const DoctorSchedule = ({ visible, onOk, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRange, setCurrentRange] = useState(null);
  const [schedules, setSchedules] = useState({});
  const [existingSchedules, setExistingSchedules] = useState({});

  const employeeId = useSelector((state) => state.auth?.user?.data?.user?.id);

  const today = moment().startOf("day");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const fetchedSchedules = await getDoctorSchedule(employeeId);
        const formattedSchedules = fetchedSchedules.reduce((acc, schedule) => {
          const dateStr = schedule.date;
          const timeRanges = schedule.time.map((timeRange) => {
            const [startTime, endTime] = timeRange.split(" - ");
            return {
              range: [
                moment(
                  dateStr + " " + startTime,
                  "DD-MM-YYYY HH:mm"
                ).toISOString(),
                moment(
                  dateStr + " " + endTime,
                  "DD-MM-YYYY HH:mm"
                ).toISOString(),
              ],
            };
          });
          acc[dateStr] = timeRanges;
          return acc;
        }, {});
        setSchedules(formattedSchedules);
        setExistingSchedules(formattedSchedules); // Save existing schedules separately
      } catch (error) {
        message.error("Có lỗi xảy ra khi lấy lịch làm việc: " + error.message);
      }
    };

    if (visible) {
      fetchSchedules();
    }
  }, [visible, employeeId]);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setCurrentRange(null);
  };

  const onTimeChange = (time) => {
    setCurrentRange(time);
  };

  const addTimeRange = () => {
    if (timeRange && timeRange.length === 2) {
      const dateStr = moment(selectedDate).format("DD-MM-YYYY");
      const newRange = {
        range: [timeRange[0].toISOString(), timeRange[1].toISOString()],
      };

      const existingRanges = schedules[dateStr] || [];
      const isDuplicate = existingRanges.some(
        (existingRange) =>
          moment(existingRange.range[0]).isSame(newRange.range[0]) &&
          moment(existingRange.range[1]).isSame(newRange.range[1])
      );

      if (isDuplicate) {
        message.warning("Thời gian này đã được tạo.");
        return;
      }

      setSchedules((prevSchedules) => ({
        ...prevSchedules,
        [dateStr]: prevSchedules[dateStr]
          ? [...prevSchedules[dateStr], newRange]
          : [newRange],
      }));
      setCurrentRange(null);
    } else {
      message.warning("Vui lòng chọn một khoảng thời gian hợp lệ.");
    }
  };

  const removeTimeRange = (dateStr, index) => {
    setSchedules((prevSchedules) => {
      const newSchedules = { ...prevSchedules };
      newSchedules[dateStr].splice(index, 1);
      if (newSchedules[dateStr].length === 0) {
        delete newSchedules[dateStr];
      }
      return newSchedules;
    });
  };

  const handleOk = async () => {
    // check user need to choose time
    if (Object.keys(schedules).length === 0) {
      message.warning("Vui lòng chọn ít nhất một ngày và khoảng thời gian.");
      return;
    }

    const newSchedules = Object.entries(schedules).reduce(
      (acc, [date, ranges]) => {
        const existingRanges = existingSchedules[date] || [];
        const newRanges = ranges.filter((range) => {
          return !existingRanges.some(
            (existingRange) =>
              moment(existingRange.range[0]).isSame(range.range[0]) &&
              moment(existingRange.range[1]).isSame(range.range[1])
          );
        });
        if (newRanges.length > 0) {
          acc[date] = newRanges;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(newSchedules).length === 0) {
      message.warning("Không có lịch mới nào được tạo.");
      return;
    }

    const formattedSchedules = Object.entries(newSchedules).map(
      ([date, ranges]) => ({
        date: date,
        time: ranges.map((range) => {
          const startTime = moment(range.range[0]).format("HH:mm");
          const endTime = moment(range.range[1]).format("HH:mm");
          return `${startTime} - ${endTime}`;
        }),
      })
    );

    try {
      const response = await createDoctorSchedule(
        employeeId,
        formattedSchedules
      );
      if (response.isSuccess) {
        message.success("Tạo lịch làm việc thành công!");
        setSelectedDate(null);
        setCurrentRange(null);
        setSchedules({});
        onOk(newSchedules);
      } else {
        message.error(`Có lỗi xảy ra: ${response.message}`);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo lịch làm việc: " + error.message);
    }
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setCurrentRange(null);
    setSchedules({});
    onCancel();
  };

  const filteredSchedules = Object.entries(schedules)
    .filter(([date]) => moment(date, "DD-MM-YYYY").isSameOrAfter(today))
    .sort(([dateA], [dateB]) =>
      moment(dateA, "DD-MM-YYYY").diff(moment(dateB, "DD-MM-YYYY"))
    )
    .reduce((acc, [date, ranges]) => {
      acc[date] = ranges;
      return acc;
    }, {});

  return (
    <>
      <Modal
        title={
          <Typography.Title level={3} style={{ margin: 0 }}>
            Tạo lịch làm việc
          </Typography.Title>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" className="doctor-schedule-form">
          <Form.Item
            label={<Typography.Text strong>Chọn ngày</Typography.Text>}
          >
            <Calendar
              onChange={onDateChange}
              value={selectedDate}
              tileDisabled={({ date }) => moment(date).isBefore(today)}
              locale="vi-VN"
            />
          </Form.Item>
          {selectedDate && (
            <div style={{width:"80%"}}>
              <Form.Item
                label={<Typography.Text strong>Chọn thời gian</Typography.Text>}
              >
                <TimePicker.RangePicker
                  value={timeRange}
                  onChange={onTimeChange}
                  format="HH:mm"
                  placeholder={["Từ", "Đến"]}
                />
                <Button onClick={addTimeRange} style={{ marginTop: "10px" }}>
                  Thêm khoảng thời gian
                </Button>
              </Form.Item>
              <List
                size="small"
                bordered
                dataSource={
                  schedules[moment(selectedDate).format("DD-MM-YYYY")] || []
                }
                renderItem={(schedule, index) => (
                  <List.Item
                    actions={[
                      <Button
                        key="delete-btn"
                        type="link"
                        onClick={() =>
                          removeTimeRange(
                            moment(selectedDate).format("DD-MM-YYYY"),
                            index
                          )
                        }
                      >
                        Xóa
                      </Button>,
                    ]}
                  >
                    {`${moment(schedule.range[0]).format("HH:mm")} - ${moment(
                      schedule.range[1]
                    ).format("HH:mm")}`}
                  </List.Item>
                )}
                style={{ marginTop: "20px" }}
              />
            </div>
          )}
        </Form>
        <div className="schedule-summary">
          <Typography.Title level={4}>Lịch làm việc đã chọn:</Typography.Title>
          <List
            dataSource={Object.entries(filteredSchedules)}
            renderItem={([date, ranges]) => (
              <List.Item className="schedule-item">
                <Typography.Text className="date">{date}</Typography.Text>
                <div className="time">
                  {ranges.map((schedule, index) => (
                    <Typography.Text key={index}>
                      {moment(schedule.range[0]).format("HH:mm")} -{" "}
                      {moment(schedule.range[1]).format("HH:mm")}{" "}
                    </Typography.Text>
                  ))}
                </div>
              </List.Item>
            )}
            className="scrollable-list"
          />
        </div>
      </Modal>
    </>
  );
};

export default DoctorSchedule;
