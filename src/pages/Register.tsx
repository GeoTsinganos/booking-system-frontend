import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import {
    UserPlus,
    User as UserIcon,
    Mail,
    IdCard,
    Lock,
    Eye,
    EyeOff,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

type ApiErrorResponse = {
    username?: string[];
    password?: string[];
    email?: string[];
    detail?: string;
    non_field_errors?: string[];
};

const getErrorMessage = (err: unknown, fallback: string) => {
    if (axios.isAxiosError<ApiErrorResponse>(err)) {
        const data = err.response?.data;
        return (
            data?.username?.[0] ||
            data?.email?.[0] ||
            data?.password?.[0] ||
            data?.non_field_errors?.[0] ||
            data?.detail ||
            err.message ||
            fallback
        );
    }
    if (err instanceof Error) return err.message;
    return fallback;
};

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const passwordsMatch = useMemo(() => password.length > 0 && password === password2, [password, password2]);
    const canSubmit = useMemo(() => {
        return (
            !loading &&
            firstName.trim() &&
            lastName.trim() &&
            email.trim() &&
            username.trim() &&
            password.length >= 6 &&
            password2.length >= 6 &&
            passwordsMatch
        );
    }, [loading, firstName, lastName, email, username, password, password2, passwordsMatch]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");

        if (password !== password2) {
            setErrorMsg("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await api.post("auth/register/", {
                username: username.trim(),
                password,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email: email.trim(),
            });

            setSuccessMsg("Account created successfully. Redirecting to login...");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error(err);
            setErrorMsg(getErrorMessage(err, "Failed to register."));
        } finally {
            setLoading(false);
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
            <div style={{ width: "100%", maxWidth: 560 }}>
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
                            <UserPlus size={18} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontWeight: 900, fontSize: 20, color: "#111827" }}>
                                Create your account
                            </div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Sign up to book appointments
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
                    onSubmit={handleRegister}
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
                    {/* Name row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
                <IdCard size={16} /> First name
              </span>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="George"
                                required
                                style={{ padding: "11px 12px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none" }}
                            />
                        </label>

                        <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
                <IdCard size={16} /> Last name
              </span>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Papadopoulos"
                                required
                                style={{ padding: "11px 12px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none" }}
                            />
                        </label>
                    </div>

                    <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
              <Mail size={16} /> Email
            </span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="george@example.com"
                            autoComplete="email"
                            required
                            style={{ padding: "11px 12px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none" }}
                        />
                    </label>

                    <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
              <UserIcon size={16} /> Username
            </span>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. george"
                            autoComplete="username"
                            required
                            style={{ padding: "11px 12px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none" }}
                        />
                    </label>

                    <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
              <Lock size={16} /> Password
            </span>

                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <input
                                value={password}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                autoComplete="new-password"
                                required
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

                    <label style={{ display: "grid", gap: 6, fontSize: 13, color: "#374151" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
              <Lock size={16} /> Confirm password
            </span>

                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <input
                                value={password2}
                                type={showPassword2 ? "text" : "password"}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder="Repeat password"
                                autoComplete="new-password"
                                required
                                style={{
                                    flex: 1,
                                    padding: "11px 12px",
                                    borderRadius: 12,
                                    border: passwordsMatch || password2.length === 0 ? "1px solid #e5e7eb" : "1px solid #f1c7c7",
                                    outline: "none",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword2((v) => !v)}
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
                                title={showPassword2 ? "Hide password" : "Show password"}
                            >
                                {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
                                {showPassword2 ? "Hide" : "Show"}
                            </button>
                        </div>

                        {!passwordsMatch && password2.length > 0 && (
                            <div style={{ fontSize: 12, color: "#8a1f1f" }}>
                                Passwords do not match.
                            </div>
                        )}
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
                        <UserPlus size={18} />
                        {loading ? "Creating..." : "Create account"}
                    </button>

                    <div style={{ fontSize: 13, color: "#6b7280", textAlign: "center", marginTop: 6 }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#111827", fontWeight: 900 }}>
                            Login
                        </Link>
                    </div>
                </form>

                <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
                    Tip: Use a valid email — it must be unique.
                </div>
            </div>
        </div>
    );
}
