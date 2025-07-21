"use client";
import React, { useEffect, useState, useRef } from "react";

export default function NewsTickerClient() {
    const [titles, setTitles] = useState<string[]>([]);
    const tickerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        fetch("/api/ethereum-news")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.news) && data.news.length > 0) {
                    setTitles(data.news.map((item: any) => item.title));
                } else {
                    setTitles(["Failed to load news."]);
                }
            })
            .catch(() => setTitles(["Failed to load news."]));
    }, []);

    // Ölçüm: içerik genişliği
    useEffect(() => {
        if (tickerRef.current) {
            setContentWidth(tickerRef.current.scrollWidth);
        }
    }, [titles]);

    // Animasyon süresi: içerik uzunluğuna göre
    const duration = Math.max(20, contentWidth / 60); // px başına 60ms, min 20s

    return (
        <div style={{
            width: '100vw',
            background: '#20232a',
            color: '#fff',
            fontSize: 15,
            fontWeight: 400,
            letterSpacing: 0.2,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderBottom: '1px solid #23272f',
            minHeight: 32,
            display: 'flex',
            alignItems: 'center',
            zIndex: 1999,
            position: 'relative',
        }}>
            <span style={{ fontWeight: 600, marginRight: 16, marginLeft: 16 }}>
                Live News Feed:
            </span>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: 32 }}>
                <div
                    ref={tickerRef}
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        willChange: 'transform',
                        animation: `ticker-scroll ${duration}s linear infinite`,
                    }}
                >
                    {titles.join('   •   ')}
                </div>
            </div>
            <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
        </div>
    );
} 