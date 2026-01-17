import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateBooking from "./pages/CreateBooking";
import Navbar from "./components/Navbar";
import AdminBookings from "./pages/AdminBookings";
import AdminRoute from "./auth/AdminRoute";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./auth/AuthContext";

export default function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            {/* Navbar ΜΟΝΟ όταν είσαι logged in */}
            {user && <Navbar />}

            <Routes>
                {/* default */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* public */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* private */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreateBooking />
                        </ProtectedRoute>
                    }
                />

                {/* admin only */}
                <Route
                    path="/admin/bookings"
                    element={
                        <AdminRoute>
                            <AdminBookings />
                        </AdminRoute>
                    }
                />

                {/* fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}