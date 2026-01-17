import { useLocation, Link } from "react-router-dom";

export default function PageHeader() {
    const location = useLocation();

    return (
        <div style={{ marginBottom: 24 }}>
            {location.pathname !== "/" && (
                <Link
                    to="/dashboard"
                    style={{ fontSize: 14, textDecoration: "none", color: "#555" }}
                >
                    ← Back
                </Link>
            )}

            <h2 style={{ marginTop: 8 }}></h2>
        </div>
    );
}
