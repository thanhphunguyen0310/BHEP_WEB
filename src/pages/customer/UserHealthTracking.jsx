import { useSelector } from "react-redux";
import { get, ref } from "firebase/database";
import { database } from "../../configs/firebase/firebaseConfig";
import { useEffect, useState } from "react";

const userHealthTracking = () => {
    const [userHealth, setUserHealth] = useState();
    const userId = useSelector((state) => state.auth?.user?.data?.user?.id);
  
    useEffect(() => {
      const userHealthRef = ref(database, "Device1");
      get(userHealthRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserHealth(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    return (
      <div className="profile-container">
        <h2>Thông tin người dùng</h2>
        {userHealth ? (
          <div className="health-info">
            <p>HeartBeat: {userHealth.HeartBeat}</p>
            <p>SpO2: {userHealth.SpO2}</p>
            <p>Temperature: {userHealth.Temperature}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
 
export default userHealthTracking;