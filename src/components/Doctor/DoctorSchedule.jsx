import { useState, useEffect } from "react";
import { Modal, TimePicker, Form, Typography, Button, List, message } from "antd";
import Calendar from "react-calendar";
import moment from "moment";
import "../../styles/DoctorSchedule.scss";
import "react-calendar/dist/Calendar.css";

const DoctorSchedule = ({ visible, onOk, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentRange, setCurrentRange] = useState(null);
  const [schedules, setSchedules] = useState({});

  const onDateChange = (date) => {
    setSelectedDate(date);
    setCurrentRange(null);
  };

  const onTimeChange = (time) => {
    setCurrentRange(time);
  };

  const addTimeRange = () => {
    if (currentRange && currentRange.length === 2) {
      const dateStr = moment(selectedDate).format("DD-MM-YYYY");
      const newRange = { range: [currentRange[0].toISOString(), currentRange[1].toISOString()] };
      setSchedules((prevSchedules) => ({
        ...prevSchedules,
        [dateStr]: prevSchedules[dateStr] ? [...prevSchedules[dateStr], newRange] : [newRange],
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

  const handleOk = () => {
    if (Object.keys(schedules).length === 0) {
      message.warning("Vui lòng chọn ít nhất một ngày và khoảng thời gian.");
      return;
    }
    onOk(schedules);
    setSelectedDate(null);
    setCurrentRange(null);
    setSchedules({});
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setCurrentRange(null);
    setSchedules({});
    onCancel();
  };

  return (
    <>
      <Modal
        title={<Typography.Title level={3} style={{ margin: 0 }}>Tạo lịch làm việc</Typography.Title>}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" className="doctor-schedule-form">
          <Form.Item label={<Typography.Text strong>Chọn ngày</Typography.Text>}>
            <Calendar
              onChange={onDateChange}
              value={selectedDate}
              tileDisabled={({ date }) => date < new Date()}
              locale="vi-VN"
            />
          </Form.Item>
          {selectedDate && (
            <>
              <Form.Item label={<Typography.Text strong>Chọn thời gian</Typography.Text>}>
                <TimePicker.RangePicker
                  value={currentRange}
                  onChange={onTimeChange}
                  format="HH:mm"
                  placeholder={["Từ", "Đến"]}
                  style={{ width: "100%" }}
                />
                <Button onClick={addTimeRange} style={{ marginTop: "10px" }}>
                  Thêm khoảng thời gian
                </Button>
              </Form.Item>
              <List
                size="small"
                bordered
                dataSource={schedules[moment(selectedDate).format("DD-MM-YYYY")] || []}
                renderItem={(schedule, index) => (
                  <List.Item
                    actions={[<Button type="link" onClick={() => removeTimeRange(moment(selectedDate).format("DD-MM-YYYY"), index)}>Xóa</Button>]}
                  >
                    {`${moment(schedule.range[0]).format("HH:mm")} - ${moment(schedule.range[1]).format("HH:mm")}`}
                  </List.Item>
                )}
                style={{ marginTop: "20px" }}
              />
            </>
          )}
        </Form>
        <div className="schedule-summary">
          <Typography.Title level={4}>Lịch làm việc đã chọn:</Typography.Title>
          <List
            dataSource={Object.entries(schedules)}
            renderItem={([date, ranges]) => (
              <List.Item>
                <Typography.Text strong>{date}:</Typography.Text>
                <List
                  dataSource={ranges}
                  renderItem={(schedule, index) => (
                    <List.Item>
                      {`${moment(schedule.range[0]).format("HH:mm")} - ${moment(schedule.range[1]).format("HH:mm")}`}
                    </List.Item>
                  )}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default DoctorSchedule;
