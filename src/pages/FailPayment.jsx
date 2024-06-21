import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
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
            </Result>
        </div>
    );
}

export default FailPayment;