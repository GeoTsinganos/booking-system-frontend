import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import PrivateLayout from "../components/PrivateLayout";
import PageHeader from "../components/PageHeader";
import {CalendarDays, Clock, Briefcase, Tag, Ban,} from "lucide-react";
import { formatDateDMY } from "../utils/date";

interface Service {
    id: number;
    name: string;
}

type Status = "PENDING" | "CONFIRMED" | "CANCELLED";

interface Booking {
    id: number;
    service: number;
    availability: number;
    status: Status;
    notes: string;
    date: string; // "YYYY-MM-DD"
    start_time: string; // "HH:MM:SS"
    end_time: string; // "HH:MM:SS"
}

const statusStyle = (status: Status): React.CSSProperties => {
    if (status === "PENDING")
        return {
            background: "#fff3cd",
            border: "1px solid #ffe69c",
            color: "#664d03",
        };
    if (status === "CONFIRMED")
        return {
            background: "#d1e7dd",
            border: "1px solid #a3cfbb",
            color: "#0f5132",
        };
    return {
        background: "#f8f9fa",
        border: "1px solid #e9ecef",
        color: "#495057",
    };
};

export default function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;

        Promise.all([api.get("bookings/"), api.get("services/")])
            .then(([bRes, sRes]) => {
                if (!alive) return;
                setBookings(bRes.data);
                setServices(sRes.data);
            })
            .catch((err) => {
                console.error(err);
                if (!alive) return;
                alert("Unauthorized");
            })
            .finally(() => {
                if (!alive) return;
                setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, []);

    const serviceMap = useMemo(() => {
        const m = new Map<number, string>();
        services.forEach((s) => m.set(s.id, s.name));
        return m;
    }, [services]);

    const getServiceName = (serviceId: number) =>
        serviceMap.get(serviceId) ?? `Service #${serviceId}`;

    const canCancelBooking = (booking: Booking) => {
        // booking.date: "YYYY-MM-DD"
        // booking.start_time: "HH:MM:SS"
        const [y, m, d] = booking.date.split("-").map(Number);
        const [hh, mm] = booking.start_time.split(":").map(Number);

        // Local datetime (όχι UTC)
        const bookingDt = new Date(y, m - 1, d, hh, mm, 0, 0);
        return bookingDt > new Date();
    };

    const handleCancel = async (id: number) => {
        if (!window.confirm("Cancel this booking?")) return;

        try {
            const res = await api.post<Booking>(`bookings/${id}/cancel/`);
            const updated: Booking = res.data;

            setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
        } catch (err) {
            console.error(err);
            alert("Cancel failed.");
        }
    };

    return (
        <div>
            <PageHeader />
            <PrivateLayout
                title="My Bookings"
                subtitle="View your bookings and cancel upcoming ones."
            >
                <div style={{ display: "grid", gap: 12 }}>
                    {loading ? (
                        <div style={{ padding: 12, color: "#6b7280", fontSize: 14 }}>
                            Loading bookings...
                        </div>
                    ) : bookings.length === 0 ? (
                        <div style={{ padding: 12, color: "#6b7280", fontSize: 14 }}>
                            No bookings yet.
                        </div>
                    ) : (
                        bookings.map((b) => {
                            const cancelAllowed = b.status !== "CANCELLED" && canCancelBooking(b);

                            return (
                                <div
                                    key={b.id}
                                    style={{
                                        padding: 14,
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 14,
                                        background: "#fff",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                        display: "grid",
                                        gap: 10,
                                    }}
                                >
                                    {/* Header row */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 10,
                                        }}
                                    >
                                        <div style={{ fontWeight: 800, color: "#111827" }}>
                                            Booking
                                        </div>

                                        <span
                                            style={{
                                                ...statusStyle(b.status),
                                                padding: "4px 10px",
                                                borderRadius: 999,
                                                fontSize: 12,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 6,
                                                whiteSpace: "nowrap",
                                            }}>
                                          <Tag size={14} />{b.status}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gap: 8,
                                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                            color: "#374151",
                                            fontSize: 14,
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <Briefcase size={16} />
                                            <span style={{ fontWeight: 700 }}>Service:</span>
                                            <span>{getServiceName(b.service)}</span>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <CalendarDays size={16} />
                                            <span style={{ fontWeight: 700 }}>Date:</span>
                                            <span>{formatDateDMY(b.date)}</span>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <Clock size={16} />
                                            <span style={{ fontWeight: 700 }}>Time:</span>
                                            <span>
                                                {b.start_time?.slice(0, 5)} – {b.end_time?.slice(0, 5)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <button
                                            type="button"
                                            onClick={() => handleCancel(b.id)}
                                            disabled={!cancelAllowed}
                                            style={{
                                                padding: "10px 12px",
                                                borderRadius: 12,
                                                border: cancelAllowed ? "1px solid #fecaca" : "1px solid #e5e7eb",
                                                background: "#fff",
                                                color: cancelAllowed ? "#991b1b" : "#9ca3af",
                                                cursor: cancelAllowed ? "pointer" : "not-allowed",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 8,
                                                fontSize: 14,
                                            }}
                                            title={
                                                cancelAllowed
                                                    ? "Cancel booking"
                                                    : b.status === "CANCELLED"
                                                        ? "Already cancelled"
                                                        : "Past bookings cannot be cancelled"
                                            }
                                        >
                                            <Ban size={16} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </PrivateLayout>
        </div>
    );
}
