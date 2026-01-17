import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import axios from "axios";
import PrivateLayout from "../components/PrivateLayout";
import PageHeader from "../components/PageHeader";
import {Search, RefreshCw, X, CheckCircle2, AlertTriangle, CalendarDays, Briefcase, Tag, User, Check, Ban, Settings2,} from "lucide-react";
import { formatDateDMY } from "../utils/date";

interface Service {
    id: number;
    name: string;
}

type Status = "PENDING" | "CONFIRMED" | "CANCELLED";

interface Booking {
    id: number;
    service: number;
    date: string | null;
    start_time: string | null;
    end_time: string | null;
    status: Status;
    username?: string;
}

interface ApiErrorResponse {
    detail?: string;
    non_field_errors?: string[];
}

const getErrorMessage = (err: unknown, fallback: string) => {
    if (axios.isAxiosError<ApiErrorResponse>(err)) {
        return (
            err.response?.data?.detail ||
            err.response?.data?.non_field_errors?.[0] ||
            err.message ||
            fallback
        );
    }
    if (err instanceof Error) return err.message;
    return fallback;
};

const statusStyle = (status: Status): React.CSSProperties => {
    if (status === "PENDING")
        return { background: "#fff3cd", border: "1px solid #ffe69c", color: "#664d03" };
    if (status === "CONFIRMED")
        return { background: "#d1e7dd", border: "1px solid #a3cfbb", color: "#0f5132" };
    return { background: "#f8f9fa", border: "1px solid #e9ecef", color: "#495057" };
};

const baseBtn: React.CSSProperties = {
    padding: "9px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
};

const primaryBtn: React.CSSProperties = {
    ...baseBtn,
    border: "1px solid #111827",
    background: "#111827",
    color: "#fff",
};

const ghostBtn: React.CSSProperties = {
    ...baseBtn,
    background: "#fff",
    color: "#111827",
};

const dangerBtn: React.CSSProperties = {
    ...baseBtn,
    border: "1px solid #fecaca",
    background: "#fff5f5",
    color: "#8a1f1f",
};

const disabledBtn: React.CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
};

