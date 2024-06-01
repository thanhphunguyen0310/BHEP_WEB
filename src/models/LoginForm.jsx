import { Modal, Button, Form, Input, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import LOGO from "../assets/img/LOGO.png";
import "../styles/LoginForm.scss";

const LoginForm = ({ closeForm, openRegistForm }) => {
  
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsOpen(false);
    closeForm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    closeForm();
  };

  const onFinish = (values) => {
    setIsOpen(false);
    closeForm();
    dispatch(login(values));
  };

  return (
    <Modal
      title="Đăng nhập"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="login-modal-content">
        <div className="banner-login">
          <img src={LOGO} alt="banner" />
        </div>
        <div className="login-form">
          <Form
            layout="vertical"
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Nhập Email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Nhập mật khẩu!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ đăng nhập</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Quên mật khẩu
              </a>
            </Form.Item>

            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Đăng nhập
            </Button>
            <Form.Item>
              <span>
                Bạn chưa có tài khoản? <a onClick={openRegistForm}>Đăng ký</a>
              </span>
            </Form.Item>
          </Form>
          {auth.status === 'failed' && <p style={{ color: 'red' }}>{auth.error}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default LoginForm;
