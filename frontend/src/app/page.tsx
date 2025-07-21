'use client';

import React from 'react';
import Link from 'next/link';

const features = [
  { icon: '💸', title: 'Live ETH Price', desc: 'Real-time Ethereum price from CoinGecko.' },
  { icon: '📈', title: 'Pro Chart', desc: 'Advanced TradingView chart.' },
  { icon: '📰', title: 'ETH News', desc: 'Latest Ethereum news.' },
  { icon: '⚡', title: 'Fast & Secure', desc: 'Blazing fast, privacy-first.' },
  { icon: '📱', title: 'Mobile Friendly', desc: 'Works on any device.' },
  { icon: '🔓', title: 'Open Source', desc: 'MIT licensed, free for all.' },
];

export default function MainLanding() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'none', padding: '0 0 64px 0' }}>
      {/* Hero Section */}
      <section style={{ width: '100%', maxWidth: 900, margin: '64px auto 0', textAlign: 'center', position: 'relative' }}>
        <img src="/eth-logo.svg" alt="Ethereum Logo" style={{ width: 72, height: 72, margin: '0 auto 24px', filter: 'drop-shadow(0 2px 16px #627eea88)' }} />
        <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#fff', letterSpacing: 1, marginBottom: 12, textShadow: '0 2px 16px #627eea33' }}>Ethereum Only Platform</h1>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#627eea', marginBottom: 28, letterSpacing: 1 }}>The Ultimate ETH-Only Experience</h2>
        <p style={{ color: '#b5c6e0', fontSize: 22, maxWidth: 600, margin: '0 auto 38px', fontWeight: 500 }}>
          All-in-one Ethereum dashboard: live price, pro chart, and curated news. No distractions. No altcoins. Just pure ETH.
        </p>
        <Link href="/teknik-analiz" style={{
          background: 'linear-gradient(90deg,#627eea,#00ffcc)',
          color: '#fff',
          padding: '18px 48px',
          borderRadius: 14,
          fontWeight: 900,
          textDecoration: 'none',
          fontSize: 22,
          letterSpacing: 1,
          boxShadow: '0 4px 24px #627eea33',
          border: 'none',
          transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
          display: 'inline-block',
        }}>Get Started</Link>
      </section>
      {/* Features Section */}
      <section style={{ width: '100%', maxWidth: 1100, margin: '70px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 38, justifyContent: 'center', alignItems: 'stretch' }}>
        {features.map((f, i) => (
          <div key={f.title} style={{
            background: '#181a20',
            borderRadius: 20,
            boxShadow: '0 2px 16px #627eea18',
            padding: '38px 28px',
            minWidth: 200,
            maxWidth: 260,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '1.5px solid #23272f',
            fontSize: 18,
            fontWeight: 500,
            transition: 'box-shadow 0.2s, border 0.2s, transform 0.2s',
            cursor: 'pointer',
          }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 32px #627eea33'; e.currentTarget.style.border = '1.5px solid #627eea'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 16px #627eea18'; e.currentTarget.style.border = '1.5px solid #23272f'; e.currentTarget.style.transform = 'none'; }}
          >
            <span style={{ fontSize: 44, marginBottom: 16 }}>{f.icon}</span>
            <h3 style={{ color: '#00ffcc', fontWeight: 800, fontSize: 24, margin: '0 0 10px' }}>{f.title}</h3>
            <p style={{ color: '#b5c6e0', fontSize: 17, fontWeight: 500, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
