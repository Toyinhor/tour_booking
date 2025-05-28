
# 🌍 Tour Booking System
# Demo video here: https://youtu.be/jtZR8hnjwBw

A full-stack web application for booking tours, including:
- **Backend:** Spring Boot + JWT Authentication
- **Frontend:** ReactJS (Vite + Tailwind CSS)
- **Payment Integration:** MoMo e-Wallet

---

## 🖼️ UI Overview

- Im mainly doing on backend so front end is kinda 80% vibe code xD
- Simple and responsive interface
- Separate UI for Users and Admins
- Clean and organized layout

---

## 🚀 Key Features

### 👥 User
- Register / Login
- View tour list and details
- Book a tour (select schedule, number of people)
- Manage personal bookings
- Pay via MoMo e-wallet

### 🛠️ Admin
- Manage tours (CRUD)
- Manage tour schedules
- Manage users (edit roles, delete users)
- View and update bookings

---


## 🧱 Project Structure

### 🔹 Backend (Spring Boot)
```
src/
 └── main/java/com/example/tour
     ├── controller/
     ├── entity/
     ├── repository/
     ├── service/
     ├── security/ (JWT)
     └── config/
```

### 🔹 Frontend (React + Vite)
```
src/
 ├── Page/
 │    ├── User/
 │    ├── Admin/
 ├── components/
 ├── utils/
 │    └── auth.js
 └── App.jsx / main.jsx
```

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Token is stored in `localStorage`
- Role-based access: `USER` or `ADMIN`

---

## 💰 MoMo Payment Integration

- Using **MoMo Sandbox**:
  - [https://test-payment.momo.vn](https://test-payment.momo.vn)
- Payment process:
  1. Backend sends a request to `/api/momo/create-payment` and receives a `payUrl`
  2. Frontend redirects user to MoMo's payment page
  3. MoMo sends IPN callback to backend → update payment status

See full flow at: `docs/momo-flow.md`

---

## 🔧 Installation & Running

### ✅ Requirements:
- Node.js + npm
- Java 17+
- MySQL / PostgreSQL
- MoMo Developer Account (Sandbox)

---

### ▶️ Run Backend
```bash
cd backend
mvn spring-boot:run
```

Configure database and MoMo in:
```properties
src/main/resources/application.properties
```

---

### ▶️ Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Main APIs

### Booking
- `POST /bookings/create`
- `GET /bookings/user/{userId}`
- `POST /bookings/update-status/{id}`
- `DELETE /bookings/delete/{id}`

### Tour
- `GET /tours`
- `GET /tours/{id}`

### Schedule
- `GET /tour-schedules/tour/{tourId}`

### Payment
- `GET /payments/{bookingId}`
- `POST /payments/purchase/{paymentId}`
- `POST /momo/create-payment`


