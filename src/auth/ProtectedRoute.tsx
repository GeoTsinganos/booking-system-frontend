import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type {JSX} from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element; }){
    const { user } = useAuth();
    const token = localStorage.getItem("access");

    if (!user && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
