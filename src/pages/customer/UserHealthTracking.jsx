import { ref, onValue } from "firebase/database";
import { database } from "../../configs/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import "../../styles/HealthTracking.scss";
import { Col, Image, Row, Spin, Typography } from "antd";
import HeartBeatCard from "../../components/Customer/HeartBeatCard";
import SpO2Card from "../../components/Customer/SpO2Card";
import BodyTemperatureCard from "../../components/Customer/BodyTemperatureCard";
import LOGO from "../../assets/img/LOGO.png";
import { useSelector } from "react-redux";
import { getUserDetail } from "../../configs/api/userApi";

const UserHealthTracking = () => {
  const [userHealth, setUserHealth] = useState();
  const [userDeviceCode, setUserDeviceCode] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasDevice, setHasDevice] = useState(false);
  const userId = useSelector((state) => state.auth?.user?.data?.user?.id);

  const checkUserDevice = async () => {
    const userDevice = await getUserDetail(userId);
    console.log(userDevice.data.deviceCodes);
    setUserDeviceCode(userDevice.data.deviceCodes);
  };
  useEffect(() => {
    checkUserDevice();
  }, [userId]);

  const fetchUserHealthData = (deviceCode) => {
    const userHealthRef = ref(database, deviceCode);
    const unsubscribe = onValue(userHealthRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsUpdating(true);
        const newData = snapshot.val();
        setUserHealth((prevHealth) => ({
          ...prevHealth,
          [deviceCode]: newData, // Store data under the specific device code
        }));
        setHasDevice(true);
      } else {
        console.log("No data available for device code:", deviceCode);
        setHasDevice(false);
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    if (userDeviceCode.length > 0) {
      let unsubscribeFunctions = [];
      // Iterate over userDeviceCodes and fetch data for each device code
      for (const deviceCode of userDeviceCode) {
        const unsubscribe = fetchUserHealthData(deviceCode);
        unsubscribeFunctions.push(unsubscribe);
      }

      return () => {
        // Unsubscribe from Firebase listeners when component unmounts or dependencies change
        unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };
    }
  }, [userDeviceCode]); // Watch for changes in userDeviceCodes

  useEffect(() => {
    if (userHealth && isUpdating) {
      // Sau 3 giây, tắt animation và hiển thị lại dòng chữ
      const timeout = setTimeout(() => {
        setIsUpdating(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [userHealth, isUpdating]);
  return (
    <div className="health-tracking-container">
      <div className="health-tracking-content">
        <Row className="health-tracking-title">
          <Typography.Title level={3}>THÔNG TIN VỀ SỨC KHỎE</Typography.Title>
        </Row>
        {hasDevice ? (
          userHealth ? (
            <Row className="health-tracking-card" gutter={[16, 16]}>
              <Col span={8}>
                <HeartBeatCard data={userHealth?.HeartBeat} />
              </Col>
              <Col span={8}>
                <SpO2Card data={userHealth?.SpO2} />
              </Col>
              <Col span={8}>
                <BodyTemperatureCard data={userHealth?.Temperature} />
              </Col>
            </Row>
          ) : (
            <Spin />
          )
        ) : (
          <Typography.Text>
            Chức năng yêu cầu người dùng phải có thiết bị
          </Typography.Text>
        )}
        <div className="update-data">
          <Row className="mascot">
            <Image
              preview={false}
              src={LOGO}
              className={isUpdating ? "mascot-updating" : ""}
            />
          </Row>
          {!isUpdating && hasDevice && (
            <Row className="text-footer">
              <Typography.Text>
                Giữ tay của bạn vào vị trí kiểm tra
              </Typography.Text>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHealthTracking;
