// app/components/layout/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/app/types/blog';
import menuItems from '@data/navigation/menuItems';
import {GLOBAL} from "@/app/constants";

interface SidebarProps {
    closeMobileSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMobileSidebar }) => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
                        flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm
                        ${isActive
                        ? 'bg-blue-500 text-white dark:bg-blue-700'
                        : 'text-gray-700 dark:text-dark-primary hover:bg-gray-200 dark:hover:bg-dark-secondary'
                    } 
                        transition-colors duration-150 ease-in-out cursor-pointer
                        ${depth > 0 ? `pl-${depth * 3 + 3} sm:pl-${depth * 4 + 4}` : ''}
                    `}
                    onClick={(e) => {
                        if (hasSubmenu) {
                            toggleSubmenu(item.title, e);
                        } else if (closeMobileSidebar) {
                            closeMobileSidebar();
                        }
                    }}
                >
                    <div className="flex items-center w-full">
                        {!hasSubmenu ? (
                            <Link href={item.path} className="flex items-center w-full" onClick={closeMobileSidebar}>
                                {item.icon && <span className="mr-2 sm:mr-3 text-base sm:text-lg">{item.icon}</span>}
                                <span className="font-medium truncate">{item.title}</span>
                            </Link>
                        ) : (
                            <>
                                {item.icon && <span className="mr-2 sm:mr-3 text-base sm:text-lg">{item.icon}</span>}
                                <span className="font-medium truncate">{item.title}</span>
                            </>
                        )}
                    </div>
                    {hasSubmenu && (
                        <span className="transform transition-transform duration-200 text-xs">
                            {isExpanded ? '▼' : '▶'}
                        </span>
                    )}
                </div>

                {hasSubmenu && isExpanded && (
                    <div className="pl-3 sm:pl-4">
                        {item.submenu!.map(subItem => renderMenuItem(subItem, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className="w-64 bg-white dark:bg-dark-primary shadow-md h-screen overflow-y-auto">
            <div className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 truncate">{GLOBAL.NAME} 블로그</h2>
                <nav>
                    <div className="space-y-1">
                        {menuItems.map(item => renderMenuItem(item))}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;