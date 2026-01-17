import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import type {JSX} from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const { user, isAdmin, loading } = useAuth();

    if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/bookings" replace />;

    return children;
}
