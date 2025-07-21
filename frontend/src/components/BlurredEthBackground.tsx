"use client";
import React, { useEffect, useRef } from 'react';

// Subtle animated gradient background for modern look
export default function BlurredEthBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let t = 0;
        function draw() {
            // Soft animated radial gradient
            ctx.clearRect(0, 0, width, height);
            const grad = ctx.createRadialGradient(
                width / 2 + Math.sin(t / 200) * 80,
                height / 2 + Math.cos(t / 180) * 60,
                80 + Math.sin(t / 150) * 30,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.7
            );
            grad.addColorStop(0, 'rgba(98,126,234,0.22)'); // #627eea
            grad.addColorStop(0.4, 'rgba(0,255,204,0.10)'); // #00ffcc
            grad.addColorStop(1, 'rgba(24,26,32,0.95)'); // BG
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            t += 1;
        }

        let animationId: number;
        function animate() {
            draw();
            animationId = requestAnimationFrame(animate);
        }
        animate();

        function handleResize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
    );
} 