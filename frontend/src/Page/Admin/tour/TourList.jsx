import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const TourList = () => {
    const [allTours, setAllTours] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate(); // Điều hướng khi tạo tour

    const fetchAllTours = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/tours/all`);
            setAllTours(res.data);
        } catch (error) {
            console.error('Failed to fetch tours:', error);
        }
    };


    const deleteTour = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/tours/delete/${id}`);
            fetchAllTours();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    useEffect(() => {
        fetchAllTours();
    }, []);

    const totalPages = Math.ceil(allTours.length / ITEMS_PER_PAGE);
    const paginatedTours = [...allTours]
        .reverse()
        .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);


    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Danh sách Tour</h1>
                <Button
                    className="flex gap-2"
                    onClick={() => navigate('/admin/tours/create')}
                >
                    <Plus className="w-4 h-4" />
                    Tạo Tour mới
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTours.map(tour => (
                    <Card key={tour.id}>
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold">{tour.title}</h2>
                            <p className="text-gray-600 text-sm mb-2">{tour.description}</p>
                            <p className="text-sm">Địa điểm: {tour.location}</p>
                            <p className="text-sm">Giá: {tour.price.toLocaleString()} VND</p>
                            <p className="text-sm">Thời gian: {tour.durationDays} ngày</p>
                            <div className="mt-4 flex gap-2">
                                <Button variant="outline" onClick={() => navigate(`/admin/tours/${tour.id}`)}>
                                    <Pencil className="w-4 h-4 mr-2" /> Chi tiết
                                </Button>
                                <Button variant="destructive" onClick={() => deleteTour(tour.id)}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Xoá
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

            </div>

            <div className="flex justify-center mt-8 gap-4">
                <Button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Trang trước
                </Button>
                <span className="self-center text-sm">
                    Trang {currentPage + 1} / {totalPages}
                </span>
                <Button
                    disabled={currentPage + 1 >= totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Trang sau
                </Button>
            </div>
        </div>
    );
};

export default TourList;
