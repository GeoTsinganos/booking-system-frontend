# Booking System – Frontend

Frontend application for the **Booking System**, built with **React** + **TypeScript**, communicating with a Django REST API backend. 

It provides a complete user interface for **users** and **administrators**, with role-based navigation and polished UX.

This project focuses on:
- clean UI & layout,
- real-world booking flows,
- role-based access,
- and secure session handling.

---

## 🚀 Live Deployment (Railway)

- **Live App:** https://booking-system-frontend-production.up.railway.app
- **Backend API:** https://booking-system.up.railway.app
- **Swagger (API Docs):** https://booking-system.up.railway.app/swagger/

The frontend is deployed on Railway and served as a production build.

---

## ✨ Features

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
4. [ ] ├── assets/
5. [ ] │   └── react.svg
6. [ ] ├── auth/
7. [ ] │   ├── AdminRoute.tsx
8. [ ] │   ├── ProtectedRoute.tsx
9. [ ] │   └── AuthContext.tsx
10. [ ] ├── components/
11. [ ] │   ├── PrivateLayout.tsx
12. [ ] │   ├── PageHeader.tsx
13. [ ] │   └── Navbar.tsx
14. [ ] ├── pages/
15. [ ] │   ├── Login.tsx
16. [ ] │   ├── Register.tsx
17. [ ] │   ├── Dashboard.tsx
18. [ ] │   ├── CreateBooking.tsx
19. [ ] │   ├── MyBookings.tsx
20. [ ] │   └── AdminBookings.tsx
21. [ ] ├── ui/
22. [ ] │   └── styles.ts
23. [ ] ├── utils/
24. [ ] │   └── date.ts
25. [ ] ├── App.tsx
26. [ ] ├── Index.css
27. [ ] └── main.tsx
---

## 🔐 Security & Access Control
- Protected routes for authenticated users
- Admin-only routes guarded on the frontend
- Automatic redirect to `/login` when:
- - user logs out
- - session expires
- - backend returns HTTP 401

---

## 🔗 Backend API Integration

The frontend communicates with the backend via a configurable base URL.

### Environment Variable

    VITE_API_BASE_URL=https://booking-system.up.railway.app

This value is injected at build time and must be set correctly for production.
___

## ⚙️ Setup Instructions (Local Development)

1. Clone the repository
2. Install dependencies:

       npm install
3. Create a `.env` file:

       VITE_API_BASE_URL=http://127.0.0.1:8000

4. Start development server:

       npm run dev

5. Open in browser:

        http://localhost:5173

⚠️️ The backend API must be running and properly configured (CORS, base URL).

---

## 🏗️ Build for Production

    npm run build

The production-ready files will be generated in the `dist/` directory.

To preview the production build locally:

    npm run preview

---

## 🛠️ Railway Notes
- The frontend is built using npm run build
- The production build is served using a static server
- Environment variables must be defined before build
- A redeploy is required after changing `VITE_API_BASE_URL`

---


## 🎓 Author
This frontend was developed as part of a complete **full-stack booking system**, demonstrating:
- real-world React architecture
- authentication & role-based routing
- clean UI/UX practices
- production-ready frontend logic
- production deployment

---


