import Homepage from '../pages/Homepage';
import Category from '../pages/Category';
import Community from './../pages/Community';
import Store from '../pages/Store';
import Doctor from '../pages/Doctor';
import HealthRecord from "../pages/customer/HealthRecord";
import DoctorChat from "../pages/doctor/Chat";
import DoctorChatLayout from "../components/Layout/DoctorLayout/Chat_Component";
import Workspace from './../pages/doctor/Workspage';
import ListAppointment from './../pages/doctor/ListAppointment';
import AppointmentHistory_Doctor from '../pages/doctor/AppointmentHistory_Doctor';
import AppointmentHistory from "../pages/customer/AppointmentHistory";
import AllDoctor from "../pages/AllDoctor";
import DoctorDetail from "../components/DoctorDetail";
import ProductDetail from "../components/ProductDetail";

export const  publicRoutes = [
    {path: "/", component: Homepage},
    {path: "/category", component: Category},
    {path: "/store", component: Store},
    {path: "/product-detail/:id", component: ProductDetail },
    // { 
    //     path: "/doctor", 
    //     component: Doctor,
    //     children: [
    //       { path: "doctor-detail/:id", component: DoctorDetail, layout: DefaultLayout },
    //     ]
    //   },
    {path: "/doctor", component: Doctor },
    {path: "/all-doctor", component: AllDoctor },
    {path: "/doctor-detail/:id", component: DoctorDetail },
    {path: "/community", component: Community },
]

export const  customerRoutes = [
    {path: "/health-records", component: HealthRecord},
    {path: "/history-appointment", component: AppointmentHistory},
]

export const  doctorRoutes = [
    {path: "/doctor-chat", component: DoctorChat, layout: DoctorChatLayout},
    {path: "/workspace", component: Workspace},
    {path: "/list-appointment", component: ListAppointment},
    {path: "/doctor-history-appointment", component: AppointmentHistory_Doctor},
]

export const  adminRoutes = [
    // {path: "/manage-application", component: , layout: null},
    // {path: "/manage-appointment", component: , layout: null},
    // {path: "/manage-user", component: , layout: null},
    
]