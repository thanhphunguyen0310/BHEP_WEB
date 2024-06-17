import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.scss"
import { useEffect, useState } from "react";
import { getDeviceById, getServiceById } from "../configs/api/productApi";

const ProductDetail = () => {
    const { id, type } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            let response;
            if (type === "device") {
              response = await getDeviceById(id);
            } else if (type === "service") {
              response = await getServiceById(id);
            }
            console.log(response)
            setProduct(response.data);
          } catch (error) {
            console.error("Error fetching product details:", error);
          }
        };
        fetchProduct();
      }, [id, type]);
    
      if (!product) {
        return <div>Loading...</div>;
      }
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
