// src/Page/User/Booking.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCurrentUserId, isLogin } from '@/utils/Auth.js';


// ... (imports như cũ)

const Booking = () => {
    const { tourId } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const userId = getCurrentUserId();
    const isUserLoggedIn = isLogin();
    const [formData, setFormData] = useState({
        userId: userId,
        scheduleId: '',
        numPeople: 1,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/tours/${tourId}`)
            .then(res => setTour(res.data))
            .catch(err => console.error('Lỗi tour:', err));

        axios.get(`http://localhost:8080/tour-schedules/tour/${tourId}`)
            .then(res => setSchedules(res.data))
            .catch(err => console.error('Lỗi schedules:', err));
    }, [tourId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedSchedule = schedules.find(s => s.id === Number(formData.scheduleId));

        if (!formData.scheduleId) {
            setError('Vui lòng chọn lịch trình');
            return;
        }

        if (!selectedSchedule || selectedSchedule.availableSlots === 0) {
            setError('Lịch trình đã hết chỗ. Vui lòng chọn lịch khác.');
            return;
        }

        if (formData.numPeople < 1) {
            setError('Số người phải lớn hơn 0');
            return;
        }

        const totalPrice = tour.price * formData.numPeople;

        const payload = {
            id: null,
            userId: formData.userId,
            scheduleId: Number(formData.scheduleId),
            numPeople: Number(formData.numPeople),
            totalPrice,
            bookingDate: new Date().toISOString(),
            status: 'PENDING'
        };

        console.log('payload:', payload);

        try {
            await axios.post('http://localhost:8080/bookings/create', payload);
            navigate('/my-bookings');
        } catch (err) {
            console.error('Đặt tour thất bại:', err);
            setError('Không thể tạo đặt chỗ.');
        }
    };

    if (!tour) return <p>Đang tải thông tin tour...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Đặt tour: {tour.title}</h1>
            {tour.imageUrl && (
                <img
                    src={tour.imageUrl}
                    alt={tour.title}
                    className="w-full h-64 object-cover rounded-lg mb-6 shadow"
                />
            )}
            <Card>
                <CardContent className="space-y-4">
                    <p><strong>Địa điểm:</strong> {tour.location}</p>
                    <p><strong>Giá mỗi người:</strong> {tour.price.toLocaleString()} VND</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Chọn lịch trình</label>
                            <select
                                name="scheduleId"
                                value={formData.scheduleId}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                                required
                            >
                                <option value="">-- Chọn --</option>
                                {schedules.map(s => (
                                    <option
                                        key={s.id}
                                        value={s.id}
                                        disabled={s.availableSlots === 0}
                                    >
                                        {s.startDate} đến {s.endDate} ({s.availableSlots === 0 ? "Hết chỗ" : `còn ${s.availableSlots} chỗ`})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Số người"
                            name="numPeople"
                            type="number"
                            min={1}
                            value={formData.numPeople}
                            onChange={handleChange}
                            required
                        />

                        <p><strong>Tổng giá:</strong> {tour.price * formData.numPeople} VND</p>

                        {error && <p className="text-red-500">{error}</p>}
                        {isUserLoggedIn === true  && (
                            <Button type="submit">Xác nhận đặt tour</Button>
                        )}
                        {isUserLoggedIn === undefined && (
                            <p className="text-red-500">Vui lòng đăng nhập để đặt tour.</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Booking;

