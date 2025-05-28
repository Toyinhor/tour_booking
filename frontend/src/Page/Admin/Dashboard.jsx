import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Users } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Quản lý Tour",
            description: "Thêm, sửa, xoá tour du lịch.",
            path: "/admin/tours",
            icon: <Plane className="w-10 h-10 text-blue-600" />,
        },
        {
            title: "Quản lý User",
            description: "Xem và chỉnh sửa thông tin người dùng.",
            path: "/admin/users",
            icon: <Users className="w-10 h-10 text-green-600" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(section.path)}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:bg-blue-50 cursor-pointer transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gray-100 rounded-full">{section.icon}</div>
                            <h2 className="text-xl font-semibold text-gray-700">
                                {section.title}
                            </h2>
                        </div>
                        <p className="text-gray-600">{section.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
