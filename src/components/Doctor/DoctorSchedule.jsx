import { useState } from "react";
import { Modal, DatePicker, TimePicker, Form, Typography, message } from "antd";
import moment from "moment";
import "../../styles/DoctorSchedule.scss";

const DoctorSchedule = ({ visible, onOk, onCancel }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
  
    const onDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const onTimeChange = (time) => {
      if (!selectedDate) {
        message.warning('Vui lòng chọn ngày trước khi chọn giờ.');
        return;
      }
      setSelectedTime(time);
    };
  
    const handleOk = () => {
      if (!selectedDate) {
        message.warning('Vui lòng chọn ngày.');
        return;
      }
      if (!selectedTime) {
        message.warning('Vui lòng chọn thời gian.');
        return;
      }
      onOk(selectedDate, selectedTime);
      setSelectedDate(null);
      setSelectedTime(null);
    };
    const handleCancel = () => {
        setSelectedDate(null);
        setSelectedTime(null);
        onCancel();
      };

  return (
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
        <DatePicker
          placeholder='Chọn ngày'
          onChange={onDateChange}
          disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text strong>Chọn thời gian</Typography.Text>}>
        <TimePicker.RangePicker
          value={selectedTime}
          onChange={onTimeChange}
          format="HH:mm"
          placeholder={['Từ', 'Đến']}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Form>
  </Modal>
  );
};

export default DoctorSchedule;
