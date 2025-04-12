// data/navigation/utils.ts
import { MenuItem } from '@/app/types/blog';
import { menuItems } from './menuItems';

// 모든 경로를 평면 배열로 추출
export const getAllPaths = (): string[] => {
    const paths: string[] = [];

    const extractPaths = (items: MenuItem[]) => {
        items.forEach(item => {
            paths.push(item.path);

            if (item.submenu && item.submenu.length > 0) {
                extractPaths(item.submenu);
            }
        });
    };

    extractPaths(menuItems);
    return paths;
};

// 경로로 메뉴 아이템 찾기
export const findMenuItemByPath = (path: string): MenuItem | null => {
    let result: MenuItem | null = null;

    const findItem = (items: MenuItem[]) => {
        for (const item of items) {
            if (item.path === path) {
                result = item;
                return;
            }

            if (item.submenu && item.submenu.length > 0) {
                findItem(item.submenu);
                if (result) return;
            }
        }
    };

    findItem(menuItems);
    return result;
};

// 경로에 대한 계층 구조 가져오기 (breadcrumbs 용)
export const getBreadcrumbsForPath = (path: string): MenuItem[] => {
    const breadcrumbs: MenuItem[] = [];

    const findBreadcrumbs = (items: MenuItem[], currentPath: string, currentBreadcrumbs: MenuItem[] = []): boolean => {
        for (const item of items) {
            const newBreadcrumbs = [...currentBreadcrumbs, item];

            if (item.path === currentPath) {
                breadcrumbs.push(...newBreadcrumbs);
                return true;
            }

            if (item.submenu && item.submenu.length > 0) {
                if (findBreadcrumbs(item.submenu, currentPath, newBreadcrumbs)) {
                    return true;
                }
            }
        }

        return false;
    };

    findBreadcrumbs(menuItems, path, []);
    return breadcrumbs;
};