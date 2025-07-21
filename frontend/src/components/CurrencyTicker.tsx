"use client";
import React, { useEffect, useState } from "react";

const PAIRS = [
    { key: "usdtry", label: "USD/TRY", api: "frankfurter" },
    { key: "eurtry", label: "EUR/TRY", api: "frankfurter" },
    { key: "ethusd", label: "ETH/USD", api: "coingecko" },
    { key: "btcusd", label: "BTC/USD", api: "coingecko" },
];

// Major stock exchanges info
const EXCHANGES = [
    {
        name: "NYSE",
        city: "New York",
        tz: "America/New_York",
        open: [14, 30], // 09:30 NY time (14:30 TR summer)
        close: [21, 0], // 16:00 NY time (23:00 TR summer)
        abbr: "🇺🇸 NYSE",
    },
    {
        name: "NASDAQ",
        city: "New York",
        tz: "America/New_York",
        open: [14, 30],
        close: [21, 0],
        abbr: "🇺🇸 NASDAQ",
    },
    {
        name: "Shanghai",
        city: "Shanghai",
        tz: "Asia/Shanghai",
        open: [3, 30], // 09:30 Shanghai time (03:30 TR)
        close: [9, 0], // 15:00 Shanghai time (09:00 TR)
        abbr: "🇨🇳 SHG",
    },
    {
        name: "London",
        city: "London",
        tz: "Europe/London",
        open: [8, 0], // 08:00 London time (10:00 TR)
        close: [16, 30], // 16:30 London time (18:30 TR)
        abbr: "🇬🇧 LSE",
    },
    {
        name: "BIST",
        city: "Istanbul",
        tz: "Europe/Istanbul",
        open: [10, 0],
        close: [18, 0],
        abbr: "🇹🇷 BIST",
    },
];

function getExchangeStatus(exchange, now) {
    // now: Date object in exchange's local time
    const open = new Date(now);
    open.setHours(exchange.open[0], exchange.open[1], 0, 0);
    const close = new Date(now);
    close.setHours(exchange.close[0], exchange.close[1], 0, 0);
    return now >= open && now < close;
}

function getLocalTime(tz) {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: tz })
    );
}

export default function CurrencyTicker({ section }: { section?: "currencies" | "exchanges" }) {
    const [rates, setRates] = useState({
        usdtry: { price: "...", change: 0 },
        eurtry: { price: "...", change: 0 },
        ethusd: { price: "...", change: 0 },
        btcusd: { price: "...", change: 0 },
        error: false,
    });
    const [exStatus, setExStatus] = useState(
        EXCHANGES.map((ex) => ({ open: false, time: "--:--" }))
    );

    // Fetch rates
    useEffect(() => {
        let prev = {};
        const fetchRates = async () => {
            try {
                // Frankfurter for fiat
                const fiatRes = await fetch(
                    "https://api.frankfurter.app/latest?from=USD&to=TRY,EUR"
                ).then((r) => r.json());
                if (!fiatRes || !fiatRes.rates) throw new Error("Frankfurter yanıtı beklenen formatta değil");
                const usdtry = fiatRes.rates.TRY;
                const eurtry = fiatRes.rates.TRY / fiatRes.rates.EUR;
                // CoinGecko for crypto
                const cgRes = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd"
                ).then((r) => r.json());
                if (!cgRes.ethereum || !cgRes.bitcoin) throw new Error("CoinGecko yanıtı beklenen formatta değil");
                setRates((old) => ({
                    usdtry: {
                        price: usdtry.toFixed(2),
                        change: prev.usdtry ? usdtry - prev.usdtry : 0,
                    },
                    eurtry: {
                        price: eurtry.toFixed(2),
                        change: prev.eurtry ? eurtry - prev.eurtry : 0,
                    },
                    ethusd: {
                        price: cgRes.ethereum.usd.toFixed(2),
                        change: prev.ethusd ? cgRes.ethereum.usd - prev.ethusd : 0,
                    },
                    btcusd: {
                        price: cgRes.bitcoin.usd.toFixed(2),
                        change: prev.btcusd ? cgRes.bitcoin.usd - prev.btcusd : 0,
                    },
                    error: false,
                }));
                prev = {
                    usdtry,
                    eurtry,
                    ethusd: cgRes.ethereum.usd,
                    btcusd: cgRes.bitcoin.usd,
                };
            } catch (e) {
                setRates((old) => ({ ...old, error: true }));
            }
        };
        fetchRates();
        const intv = setInterval(fetchRates, 60000);
        return () => clearInterval(intv);
    }, []);

    // Update exchange status every minute
    useEffect(() => {
        const updateStatus = () => {
            setExStatus(
                EXCHANGES.map((ex) => {
                    const now = getLocalTime(ex.tz);
                    const open = getExchangeStatus(ex, now);
                    const time = now
                        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                    return { open, time };
                })
            );
        };
        updateStatus();
        const intv = setInterval(updateStatus, 60000);
        return () => clearInterval(intv);
    }, []);

    // Theme detection for color
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        const updateTheme = () => {
            const t = document.documentElement.getAttribute('data-theme');
            setTheme(t === 'light' ? 'light' : 'dark');
        };
        updateTheme();
        window.addEventListener('storage', updateTheme);
        const obs = new MutationObserver(updateTheme);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => {
            window.removeEventListener('storage', updateTheme);
            obs.disconnect();
        };
    }, []);
    if (!mounted) return null;

    // Render only currencies (left), only exchanges (center), or both (default/legacy)
    if (section === "currencies") {
        return (
            <div style={{ display: "flex", gap: 18 }}>
                {PAIRS.map((pair) => {
                    const val = rates[pair.key];
                    let color = "#aaa";
                    if (val && val.change > 0.01) color = "#00e676";
                    else if (val && val.change < -0.01) color = "#ff5252";
                    return (
                        <div key={pair.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 70 }}>
                            <span style={{ fontSize: 13, color: "#b2b2b2", fontWeight: 400 }}>{pair.label}</span>
                            <span style={{ color, fontWeight: 600, fontSize: 17 }}>{val ? val.price : "..."}</span>
                        </div>
                    );
                })}
                {rates.error && (
                    <span style={{ color: "#ff5252", marginLeft: 16, fontSize: 13 }}>
                        Döviz verileri alınamadı.
                    </span>
                )}
            </div>
        );
    }
    if (section === "exchanges") {
        return (
            <div style={{ display: "flex", gap: 14 }}>
                {EXCHANGES.map((ex, i) => (
                    <div key={ex.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 54 }}>
                        <span style={{ fontSize: 13, color: theme === 'light' ? '#23272f' : '#b2b2b2', fontWeight: 400 }}>{ex.abbr}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 8,
                                    height: 8,
                                    borderRadius: 8,
                                    background: exStatus[i]?.open ? "#00e676" : "#ff5252",
                                    marginRight: 4,
                                }}
                            />
                            <span style={{ fontWeight: 600, fontSize: 15, color: theme === 'light' ? '#23272f' : '#e5e5e5' }}>{exStatus[i]?.time}</span>
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    // Default: both (legacy, not used in new layout)
    return null;
} 