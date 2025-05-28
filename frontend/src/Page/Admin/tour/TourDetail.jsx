import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import TourSchedule from '@/Page/Admin/tour/TourSchedule.jsx';


const TourDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/tours/${id}`);
                setTour(res.data);
                setFormData(res.data); // Bao gồm id, createdAt, v.v.
            } catch (error) {
                console.error('Lỗi khi lấy tour:', error);
            }
        };

        fetchTour();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            console.log('formData trước khi gửi:', formData);
            await axios.put(`http://localhost:8080/tours/update`, {
                ...formData,
                id: Number(id),
                createdAt: tour.createdAt
            });
            setIsEditing(false);
            setTour({
                ...formData,
                id: Number(id),
                createdAt: tour.createdAt
            });
        } catch (error) {
            console.error('Cập nhật thất bại:', error);
        }
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/tours/delete/${id}`);
            navigate('/admin/tours');
        } catch (error) {
            console.error('Xoá thất bại:', error);
        }
    };

    if (!tour) return <p className="p-6">Đang tải thông tin tour...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Chi tiết Tour</h1>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Thông tin Tour bên trái */}
                <div className="flex-1">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            {isEditing ? (
                                <>
                                    <Input
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Tiêu đề"
                                    />
                                    <Input
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Mô tả"
                                    />
                                    <Input
                                        label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Địa điểm"
                                    />
                                    <Input
                                        label="Price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Giá"
                                    />
                                    <Input
                                        label="Duration (days)"
                                        name="durationDays"
                                        type="number"
                                        value={formData.durationDays}
                                        onChange={handleInputChange}
                                        placeholder="Số ngày"
                                    />
                                    <Input
                                        label="Image URL"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        placeholder="Link ảnh từ internet"
                                    />
                                    {formData.imageUrl && (
                                        <img
                                            src={formData.imageUrl}
                                            alt="Ảnh tour"
                                            className="w-full h-64 object-cover rounded-md"
                                        />
                                    )}
                                    <div className="flex gap-2">
                                        <Button onClick={handleUpdate}>Lưu</Button>
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>Huỷ</Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold">{tour.title}</h2>
                                    <p className="text-gray-600">{tour.description}</p>
                                    <p>Địa điểm: {tour.location}</p>
                                    <p>Giá: {tour.price.toLocaleString()} VND</p>
                                    <p>Thời gian: {tour.durationDays} ngày</p>
                                    <p>Ngày tạo: {new Date(tour.createdAt).toLocaleString()}</p>
                                    {tour.imageUrl && (
                                        <img
                                            src={tour.imageUrl}
                                            alt="Ảnh tour"
                                            className="w-full h-64 object-cover rounded-md mt-4"
                                        />
                                    )}
                                    <div className="flex gap-4 mt-4">
                                        <Button onClick={() => setIsEditing(true)}>Cập nhật</Button>
                                        <Button variant="destructive" onClick={handleDelete}>Xoá</Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* TourSchedule bên phải */}
                <div className="w-full lg:w-[400px]">
                    <TourSchedule tourId={id} />
                </div>
            </div>
        </div>
    );

};

export default TourDetail;
