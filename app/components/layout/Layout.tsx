// app/components/layout/Layout.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ScrollToTop from '../ui/ScrollToTop';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-dark-secondary transition-colors duration-200">
            {/* 모바일 오버레이 */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* 사이드바 - 모바일에서는 z-30으로 오버레이 위에 표시 */}
            <div
                className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-dark-primary shadow-lg transform 
          lg:relative lg:translate-x-0 lg:shadow-md transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <Sidebar />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex flex-col flex-1">
                <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>

            {/* 스크롤 탑 버튼 - 전체 레이아웃 바깥에 배치 */}
            <ScrollToTop />
        </div>
    );
};

export default Layout;