import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  Input  from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Gửi yêu cầu login
            const res = await axios.post('http://localhost:8080/users/login', formData);
            const token = res.data.token;

            // Lưu token và username vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', formData.email);

            // Gọi API lấy thông tin người dùng hiện tại
            const userRes = await axios.get(`http://localhost:8080/users/current-user/${formData.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('currentUser', JSON.stringify(userRes.data));

            // Chuyển hướng sang trang chính
            navigate('/');
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError('Sai tài khoản hoặc mật khẩu');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Tên đăng nhập"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit">Đăng nhập</Button>
            </form>
        </div>
    );
};

export default Login;
