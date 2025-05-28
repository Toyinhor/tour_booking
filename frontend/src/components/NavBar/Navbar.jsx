// src/components/NavBar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getToken, isAdmin } from "@/utils/auth";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = getToken();
    const user = getCurrentUser();
    const admin = isAdmin();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 mb-6 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">TourBooking website</h1>
            <div className="flex gap-4">
                <Link to="/">
                    <Button variant={isActive("/") ? "default" : "outline"}>
                        Trang chủ
                    </Button>
                </Link>

                {admin && (
                    <Link to="/admin/dashboard">
                        <Button variant={isActive("/admin/dashboard") ? "default" : "outline"}>
                            Dashboard
                        </Button>
                    </Link>
                )}

                {token && !admin && (
                    <Link to="/my-bookings">
                        <Button variant={isActive("/my-bookings") ? "default" : "outline"}>
                            Booking của tôi
                        </Button>
                    </Link>
                )}

                {!token && (
                    <>
                        <Link to="/login">
                            <Button variant={isActive("/login") ? "default" : "outline"}>
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant={isActive("/register") ? "default" : "outline"}>
                                Register
                            </Button>
                        </Link>
                    </>
                )}

                {token && (
                    <Button onClick={handleLogout} variant="destructive">
                        Logout
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
