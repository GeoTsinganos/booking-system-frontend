# Booking System – Frontend

Frontend application for the **Booking System**, built with **React** + **TypeScript**, communicating with a Django REST API backend. 

It provides a complete user interface for **users** and **administrators**, with role-based navigation and polished UX.

This project focuses on:
- clean UI & layout,
- real-world booking flows,
- role-based access,
- and secure session handling.

## 🚀 Features

### Authentication
- User login with username & password
- User registration (sign up) with:
- - Username
- - First name
- - Last name
- - Email
- JWT-based authentication (handled by backend)
- Automatic redirect to `/login` on logout or expired session
- Show / hide password functionality

---

### Dashboard
- Landing page after login
- Action cards:
- - **My Bookings**
- - **Create Booking**
- - **Admin Bookings** (admins only)
- Role-based visibility of actions

---

### Create Booking
- Select service
- Select date via calendar
- **Dynamic loading of available time slots**
- Grid-based slot layout (09:00–17:00)
- Automatic exclusion of:
- - pastime slots
- - already booked slots
- Slot selection preview
- Success & error feedback messages

---

### My Bookings
- View personal bookings
- Booking details:
- - Service
- - Date
- - Time
- - Status
- Status badges
- - 🟡 PENDING
- - 🟢 CONFIRMED
- - ⚪ CANCELLED
- Ability to cancel future bookings only

---

### Admin Bookings (Admin only)
- View **all bookings**
- Table includes:
- - Username
- - Service
- - Date
- - Time
- - Status
- Actions:
- - Confirm booking
- - Cancel booking
- Advanced filters:
- - Service
- - Status
- - Date
- - Username
- Responsive layout
- Polished admin UI with sticky table header

---

## 🎨 UI / UX Highlights
- Card-based layouts
- Icon-enhanced actions
- Auto-dismiss success & error messages
- Disabled states for unavailable actions
- Responsive design
- Consistent date format `dd-MM-yyyy`

---

## Tech Stack
- React
- TypeScript
- Vite
- Axios
- React Router
- React Datepicker
- JWT (via backend)
- CSS-in-JS (inline styling)

---

## 📂 Project Structure

1. [ ] src/
2. [ ] ├── api/
3. [ ] │   └── axios.ts
4. [ ] ├── auth/
5. [ ] │   └── AuthContext.tsx
6. [ ] ├── components/
7. [ ] │   ├── PrivateLayout.tsx
8. [ ] │   ├── PageHeader.tsx
9. [ ] │   └── ...
10. [ ] ├── pages/
11. [ ] │   ├── Login.tsx
12. [ ] │   ├── Register.tsx
13. [ ] │   ├── Dashboard.tsx
14. [ ] │   ├── CreateBooking.tsx
15. [ ] │   ├── MyBookings.tsx
16. [ ] │   └── AdminBookings.tsx
17. [ ] ├── routes/
18. [ ] │   ├── ProtectedRoute.tsx
19. [ ] │   └── AdminRoute.tsx
20. [ ] └── main.tsx
---

## 🔐 Security & Access Control
- Protected routes for authenticated users
- Admin-only routes guarded on the frontend
- Automatic redirect to `/login` when:
- - user logs out
- - session expires
- - backend returns HTTP 401

---

## ⚙️ Setup & Run
1. Clone the repository
2. Install dependencies:

       npm install
3. Start development server:

       npm run dev
4. Open in browser:

http://localhost:5173

⚠️️ The backend API must be running and properly configured (CORS, base URL).

---

## 🔗 Backend
This frontend connects to the **Booking System API** backend:
- Django REST Framework
- JWT authentication
- Swagger/OpenAPI documentation

---

## 🎓 Author
This frontend was developed as part of a complete **full-stack booking system**, demonstrating:
- real-world React architecture
- authentication & role-based routing
- clean UI/UX practices
- production-ready frontend logic

---


