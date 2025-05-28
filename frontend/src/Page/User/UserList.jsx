// src/Page/Admin/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1); // Hardcode vì API chưa hỗ trợ pagination chuẩn

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/page/${page}`);
                setUsers(response.data); // Dữ liệu là mảng user
                setTotalPages(1); // Hardcode tạm thời
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
            }
        };

        fetchUsers();
    }, [page]);

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
            <table className="min-w-full border border-black">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Tên đăng nhập</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                {/* Các nút hành động (tạm thời placeholder) */}
                                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2">
                                    Sửa
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center py-4">Không có người dùng nào.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Trước
                </button>
                <span>Trang {page + 1} / {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Tiếp
                </button>
            </div>
        </div>
    );
};

export default UserList;
