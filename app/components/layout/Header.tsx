// app/components/layout/Header.tsx
'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {GLOBAL} from "@/app/constants";
import Link from 'next/link';

interface HeaderProps {
    toggleSidebar?: () => void;
    sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-dark-primary shadow-md p-3 sm:p-4 flex items-center justify-between transition-colors duration-200">
            <div className="flex items-center">
                {toggleSidebar && (
                    <button
                        onClick={toggleSidebar}
                        className="mr-3 sm:mr-4 p-1.5 sm:p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-secondary focus:outline-none lg:hidden"
                        aria-label={sidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
                    >
                        {sidebarOpen ? '✕' : '☰'}
                    </button>
                )}
                <h2 className="text-base sm:text-lg font-medium text-gray-800 dark:text-dark-primary truncate">{GLOBAL.NAME} 블로그</h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none"
                    aria-label="검색"
                >
                    🔍
                </button>
                <button
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <Link
                    href="/about"
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none"
                    aria-label="내 정보"
                >
                    👤
                </Link>
            </div>
        </header>
    );
};

export default Header;