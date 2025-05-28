import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';

const TourSchedule = ({ tourId }) => {
    const [schedules, setSchedules] = useState([]);
    const [newSchedule, setNewSchedule] = useState({ startDate: '', endDate: '', availableSlots: '' });
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({ startDate: '', endDate: '', availableSlots: '' });

    useEffect(() => {
        fetchSchedules();
    }, [tourId]);

    const fetchSchedules = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/tour-schedules/tour/${tourId}`);
            setSchedules(res.data);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách schedule:', err);
        }
    };

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        try {
            await axios.post('http://localhost:8080/tour-schedules/create', {
                ...newSchedule,
                tourId: Number(tourId),
                availableSlots: Number(newSchedule.availableSlots)
            });
            setNewSchedule({ startDate: '', endDate: '', availableSlots: '' });
            fetchSchedules();
        } catch (err) {
            console.error('Tạo lịch trình thất bại:', err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/tour-schedules/update`, {
                ...editingData,
                id: editingId,
                tourId: Number(tourId),
                availableSlots: Number(editingData.availableSlots)
            });
            setEditingId(null);
            fetchSchedules();
        } catch (err) {
            console.error('Cập nhật lịch trình thất bại:', err);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/tour-schedules/delete/${id}`);
            fetchSchedules();
        } catch (err) {
            console.error('Xoá lịch trình thất bại:', err);
        }
    };

    return (
        <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Lịch trình Tour</h2>

            <div className="space-y-2">
                <Input
                    label="Ngày bắt đầu"
                    name="startDate"
                    type="date"
                    value={newSchedule.startDate}
                    onChange={(e) => handleInputChange(e, setNewSchedule)}
                />
                <Input
                    label="Ngày kết thúc"
                    name="endDate"
                    type="date"
                    value={newSchedule.endDate}
                    onChange={(e) => handleInputChange(e, setNewSchedule)}
                />
                <Input
                    label="Số chỗ"
                    name="availableSlots"
                    type="number"
                    value={newSchedule.availableSlots}
                    onChange={(e) => handleInputChange(e, setNewSchedule)}
                />
                <Button onClick={handleCreate}>Thêm lịch trình</Button>
            </div>

            <ul className="space-y-2">
                {schedules.map(schedule => (
                    <li key={schedule.id} className="border p-3 rounded space-y-2">
                        {editingId === schedule.id ? (
                            <div className="space-y-2">
                                <Input
                                    label="Ngày bắt đầu"
                                    name="startDate"
                                    type="date"
                                    value={editingData.startDate}
                                    onChange={(e) => handleInputChange(e, setEditingData)}
                                />
                                <Input
                                    label="Ngày kết thúc"
                                    name="endDate"
                                    type="date"
                                    value={editingData.endDate}
                                    onChange={(e) => handleInputChange(e, setEditingData)}
                                />
                                <Input
                                    label="Số chỗ"
                                    name="availableSlots"
                                    type="number"
                                    value={editingData.availableSlots}
                                    onChange={(e) => handleInputChange(e, setEditingData)}
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleUpdate}>Lưu</Button>
                                    <Button variant="outline" onClick={() => setEditingId(null)}>Huỷ</Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Từ:</strong> {schedule.startDate} - <strong>đến:</strong> {schedule.endDate}</p>
                                <p><strong>Số chỗ:</strong> {schedule.availableSlots}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button onClick={() => {
                                        setEditingId(schedule.id);
                                        setEditingData({
                                            startDate: schedule.startDate,
                                            endDate: schedule.endDate,
                                            availableSlots: schedule.availableSlots
                                        });
                                    }}>Sửa</Button>
                                    <Button variant="destructive" onClick={() => handleDelete(schedule.id)}>Xoá</Button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourSchedule;
