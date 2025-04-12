// data/navigation/menuItems.ts
import { MenuItem } from '@/app/types/blog';

export const menuItems: MenuItem[] = [
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
                title: 'Language',
                path: '/blog/lang',
                submenu: [
                    { title: 'Java', path: '/blog/lang/java' }
                ],
            },
            {
                title: 'MQ',
                path: '/blog/kafka',
                submenu: [
                    { title: 'kafka', path: '/blog/kafka' }
                ],
            }
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

export default menuItems;