// app/components/layout/Layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ScrollToTop from '../ui/ScrollToTop';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 모바일 감지 함수
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // 초기 설정
        checkIfMobile();

        // 창 크기 변경 시 감지
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // 모바일에서 사이드바 열었을 때 스크롤 방지
    useEffect(() => {
        if (isMobile && sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobile, sidebarOpen]);

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
                <Sidebar closeMobileSidebar={() => setSidebarOpen(false)} />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex flex-col flex-1 w-full">
                <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 max-w-full">
                    {children}
                </main>
            </div>

            {/* 스크롤 탑 버튼 - 전체 레이아웃 바깥에 배치 */}
            <ScrollToTop />
        </div>
    );
};

export default Layout;