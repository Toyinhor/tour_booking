import { useState } from "react";
import axios from "axios";
import  Input  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER", // mặc định là USER, có thể để dropdown nếu cần
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const payload = {
                ...formData,
                id: null,
                createdAt: new Date().toISOString(),
            };

            await axios.post("http://localhost:8080/users/register", payload);
            alert("Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            console.error("Lỗi đăng ký:", err);
            setError("Đăng ký thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Tên đăng nhập"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập tên đăng nhập"
                    required
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                />
                <Input
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    required
                />
                {/* Nếu bạn muốn cho chọn vai trò */}
                {/* <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select> */}
                <Button type="submit" className="w-full">Đăng ký</Button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
