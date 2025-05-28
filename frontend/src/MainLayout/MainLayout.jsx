import Navbar from "../components/NavBar/Navbar.jsx";
import Home from "../Page/Home/Home.jsx";
import Dashboard from "../Page/Admin/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import TourList from "../Page/Admin/tour/TourList.jsx";
import TourDetail from "@/Page/Admin/tour/TourDetail.jsx";
import TourCreate from "@/Page/Admin/tour/TourCreate.jsx";
import Register from "@/Page/Home/Register.jsx";
import UserList from "@/Page/Admin/user/UserList.jsx";
import AllTour from "@/Page/Home/AllTours.jsx";
import Booking from "@/Page/Booking/Booking.jsx";
import MyBooking from "@/Page/Booking/MyBooking.jsx";
import Login from "@/Page/Home/Login.jsx";
import axios from "axios";
import Payment from "@/Page/Payment/Payment.jsx";
import BookingList from "@/Page/Admin/user/BookingList.jsx";

const MainLayout = () => {

    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return (
        <BrowserRouter>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home/tour" element={<AllTour/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />


                <Route path="/admin/Dashboard" element={<Dashboard/>} />
                <Route path="/admin/tours" element={<TourList />} />
                <Route path="/admin/tours/create" element={<TourCreate />} />
                <Route path="/admin/tours/:id" element={<TourDetail />} />
                <Route path="/admin/booking/:userId" element={<BookingList />} />
                <Route path="/admin/users" element={<UserList />} />

                <Route path="/booking/:tourId" element={<Booking />} />
                <Route path="/my-bookings" element={<MyBooking />} />


                <Route path="/payment/:bookingId" element={<Payment />} />


                {/*<Route path="/admin/users" element={<UserList />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default MainLayout;