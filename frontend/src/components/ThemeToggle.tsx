"use client";
import React, { useEffect, useState } from "react";

const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
};

export default function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        // Only update body background and color, do not touch top bar
        document.body.style.background = theme === "dark" ? "#181a20" : "#fff";
        document.body.style.color = theme === "dark" ? "#e5e5e5" : "#23272f";
        // Do NOT update any other global styles
    }, [theme]);

    if (!mounted) return null;

    return (
        <button
            aria-label={theme === "dark" ? "Açık tema" : "Karanlık tema"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
                background: "rgba(98,126,234,0.10)",
                border: "none",
                borderRadius: 999,
                padding: 8,
                marginRight: 8,
                cursor: "pointer",
                fontSize: 22,
                color: theme === "dark" ? "#ffe066" : "#23272f",
                boxShadow: "0 2px 8px #627eea22",
                transition: "background 0.2s, color 0.2s",
                outline: "none",
                position: "relative",
                top: 2,
            }}
        >
            {theme === "dark" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffe066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
        </button>
    );
} 