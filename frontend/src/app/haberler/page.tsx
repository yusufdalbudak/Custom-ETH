'use client';

import React, { useEffect, useState } from 'react';

export default function Haberler() {
    const [rssNews, setRssNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Cointelegraph RSS yedeği (görselin altında gösterilecek)
    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            const res = await fetch('/api/ethereum-news');
            const data = await res.json();
            const rssNews = Array.isArray(data.news) ? data.news : [];
            setRssNews(rssNews);
            setLoading(false);
        }
        fetchNews();
    }, []);

    return (
        <div style={{ background: '#181a20', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'Inter, sans-serif' }}>
            <main style={{ maxWidth: 700, margin: '2rem auto', background: '#23272f', borderRadius: 20, boxShadow: '0 4px 32px #0004', padding: 40, marginTop: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <img src="/eth-logo.svg" alt="Ethereum Logo" style={{ height: 36, width: 36, verticalAlign: 'middle', filter: 'drop-shadow(0 2px 8px #627eea88)' }} />
                    <h1 style={{ color: '#627eea', fontSize: '2.2rem', fontWeight: 800, letterSpacing: 1, margin: 0 }}>Ethereum News</h1>
                </div>
                <a href="/" style={{ display: 'inline-block', margin: '0 0 18px 0', background: '#627eea', color: '#fff', padding: '10px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 17, letterSpacing: 1, boxShadow: '0 2px 8px #627eea33', border: 'none', transition: 'background 0.2s, color 0.2s, box-shadow 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#23272f'; e.currentTarget.style.color = '#627eea'; e.currentTarget.style.boxShadow = '0 4px 16px #627eea55'; }} onMouseOut={e => { e.currentTarget.style.background = '#627eea'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 2px 8px #627eea33'; }}>Back to Home</a>
                <h2 style={{ color: '#627eea', fontSize: '1.1rem', margin: '24px 0 18px' }}>Latest Ethereum News from Cointelegraph</h2>
                {loading ? (
                    <div style={{ color: '#aaa', fontSize: 18, textAlign: 'center', margin: '32px 0' }}>Loading news...</div>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {rssNews.length === 0 ? (
                            <li>No news found.</li>
                        ) : (
                            rssNews.map((item, idx) => (
                                <li key={idx} style={{ background: '#181a20', borderRadius: 12, boxShadow: '0 2px 12px #0002', marginBottom: 18, padding: '18px 20px' }}>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontWeight: 600, fontSize: 17, textDecoration: 'none', letterSpacing: 0.2 }}>{item.title}</a>
                                    {item.published && <div style={{ color: '#aaa', fontSize: 15, marginTop: 6 }}>{item.published}</div>}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </main>
            <footer style={{ textAlign: 'center', padding: 24, color: '#aaa', fontSize: 15 }}>
                © {new Date().getFullYear()} Ethereum Only Platform
            </footer>
        </div>
    );
} 