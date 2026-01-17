import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import PrivateLayout from "../components/PrivateLayout";
import { CalendarDays, PlusCircle, ShieldCheck, ChevronRight } from "lucide-react";
import React from "react";

type ActionCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
};

function ActionCard({ title, description, icon, onClick }: ActionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                textAlign: "left",
                width: "100%",
                padding: 16,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid #eef2f7",
                        background: "#fafafa",
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                        {title}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 13, color: "#6b7280", lineHeight: 1.4 }}>
                        {description}
                    </div>
                </div>

                <div style={{ color: "#9ca3af", paddingTop: 6 }}>
                    <ChevronRight size={18} />
                </div>
            </div>
        </button>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const { isAdmin, user } = useAuth();

    return (
        <PrivateLayout
            title={user ? `Hello, ${user}.` : "Hello."}
            subtitle="Choose an action:"
        >
            <div style={{ display: "grid", gap: 14 }}>
                <div
                    style={{
                        display: "grid",
                        gap: 14,
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    }}
                >
                    <ActionCard
                        title="My Bookings"
                        description="View, manage, and cancel your upcoming bookings."
                        icon={<CalendarDays size={18} />}
                        onClick={() => navigate("/bookings")}
                    />

                    <ActionCard
                        title="Create Booking"
                        description="Pick a service, select a date, and book an available time slot."
                        icon={<PlusCircle size={18} />}
                        onClick={() => navigate("/create")}
                    />

                    {isAdmin && (
                        <ActionCard
                            title="Admin Bookings Management"
                            description="Review all bookings and confirm/cancel requests."
                            icon={<ShieldCheck size={18} />}
                            onClick={() => navigate("/admin/bookings")}
                        />
                    )}
                </div>

                <div style={{ marginTop: 10, color: "#9ca3af", fontSize: 12, textAlign: "center" }}>
                    Tip: If you get logged out, you will be redirected to the login page.
                </div>
            </div>
        </PrivateLayout>
    );
}
