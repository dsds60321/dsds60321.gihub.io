// data/utils/blog.ts

export interface Author {
    name: string;
    avatar?: string;
    bio?: string;
}

export interface Tag {
    id: string;
    name: string;
    color?: string;
}

export interface MenuItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    submenu?: MenuItem[];
}

// types/blog.ts

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    content?: string;
    md?: string;
    excerpt: string;
    tags?: string[];
    author?: string;
    coverImage?: string;
}
