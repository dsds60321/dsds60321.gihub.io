// app/layout.tsx
import './globals.css';
import React from 'react';
import {Inter} from 'next/font/google';
import {ThemeProvider} from './context/ThemeContext';
import ScrollToTop from './components/ui/ScrollToTop';
import {baseMetadata} from "@/app/lib/metadata"; // 추가

const inter = Inter({ subsets: ['latin'] });
export const metadata = baseMetadata;

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider>
            {children}
            <ScrollToTop /> {/* 여기에 추가 */}
        </ThemeProvider>
        </body>
        </html>
    );
}