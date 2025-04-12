// app/components/layout/Header.tsx
'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface HeaderProps {
    toggleSidebar?: () => void;
    sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-dark-primary shadow-md p-4 flex items-center justify-between transition-colors duration-200">
            <div className="flex items-center">
                {toggleSidebar && (
                    <button
                        onClick={toggleSidebar}
                        className="mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-secondary focus:outline-none lg:hidden"
                    >
                        {sidebarOpen ? '✕' : '☰'}
                    </button>
                )}
                <h2 className="text-lg font-medium text-gray-800 dark:text-dark-primary">개발자 블로그</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none">
                    🔍
                </button>
                <button
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none">
                    👤
                </button>
            </div>
        </header>
    );
};

export default Header;