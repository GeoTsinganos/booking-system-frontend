import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    LogIn,
    User as UserIcon,
    Lock,
    Eye,
    EyeOff,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

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

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const canSubmit = username.trim().length > 0 && password.length > 0 && !submitting;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!username.trim() || !password) {
            setErrorMsg("Please enter username and password.");
            return;
        }

        setSubmitting(true);
        try {
            await login(username.trim(), password);
            setSuccessMsg("Login successful. Redirecting...");
            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error(err);
            setErrorMsg(getErrorMessage(err, "Login failed."));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                padding: 16,
                background: "#f8fafc",
            }}
        >
            <div style={{ width: "100%", maxWidth: 520 }}>
                <div style={{ textAlign: "center", marginBottom: 14 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 14,
                                background: "#111827",
                                display: "grid",
                                placeItems: "center",
                                color: "#fff",
                            }}
                        >
                            <LogIn size={18} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontWeight: 900, fontSize: 20, color: "#111827" }}>
                                Welcome
                            </div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Login to manage your bookings
                            </div>
                        </div>
                    </div>
                </div>

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
                            marginBottom: 12,
                            cursor: "pointer",
                        }}
                    >
                        <CheckCircle2 size={18} />
                        <div style={{ flex: 1 }}>{successMsg}</div>
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
                            marginBottom: 12,
                            cursor: "pointer",
                        }}
                    >
                        <AlertTriangle size={18} />
                        <div style={{ flex: 1 }}>{errorMsg}</div>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 18,
                        padding: 18,
                        background: "#fff",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                        display: "grid",
                        gap: 12,
                    }}
                >
                    <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
              <UserIcon size={16} /> Username
            </span>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. george"
                            autoComplete="username"
                            style={{
                                padding: "11px 12px",
                                borderRadius: 12,
                                border: "1px solid #e5e7eb",
                                outline: "none",
                            }}
                        />
                    </label>

                    <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
              <Lock size={16} /> Password
            </span>

                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                autoComplete="current-password"
                                style={{
                                    flex: 1,
                                    padding: "11px 12px",
                                    borderRadius: 12,
                                    border: "1px solid #e5e7eb",
                                    outline: "none",
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 12,
                                    border: "1px solid #e5e7eb",
                                    background: "#fff",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontWeight: 800,
                                }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </label>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        style={{
                            marginTop: 4,
                            height: 44,
                            borderRadius: 14,
                            border: "1px solid #111827",
                            background: "#111827",
                            color: "#fff",
                            fontWeight: 900,
                            cursor: canSubmit ? "pointer" : "not-allowed",
                            opacity: canSubmit ? 1 : 0.6,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                        }}
                    >
                        <LogIn size={18} />
                        {submitting ? "Signing in..." : "Login"}
                    </button>

                    <div style={{ fontSize: 13, color: "#6b7280", textAlign: "center", marginTop: 6 }}>
                        Don’t have an account?{" "}
                        <Link to="/register" style={{ color: "#111827", fontWeight: 900 }}>
                            Sign up
                        </Link>
                    </div>
                </form>

                <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
                    Tip: Click on the red/green message banner to dismiss it.
                </div>
            </div>
        </div>
    );
}
