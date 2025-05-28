// src/Page/User/AllTour.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';



const ITEMS_PER_PAGE = 6;

const AllTour = () => {
    const navigate = useNavigate(); // Điều hướng khi tạo tour
    const [tours, setTours] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false);

    const fetchTours = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/tours/page/${page}`);
            const data = response.data;
            // API trả về 1 mảng các tour cho page
            setTours(data);
            // Nếu số phần tử bằng ITEMS_PER_PAGE, có thể có trang kế tiếp
            setHasMore(Array.isArray(data) && data.length === ITEMS_PER_PAGE);
            setError(null);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách tour:', err);
            setError('Không thể tải danh sách tour.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours(currentPage);
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (hasMore) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Tất cả các tour</h2>

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-col gap-4">
                {tours.map((tour) => (
                    <div key={tour.id} className="border rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
                        <img
                            src={tour.imageUrl}
                            alt={tour.title}
                            className="w-full md:w-64 h-48 object-cover rounded"
                        />
                        <div>
                            <h3 className="text-xl font-semibold">{tour.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{tour.description}</p>
                            <p className="mt-2 font-bold text-green-600">
                                {tour.price?.toLocaleString()} VND
                            </p>
                            <Button variant="outline" onClick={() => navigate(`/booking/${tour.id}`)}>
                                 Xem chi tiết
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Trang trước
                </button>
                <span className="self-center">Trang {currentPage + 1}</span>
                <button
                    onClick={handleNext}
                    disabled={!hasMore}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default AllTour;