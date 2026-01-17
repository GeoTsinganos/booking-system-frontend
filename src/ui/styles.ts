import type React from "react";

export const container: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
    padding: 16,
    display: "grid",
    gap: 14,
};

export const card: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
};

export const label: React.CSSProperties = {
    display: "grid",
    gap: 6,
    fontSize: 13,
    color: "#374151",
};

export const input: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
};

export const select: React.CSSProperties = {
    ...input,
    background: "#fff",
};

export const button: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
};

export const primaryButton: React.CSSProperties = {
    ...button,
    background: "#111827",
    color: "#fff",
    border: "1px solid #111827",
};

export const dangerButton: React.CSSProperties = {
    ...button,
    background: "#fff",
    border: "1px solid #fecaca",
    color: "#991b1b",
};

export const mutedText: React.CSSProperties = {
    color: "#6b7280",
    fontSize: 13,
};

export const divider: React.CSSProperties = {
    height: 1,
    background: "#eef2f7",
    border: 0,
    margin: "10px 0",
};
