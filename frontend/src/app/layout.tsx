import './globals.css';
import React from 'react';
import BlurredEthBackground from '../components/BlurredEthBackground';
import CurrencyTicker from '../components/CurrencyTicker';
import ThemeToggle from '../components/ThemeToggle';
import NewsTickerClient from '../components/NewsTickerClient';
// import ReactDOM from 'react-dom'; // kaldır

export const metadata = {
  title: 'Ethereum Only Platform',
  description: 'Ethereum Only Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#181a20', color: '#e5e5e5', minHeight: '100vh' }}>
        <BlurredEthBackground />
        <div style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#181a20', // solid, never changes
          borderRadius: 0,
          boxShadow: '0 4px 24px 0 rgba(98,126,234,0.08)',
          backdropFilter: 'blur(8px)',
          padding: '0 24px',
          minHeight: 56,
          borderBottom: '1px solid rgba(98,126,234,0.10)',
          userSelect: 'none',
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <CurrencyTicker section="currencies" />
          </div>
          <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CurrencyTicker section="exchanges" />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <ThemeToggle />
          </div>
        </div>
        {/* Live News Ticker Bar (Client Component) */}
        <NewsTickerClient />
        {/* Main Content */}
        <div style={{ minHeight: 'calc(100vh - 88px)' }}>{children}</div>
      </body>
    </html>
  );
}
