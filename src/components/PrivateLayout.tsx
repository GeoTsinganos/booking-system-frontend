import type {ReactNode} from "react";

export default function PrivateLayout({title, subtitle, children,}: {
                title?: string; subtitle?: string; children: ReactNode; }){
    return (
        <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
            {(title || subtitle) && (
                <div style={{ marginBottom: 16 }}>
                    {title && (
                        <h2 style={{ margin: 0, fontSize: 26, letterSpacing: -0.2 }}>
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <div style={{ marginTop: 6, fontSize: 14, color: "#6b7280" }}>
                            {subtitle}
                        </div>
                    )}
                </div>
            )}

            <div
                style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 16,
                    padding: 16,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                }}
            >
                {children}
            </div>
        </div>
    );
}
