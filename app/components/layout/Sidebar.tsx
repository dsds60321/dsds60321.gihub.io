// app/components/layout/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    submenu?: MenuItem[];
}

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const menuItems: MenuItem[] = [
        {
            title: '홈',
            path: '/',
            icon: '🏠',
        },
        {
            title: '블로그',
            path: '/blog',
            icon: '📝',
            submenu: [
                {
                    title: 'JavaScript',
                    path: '/blog/javascript',
                    submenu: [
                        { title: 'React', path: '/blog/javascript/react' },
                        { title: 'TypeScript', path: '/blog/javascript/typescript' },
                    ],
                },
                {
                    title: 'Backend',
                    path: '/blog/backend',
                    submenu: [
                        { title: 'Node.js', path: '/blog/backend/nodejs' },
                        { title: 'Java', path: '/blog/backend/java' },
                    ],
                },
            ],
        },
        {
            title: '포트폴리오',
            path: '/portfolio',
            icon: '💼',
        },
        {
            title: '소개',
            path: '/about',
            icon: '👋',
        },
    ];

    const toggleSubmenu = (title: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        setExpanded(prev => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const renderMenuItem = (item: MenuItem, depth = 0) => {
        const isActive = pathname === item.path;
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isExpanded = expanded[item.title] || false;

        return (
            <div key={item.path} className="w-full">
                <div
                    className={`
            flex items-center justify-between w-full px-4 py-3 text-sm
            ${isActive
                        ? 'bg-blue-500 text-white dark:bg-blue-700'
                        : 'text-gray-700 dark:text-dark-primary hover:bg-gray-200 dark:hover:bg-dark-secondary'
                    } 
            transition-colors duration-150 ease-in-out cursor-pointer
            ${depth > 0 ? `pl-${depth * 4 + 4}` : ''}
          `}
                    onClick={(e) => {
                        if (hasSubmenu) {
                            toggleSubmenu(item.title, e);
                        }
                    }}
                >
                    <div className="flex items-center w-full">
                        {!hasSubmenu ? (
                            <Link href={item.path} className="flex items-center w-full">
                                {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        ) : (
                            <>
                                {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                                <span className="font-medium">{item.title}</span>
                            </>
                        )}
                    </div>
                    {hasSubmenu && (
                        <span className="transform transition-transform duration-200">
              {isExpanded ? '▼' : '▶'}
            </span>
                    )}
                </div>

                {hasSubmenu && isExpanded && (
                    <div className="pl-4">
                        {item.submenu!.map(subItem => renderMenuItem(subItem, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <nav className="h-full py-4 overflow-y-auto dark:text-dark-primary">
            <div className="mb-6 px-4">
                <h1 className="text-xl font-bold">개발 블로그</h1>
            </div>
            <div className="space-y-1">
                {menuItems.map(item => renderMenuItem(item))}
            </div>
        </nav>
    );
};

export default Sidebar;