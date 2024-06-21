import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Paragraph, Text } = Typography;
const FailPayment = () => {
    const navigate = useNavigate();
    return (
        <div className="fail-payment-container">
            <Result
                status="error"
                title="Giao dịch thất bại"
                subTitle="Vui lòng kiểm tra lại thông tin."
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate(`/`)}>
                        Về trang chủ
                    </Button>,
                    <Button key="buy" onClick={() => navigate(`/add-coin`)}>Thực hiện lại</Button>,
                ]}
            >
                {/* <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            The content you submitted has the following error:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
                        frozen. <a>Thaw immediately &gt;</a>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
                        eligible to apply. <a>Apply Unlock &gt;</a>
                    </Paragraph>
                </div> */}
            </Result>
        </div>
    );
}

export default FailPayment;