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
                title: 'JavaScript',
                path: '/blog/javascript',
                submenu: [
                    { title: 'React', path: '/blog/javascript/react' },
                    { title: 'TypeScript', path: '/blog/javascript/typescript' },
                ],
            },
            {
                title: 'Kafka',
                path: '/blog/kafka',
                submenu: [
                    { title: 'kafka', path: '/blog/kafka' }
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

export default menuItems;