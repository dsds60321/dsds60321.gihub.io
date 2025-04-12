// app/layout.tsx
import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ui/ScrollToTop';
import {GLOBAL} from "@/app/constants"; // 추가

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: `${GLOBAL.NAME} 블로그`,
    description: '개발 지식과 경험을 공유하는 개인 블로그입니다.',
};

export default function RootLayout({
                                       children,
                                   }: {
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