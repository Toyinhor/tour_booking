import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCurrentUserRole} from "@/utils/Auth.js";

const Payment = () => {
    const userRole = getCurrentUserRole();
    const { bookingId } = useParams();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const fetchPayment = () => {
        axios.get(`http://localhost:8080/payments/${bookingId}`)
            .then(res => {
                setPayment(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Lỗi khi lấy thông tin thanh toán:', err);
                setError('Không thể tải thông tin thanh toán.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPayment();
    }, [bookingId]);

    const handlePayment = async () => {
        if (!payment) return;

        try {
            // Gọi API cập nhật thanh toán
            await axios.put(`http://localhost:8080/payments/purchase/${payment.id}`);

            // Gọi API cập nhật trạng thái booking
            await axios.put(`http://localhost:8080/bookings/update-status/${payment.bookingId}`);

            setSuccessMsg('Thanh toán thành công!');
            fetchPayment(); // refresh lại thông tin thanh toán
        } catch (err) {
            console.error('Lỗi khi thanh toán:', err);
            setError('Thanh toán thất bại.');
        }
    };

    if (loading) return <p>Đang tải thông tin thanh toán...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!payment) return <p>Không có thông tin thanh toán.</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Thông tin thanh toán</h1>

            {successMsg && <p className="text-green-600 font-semibold mb-4">{successMsg}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <Card>
                <CardContent className="space-y-3">
                    <p><strong>Mã thanh toán:</strong> {payment.id}</p>
                    <p><strong>Mã booking:</strong> {payment.bookingId}</p>
                    <p><strong>Số tiền:</strong> {payment.amount.toLocaleString()} VND</p>
                    <p><strong>Phương thức:</strong> {payment.method}</p>
                    <p><strong>Trạng thái:</strong> {payment.status}</p>
                    <p><strong>Ngày thanh toán:</strong> {new Date(payment.paymentDate).toLocaleString()}</p>

                    {payment.status !== 'PURCHASED' && userRole === 'USER' && (
                        <Button onClick={handlePayment}>
                            Tiến hành thanh toán
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Payment;
