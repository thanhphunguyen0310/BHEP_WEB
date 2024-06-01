import { Avatar, Col, Flex, Image, Input, Row, Typography } from "antd";
import { ShoppingFilled } from "@ant-design/icons"
import category from "../assets/icon/category.svg"
import "../styles/Store.scss";
const Store = () => {
  return (
    <div className="store-container">
      <Flex className="search-bar" align="center" justify="center" gap={30}>
          <Input.Search size="large" style={{width:"60%"}}/>
          <Avatar style={{backgroundColor:"white"}} size={"large"} icon={<ShoppingFilled style={{color:"black"}}/>} />
      </Flex>

      <Row align={"middle"} justify={"center"} className="category-container" style={{width:"100vw", margin:"16px 0px"}}>
        <Row className="category-content" style={{width:"100%",height:"64px", backgroundColor:"#9CE3FA", margin:"0px 100px"}}>
            <Col span={4}
            style={{display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}
            >
              <Image style={{width:"25px", height:"25px"}} src={category} />
            <Typography.Title level={5}>Danh mục</Typography.Title>
            </Col>
            <Col span={20}>
              aaa
            </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Store;
