import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCurrentUserId } from '@/utils/Auth.js';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { userId } = useParams();


    const fetchBookings = () => {
        axios.get(`http://localhost:8080/bookings/user/${userId}`)
            .then(res => setBookings(res.data))
            .catch(err => {
                console.error('Lỗi khi lấy danh sách booking:', err);
                setError('Không thể tải danh sách đặt tour.');
            });
    };

    useEffect(() => {
        fetchBookings();
    }, [userId]);

    const handlePayment = (bookingId) => {
        navigate(`/payment/${bookingId}`);
    };

    const handleDelete = async (bookingId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn hủy booking này?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/bookings/delete/${bookingId}`);
            setBookings(prev => prev.filter(b => b.id !== bookingId));
        } catch (err) {
            console.error('Lỗi khi xóa booking:', err);
            alert('Xóa thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Tour đã đặt</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {bookings.length === 0 ? (
                <p>User này chưa có tour nào</p>
            ) : (
                bookings.map(booking => (
                    <Card key={booking.id} className="mb-4">
                        <CardContent className="space-y-2">
                            <p><strong>Mã booking:</strong> {booking.id}</p>
                            <p><strong>Số người:</strong> {booking.numPeople}</p>
                            <p><strong>Tổng giá:</strong> {booking.totalPrice.toLocaleString()} VND</p>
                            <p><strong>Ngày đặt:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                            <p><strong>Trạng thái:</strong> {booking.status}</p>
                            <div className="flex gap-2">
                                <Button onClick={() => handlePayment(booking.id)}>
                                    Xem chi tiết
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(booking.id)}>
                                    Xóa
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default MyBooking;
