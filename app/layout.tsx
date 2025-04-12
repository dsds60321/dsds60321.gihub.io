// app/layout.tsx
import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: '개발자 블로그',
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
        <ThemeProvider>{children}</ThemeProvider>
        </body>
        </html>
    );
}