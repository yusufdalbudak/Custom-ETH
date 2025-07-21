'use client';

import React, { useEffect, useRef } from 'react';

export default function TeknikAnaliz() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;
        // TradingView widget scriptini ekle
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            // @ts-ignore
            if (window.TradingView) {
                // @ts-ignore
                new window.TradingView.widget({
                    autosize: true,
                    symbol: 'COINBASE:ETHUSD',
                    interval: '60',
                    timezone: 'Etc/UTC',
                    theme: 'dark',
                    style: '1',
                    locale: 'tr',
                    toolbar_bg: '#181a20',
                    enable_publishing: false,
                    hide_top_toolbar: false,
                    hide_legend: false,
                    container_id: container.current.id,
                });
            }
        };
        container.current.appendChild(script);
        return () => {
            if (container.current) container.current.innerHTML = '';
        };
    }, []);

    return (
        <main style={{ maxWidth: 1000, margin: '2rem auto', background: '#23272f', borderRadius: 28, boxShadow: '0 4px 32px #0004', padding: 56, marginTop: 32 }}>
            <h1 style={{ color: '#627eea', fontSize: '2.7rem', marginBottom: 28, fontWeight: 800, letterSpacing: 1 }}>ETH/USD Live Graph</h1>
            <div style={{ marginBottom: 36 }}>
                <div ref={container} id="tv_chart_container" style={{ width: '100%', height: 600, background: '#181a20', borderRadius: 20, boxShadow: '0 2px 12px #0002', border: '1px solid #23272f' }} />
                <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0 0 0', gap: 18 }}>
                    <a href="/haberler" style={{ background: '#23272f', color: '#627eea', padding: '18px 44px', border: '2.5px solid #627eea', borderRadius: 12, fontWeight: 800, textDecoration: 'none', fontSize: 22, letterSpacing: 1, boxShadow: '0 2px 12px #627eea33', transition: 'background 0.2s, color 0.2s, box-shadow 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#627eea'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 4px 20px #627eea55'; }} onMouseOut={e => { e.currentTarget.style.background = '#23272f'; e.currentTarget.style.color = '#627eea'; e.currentTarget.style.boxShadow = '0 2px 12px #627eea33'; }}>Ethereum News</a>
                    <a href="/" style={{ background: '#23272f', color: '#627eea', padding: '18px 44px', border: '2.5px solid #627eea', borderRadius: 12, fontWeight: 800, textDecoration: 'none', fontSize: 22, letterSpacing: 1, boxShadow: '0 2px 12px #627eea33', transition: 'background 0.2s, color 0.2s, box-shadow 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#627eea'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 4px 20px #627eea55'; }} onMouseOut={e => { e.currentTarget.style.background = '#23272f'; e.currentTarget.style.color = '#627eea'; e.currentTarget.style.boxShadow = '0 2px 12px #627eea33'; }}>Home</a>
                </div>
            </div>
        </main>
    );
} 