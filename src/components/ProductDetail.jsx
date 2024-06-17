import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.scss"
const ProductDetail = () => {
  const { id } = useParams();

  return (  
<div className="product-detail-container">
    <div className="product-detail-content">
        <Row className="product-detail-header">
            <Col span={8} className="product-img">
                <Row>
                Ảnh trên
                </Row>
                <Row>
                    Ảnh dưới
                </Row>
            </Col>
            <Col span={12} className="product-content">
            <Row>AAAAAAAAAAA</Row>
            </Col>
        </Row>
    </div>
</div>
  
)};

export default ProductDetail;
