import { Button, InputNumber } from "antd";
import { useState } from "react";
import { addCoin } from "../../configs/api/addCoinApi";
import { useSelector } from "react-redux";

const AddCoin = () => {
    const [coinInput, setCoinInput] = useState(50000);
    const userId = useSelector((state) => state.auth?.user?.data?.user?.id);
    const handleAddCoin = async () =>{
        const napTien = await addCoin(userId, coinInput);
        const paymentUrl = napTien?.paymentUrl;
        // window.location.replace(paymentUrl);
        console.log(napTien.data)
        return napTien.data
    }
    return ( 
        <>
            <InputNumber onChange={(e) =>
                setCoinInput(e)}/>
            <Button onClick={handleAddCoin}>Xác nhận</Button>
        </>
     );
}
 
export default AddCoin;