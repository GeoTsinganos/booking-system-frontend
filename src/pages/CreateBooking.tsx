import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import axios from "axios";
import PrivateLayout from "../components/PrivateLayout";
import PageHeader from "../components/PageHeader";
import { CalendarDays, Briefcase, Clock, CheckCircle2, AlertTriangle, X } from "lucide-react";

interface Service {
    id: number;
    name: string;
}

interface Availability {
    id: number;
    date: string;       // "YYYY-MM-DD"
    start_time: string; // "HH:MM:SS"
    end_time: string;   // "HH:MM:SS"
}

export default function CreateBooking() {
    const [services, setServices] = useState<Service[]>([]);
    const [serviceId, setServiceId] = useState<number | "">("");
    const [successMsg, setSuccessMsg] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    });

    const [slots, setSlots] = useState<Availability[]>([]);
    const [availabilityId, setAvailabilityId] = useState<number | "">("");

    const [loadingServices, setLoadingServices] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // local YYYY-MM-DD (safe from timezone day shift)
    const dateISO = useMemo(() => {
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const dd = String(selectedDate.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, [selectedDate]);

    const minDate = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    useEffect(() => {
        setLoadingServices(true);
        api
            .get("services/")
            .then((res) => setServices(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoadingServices(false));
    }, []);

    // Auto-dismiss SUCCESS
    useEffect(() => {
        if (!successMsg) return;
        const t = setTimeout(() => setSuccessMsg(""), 3500);
        return () => clearTimeout(t);
    }, [successMsg]);

    // Auto-dismiss ERROR
    useEffect(() => {
        if (!errorMsg) return;
        const t = setTimeout(() => setErrorMsg(""), 5000);
        return () => clearTimeout(t);
    }, [errorMsg]);

    const fetchSeq = useRef(0);

    const fetchSlots = async (sid: number, dateStr: string) => {
        const seq = ++fetchSeq.current;
        setLoadingSlots(true);

        try {
            const res = await api.get(`services/${sid}/available-slots/`, {
                params: { date: dateStr },
            });

            if (seq !== fetchSeq.current) return; // ignore stale response
            setSlots(res.data);
        } catch (err) {
            console.error(err);
            if (seq === fetchSeq.current) setSlots([]);
        } finally {
            if (seq === fetchSeq.current) setLoadingSlots(false);
        }
    };

    useEffect(() => {
        setSlots([]);
        setAvailabilityId("");
        setSuccessMsg("");
        setErrorMsg("");

        if (!serviceId) return;
        fetchSlots(serviceId, dateISO);
    }, [serviceId, dateISO]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccessMsg("");
        setErrorMsg("");

        if (!serviceId || !availabilityId) {
            setErrorMsg("Please select service and time.");
            return;
        }

        setSubmitting(true);
        try {
            await api.post("bookings/", {
                service: serviceId,
                availability: availabilityId,
                notes: "",
            });

            setSuccessMsg("Booking created successfully.");
            await fetchSlots(serviceId, dateISO);
            setAvailabilityId("");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error(err);

            let message = "Could not create booking.";
            if (axios.isAxiosError(err)) {
                const data = err.response?.data as
                    | { non_field_errors?: string[]; detail?: string }
                    | undefined;

                message = data?.non_field_errors?.[0] || data?.detail || err.message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            setErrorMsg(message);
        } finally {
            setSubmitting(false);
        }
    };

    const canSubmit = Boolean(serviceId && availabilityId) && !submitting;

    const selectedSlot = slots.find((s) => s.id === availabilityId);

    const selectedLabel = selectedSlot
        ? `${selectedSlot.start_time.slice(0, 5)} - ${selectedSlot.end_time.slice(0, 5)}`
        : "";

    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const toMinutes = (hhmmss: string) => {
        const [hh, mm] = hhmmss.split(":").map(Number);
        return hh * 60 + mm;
    };

    const nowMinutes = () => {
        const n = new Date();
        return n.getHours() * 60 + n.getMinutes();
    };

    return (
        <div>
            <PageHeader />
            <PrivateLayout title="Create Booking" subtitle="Select service, date, and an available time slot.">
                <div style={{ maxWidth: 780, margin: "0 auto", padding: 16, display: "grid", gap: 14 }}>
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

                    {/* Card Form */}
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 16,
                            padding: 16,
                            background: "#fff",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                            display: "grid",
                            gap: 14,
                        }}
                    >
                        {/* Top row: Service + Date */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
                  <Briefcase size={16} /> Service
                </span>
                                <select
                                    value={serviceId}
                                    onChange={(e) => setServiceId(Number(e.target.value) || "")}
                                    disabled={loadingServices}
                                    style={{
                                        padding: "10px 12px",
                                        borderRadius: 12,
                                        border: "1px solid #e5e7eb",
                                        background: "#fff",
                                        fontSize: 14,
                                    }}
                                >
                                    <option value="">
                                        {loadingServices ? "Loading services..." : "Select service"}
                                    </option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
                  <CalendarDays size={16} /> Date
                </span>
                                <div
                                    style={{
                                        padding: "8px 10px",
                                        borderRadius: 12,
                                        border: "1px solid #e5e7eb",
                                        background: "#fff",
                                    }}
                                >
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(d: Date | null) => d && setSelectedDate(d)}
                                        dateFormat="dd-MM-yyyy"
                                        minDate={minDate}
                                    />
                                </div>
                            </label>
                        </div>

                        {/* Selected slot bar */}
                        {availabilityId && selectedSlot && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 10,
                                    padding: "10px 12px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 12,
                                    background: "#fafafa",
                                    fontSize: 13,
                                }}
                            >
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                    <Clock size={16} />
                                    <div>
                                        <strong>Selected:</strong> {selectedLabel}
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#6b7280" }}>
                  <span>
                    <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#fff", border: "1px solid #ccc", marginRight: 6 }} />
                    Available
                  </span>
                                    <span>
                    <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#111", marginRight: 6 }} />
                    Selected
                  </span>
                                    <span>
                    <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#f3f3f3", border: "1px solid #eee", marginRight: 6 }} />
                    Past
                  </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setAvailabilityId("")}
                                    style={{
                                        padding: "8px 10px",
                                        borderRadius: 12,
                                        border: "1px solid #e5e7eb",
                                        background: "#fff",
                                        cursor: "pointer",
                                        fontSize: 13,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    <X size={16} />
                                    Clear
                                </button>
                            </div>
                        )}

                        {/* Slots */}
                        <div style={{ display: "grid", gap: 8 }}>
                            <div style={{ fontSize: 13, color: "#374151", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8 }}>
                                <Clock size={16} />
                                Available time slots
                            </div>

                            {!serviceId ? (
                                <div style={{ fontSize: 13, color: "#6b7280" }}>Select service first.</div>
                            ) : loadingSlots ? (
                                <div style={{ fontSize: 13, color: "#6b7280" }}>Loading slots...</div>
                            ) : slots.length === 0 ? (
                                <div style={{ fontSize: 13, color: "#6b7280" }}>No available time slots for this day.</div>
                            ) : (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
                                    {slots.map((a) => {
                                        const label = `${a.start_time.slice(0, 5)} - ${a.end_time.slice(0, 5)}`;
                                        const selected = availabilityId === a.id;
                                        const today = new Date();
                                        const disabled = isSameDay(selectedDate, today) && toMinutes(a.start_time) <= nowMinutes();

                                        return (
                                            <button
                                                key={a.id}
                                                type="button"
                                                onClick={() => setAvailabilityId(a.id)}
                                                disabled={disabled}
                                                title={disabled ? "This time has already passed." : "Select this time slot"}
                                                style={{
                                                    padding: "10px 8px",
                                                    borderRadius: 12,
                                                    border: disabled ? "1px solid #eee" : "1px solid #e5e7eb",
                                                    background: disabled ? "#f3f3f3" : selected ? "#111827" : "#fff",
                                                    color: disabled ? "#6b7280" : selected ? "#fff" : "#111827",
                                                    cursor: disabled ? "not-allowed" : "pointer",
                                                    opacity: disabled ? 0.6 : 1,
                                                    transition: "transform 0.05s ease",
                                                }}
                                            >
                                                <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
                                                    {disabled && <div style={{ fontSize: 11, color: "#6b7280" }}>Past</div>}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Skeleton */}
                            {serviceId && loadingSlots && (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, marginTop: 6 }}>
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                height: 44,
                                                borderRadius: 12,
                                                border: "1px solid #eee",
                                                background: "#f3f3f3",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            style={{
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: "1px solid #111827",
                                background: canSubmit ? "#111827" : "#e5e7eb",
                                color: canSubmit ? "#fff" : "#6b7280",
                                cursor: canSubmit ? "pointer" : "not-allowed",
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            {submitting ? "Booking..." : "Book"}
                        </button>
                    </form>
                </div>
            </PrivateLayout>
        </div>
    );
}
