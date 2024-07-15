import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return ( 
        <>
        <p> Bạn không có quyền truy cập trang này</p>
        <br />
        <a 
            href="/"
            // onClick={() => navigate('/')}
        >Quay lại trang chủ</a>
        </>

     );
}
 
export default ErrorPage;