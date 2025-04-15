// app/layout.tsx
import './globals.css';
import React from 'react';
import {Inter} from 'next/font/google';
import {ThemeProvider} from './context/ThemeContext';
import ScrollToTop from './components/ui/ScrollToTop';
import {baseMetadata} from "@/app/lib/metadata";
import {Metadata} from "next";

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = baseMetadata;

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider>
            {children}
            <ScrollToTop />
        </ThemeProvider>
        </body>
        </html>
    );
}