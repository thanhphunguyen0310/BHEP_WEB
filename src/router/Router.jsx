import Homepage from '../pages/Homepage';
import Category from '../pages/Category';
import Community from './../pages/Community';
import Store from '../pages/Store';
import Doctor from '../pages/Doctor';
import HealthRecord from "../pages/customer/HealthRecord";
import DoctorChat from "../pages/doctor/Chat";
import DoctorChatLayout from "../components/Layout/DoctorLayout/Chat_Component";
import Workspace from '../pages/doctor/Workspace';
import ListAppointment from './../pages/doctor/ListAppointment';
import AppointmentHistory_Doctor from '../pages/doctor/AppointmentHistory_Doctor';
import AppointmentHistory from "../pages/customer/AppointmentHistory";
import AllDoctor from "../pages/AllDoctor";
import DoctorDetail from "../components/DoctorDetail";
import ProductDetail from "../components/ProductDetail";
import DoctorSchedule from "../components/Doctor/DoctorSchedule";
import BookingAppointment from '../pages/customer/BookingAppointment';
import AppointmentPayment from '../components/Customer/AppointmentPayment';

export const  publicRoutes = [
    {path: "/", component: Homepage},
    {path: "/category", component: Category},
    {path: "/store", component: Store},
    {path: "/product-detail/:id", component: ProductDetail },
    {path: "/doctor", component: Doctor },
    {path: "/all-doctor", component: AllDoctor },
    {path: "/doctor-detail/:id", component: DoctorDetail },
    {path: "/community", component: Community },
    {path: "/booking-appointment", component: BookingAppointment},
    {path: "/booking-payment", component: AppointmentPayment},
]

export const  customerRoutes = [
    {path: "/health-records", component: HealthRecord},
    {path: "/history-appointment", component: AppointmentHistory},
    
]

export const  doctorRoutes = [
    {path: "/doctor-chat", component: DoctorChat, layout: DoctorChatLayout},
    {path: "/workspace", component: Workspace},
    {path: "/create-schedule", component: DoctorSchedule},
    {path: "/list-appointment", component: ListAppointment},
    {path: "/doctor-history-appointment", component: AppointmentHistory_Doctor},
]

export const  adminRoutes = [
    // {path: "/manage-application", component: , layout: null},
    // {path: "/manage-appointment", component: , layout: null},
    // {path: "/manage-user", component: , layout: null},
    
]