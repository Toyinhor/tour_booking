// src/Page/User/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button.jsx";

const Home = () => {
    const [tours, setTours] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestTours = async () => {
            try {
                const response = await axios.get('http://localhost:8080/tours/latest');
                setTours(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách tour mới nhất:', error);
            }
        };

        fetchLatestTours();
    }, []);

    return (
        <div className="p-4">
            {/* Banner với slogan */}
            <div className="relative w-full mb-8">
                <img
                    src="/images/banner.jpg"
                    alt="Banner"
                    className="w-full object-contain rounded-lg shadow"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl md:text-4xl font-bold text-center px-4 ">
                        Hành trình khám phá – Trải nghiệm để trưởng thành!
                    </h1>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Các Tour Mới Nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tours.map((tour) => (
                    <div key={tour.id} className="border rounded-lg shadow p-4">
                        <img
                            src={tour.imageUrl}
                            alt={tour.title}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="text-lg font-semibold mt-2">{tour.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tour.description}</p>
                        <p className="mt-2 font-bold text-green-600">
                            {tour.price?.toLocaleString()} VND
                        </p>
                        <Button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate(`/booking/${tour.id}`)}>
                            Xem chi tiết
                        </Button>
                    </div>
                ))}
            </div>

            {/* Nút xem thêm */}
            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate('/home/tour')}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded"
                >
                    Xem thêm các tour
                </button>
            </div>
        </div>
    );
};

export default Home;
