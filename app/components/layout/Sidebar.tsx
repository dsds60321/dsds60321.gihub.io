// app/components/layout/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/app/types/blog';
import menuItems from '@data/navigation/menuItems';

const Sidebar: React.FC = () => {
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
        <aside className="w-64 bg-white dark:bg-dark-primary shadow-md h-screen overflow-y-auto">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">내 블로그</h2>
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