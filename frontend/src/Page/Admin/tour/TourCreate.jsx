import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';

const TourCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        durationDays: '',
        imageUrl: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gửi dữ liệu tạo tour mới lên backend
            await axios.post('http://localhost:8080/tours/create', {
                ...formData,
                price: Number(formData.price),
                durationDays: Number(formData.durationDays),
            });

            // Sau khi tạo thành công, điều hướng về trang danh sách tours
            navigate('/admin/tours');
        } catch (error) {
            console.error('Tạo tour thất bại:', error);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Tạo mới Tour</h1>
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Tiêu đề"
                            required
                        />
                        <Input
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Mô tả"
                            required
                        />
                        <Input
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Địa điểm"
                            required
                        />
                        <Input
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Giá"
                            required
                            min={0}
                        />
                        <Input
                            label="Duration (days)"
                            name="durationDays"
                            type="number"
                            value={formData.durationDays}
                            onChange={handleInputChange}
                            placeholder="Số ngày"
                            required
                            min={1}
                        />
                        <Input
                            label="Image URL"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Đường dẫn ảnh"
                        />

                        <div className="mt-6">
                            <Button type="submit">Tạo mới</Button>
                            <Button
                                variant="outline"
                                className="ml-4"
                                onClick={() => navigate('/admin/tours')}
                                type="button"
                            >
                                Huỷ
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default TourCreate;