export default function AdminBookings() {
    const [services, setServices] = useState<Service[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [serviceId, setServiceId] = useState<number | "">("");
    const [status, setStatus] = useState<Status | "">("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [username, setUsername] = useState<string>("");

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const dateISO = useMemo(() => {
        if (!selectedDate) return "";
        const d = new Date(selectedDate);
        d.setHours(0, 0, 0, 0);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${dd}`;
    }, [selectedDate]);

    const getServiceName = (id: number) => services.find((s) => s.id === id)?.name || `#${id}`;

    const fetchServices = async () => {
        const res = await api.get("services/");
        setServices(res.data);
    };

    const fetchBookings = async () => {
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const params: Record<string, string | number> = {};
            if (serviceId) params.service = serviceId;
            if (status) params.status = status;
            if (dateISO) params.date = dateISO;
            if (username.trim()) params.username = username.trim();

            const res = await api.get("bookings/", { params });
            setBookings(res.data);
        } catch (err) {
            console.error(err);
            setErrorMsg(getErrorMessage(err, "Could not load bookings."));
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices().catch(console.error);
    }, []);

    useEffect(() => {
        fetchBookings().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceId, status, dateISO, username]);

    const handleConfirm = async (id: number) => {
        setSuccessMsg("");
        setErrorMsg("");
        try {
            await api.post(`bookings/${id}/confirm/`);
            setSuccessMsg(`Booking #${id} confirmed.`);
            await fetchBookings();
        } catch (err) {
            console.error(err);
            setErrorMsg(getErrorMessage(err, "Could not confirm booking."));
        }
    };

    const handleCancel = async (id: number) => {
        setSuccessMsg("");
        setErrorMsg("");
        try {
            await api.post(`bookings/${id}/cancel/`);
            setSuccessMsg(`Booking #${id} cancelled.`);
            await fetchBookings();
        } catch (err) {
            console.error(err);
            setErrorMsg(getErrorMessage(err, "Could not cancel booking."));
        }
    };

    const clearFilters = () => {
        setServiceId("");
        setStatus("");
        setSelectedDate(null);
        setUsername("");
    };

    return (
        <div>
            <PageHeader />
            <PrivateLayout
                title="Admin Bookings Management"
                subtitle="Manage all bookings. Confirm or cancel requests."
            >
                <div style={{ maxWidth: 1080, padding: 16, margin: "0 auto", display: "grid", gap: 14 }}>
                    {/* Messages */}
                    {successMsg && (
                        <div
                            onClick={() => setSuccessMsg("")}
                            style={{
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: "1px solid #cfe9d6",
                                background: "#f3fbf6",
                                color: "#1f6f3a",
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                cursor: "pointer",
                            }}
                        >
                            <CheckCircle2 size={18} />
                            <div style={{ flex: 1 }}>{successMsg}</div>
                            <X size={16} />
                        </div>
                    )}

                    {errorMsg && (
                        <div
                            onClick={() => setErrorMsg("")}
                            style={{
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: "1px solid #f1c7c7",
                                background: "#fff5f5",
                                color: "#8a1f1f",
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                cursor: "pointer",
                            }}
                        >
                            <AlertTriangle size={18} />
                            <div style={{ flex: 1 }}>{errorMsg}</div>
                            <X size={16} />
                        </div>
                    )}

                    {/* Filters card */}
                    <div
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 16,
                            padding: 16,
                            background: "#fff",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                            display: "grid",
                            gap: 12,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Settings2 size={18} />
                            <div style={{ fontWeight: 800, color: "#111827" }}>Filters</div>
                            <div style={{ color: "#6b7280", fontSize: 13 }}>Refine results in real time.</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, alignItems: "end" }}>
                            <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
                              <Briefcase size={16} /> Service
                            </span>
                                <select
                                    value={serviceId}
                                    onChange={(e) => setServiceId(Number(e.target.value) || "")}
                                    style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }}
                                >
                                    <option value="">All</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
                              <Tag size={16} /> Status
                            </span>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus((e.target.value as Status) || "")}
                                    style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }}
                                >
                                    <option value="">All</option>
                                    <option value="PENDING">PENDING</option>
                                    <option value="CONFIRMED">CONFIRMED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
                            </label>

                            <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
                              <CalendarDays size={16} /> Date
                            </span>
                                <div style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid #e5e7eb", background: "#fff" }}>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(d: Date | null) => setSelectedDate(d)}
                                        dateFormat="dd-MM-yyyy"
                                        isClearable
                                        placeholderText="All dates"
                                        withPortal
                                    />
                                </div>
                            </label>

                            <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
                              <User size={16} /> Username
                            </span>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="e.g. george"
                                    style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }}
                                />
                            </label>

                            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    onClick={() => fetchBookings()}
                                    disabled={loading}
                                    style={{ ...primaryBtn, ...(loading ? disabledBtn : {}), flex: 1 }}
                                    title="Refresh results"
                                >
                                    <RefreshCw size={16} />
                                    {loading ? "Loading..." : "Refresh"}
                                </button>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    disabled={loading}
                                    style={{ ...ghostBtn, ...(loading ? disabledBtn : {}), flex: 1 }}
                                    title="Clear filters"
                                >
                                    <X size={16} />
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, overflowX: "auto", overflowY: "hidden", background: "#fff", width: "100%" }}>
                        {/* header */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "90px minmax(200px, 1.2fr) 140px 170px 150px 280px",
                                padding: "12px 14px",
                                background: "#fafafa",
                                fontWeight: 800,
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                borderBottom: "1px solid #eee",
                                minWidth: 980,
                            }}
                        >
                            <div>User</div>
                            <div>Service</div>
                            <div>Date</div>
                            <div>Time</div>
                            <div>Status</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Search size={16} /> Actions
                            </div>
                        </div>

                        {loading ? (
                            <div style={{ padding: 14, color: "#6b7280" }}>Loading...</div>
                        ) : bookings.length === 0 ? (
                            <div style={{ padding: 14, color: "#6b7280" }}>No bookings found.</div>
                        ) : (
                            bookings.map((b) => (
                                <div
                                    key={b.id}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "90px minmax(200px, 1.2fr) 140px 170px 150px 280px",
                                        padding: "12px 14px",
                                        borderTop: "1px solid #f0f0f0",
                                        alignItems: "center",
                                        minWidth: 980,
                                    }}
                                >
                                    <div style={{ fontWeight: 800 }}>
                                        {b.username ?? "—"}
                                    </div>
                                    <div>{getServiceName(b.service)}</div>
                                    <div>{formatDateDMY(b.date)}</div>
                                    <div>
                                        {(b.start_time ? b.start_time.slice(0, 5) : "--")} –{" "}
                                        {(b.end_time ? b.end_time.slice(0, 5) : "--")}
                                    </div>
                                    <div>
                                    <span style={{ ...statusStyle(b.status), padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
                                      {b.status}
                                    </span>
                                    </div>
                                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}>
                                        <button
                                            type="button"
                                            onClick={() => handleConfirm(b.id)}
                                            disabled={b.status !== "PENDING"}
                                            style={{
                                                ...baseBtn,
                                                border: "1px solid #a7f3d0",
                                                background: "#ecfdf5",
                                                color: "#065f46",
                                                ...(b.status !== "PENDING" ? disabledBtn : {}),
                                            }}
                                            title="Confirm booking"
                                        >
                                            <Check size={16} />
                                            Confirm
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleCancel(b.id)}
                                            disabled={b.status === "CANCELLED"}
                                            style={{
                                                ...dangerBtn,
                                                ...(b.status === "CANCELLED" ? disabledBtn : {}),
                                            }}
                                            title="Cancel booking"
                                        >
                                            <Ban size={16} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{ fontSize: 12, color: "#6b7280", display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                        <div>Results: <strong>{bookings.length}</strong></div>
                        <div>Tip: Click on the success/error banner to dismiss it.</div>
                    </div>
                </div>
            </PrivateLayout>
        </div>
    );
}
