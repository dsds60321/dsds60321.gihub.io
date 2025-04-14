// app/lib/metadata.ts
import {Metadata} from "next";
import {GLOBAL} from "@/app/constants";
// 기본 메타데이터 (전체 사이트에 적용)
export const  baseMetadata: Metadata = {
    title: {
        default: `${GLOBAL.NAME} 블로그`,
        template: `${GLOBAL.NAME} | 내 블로그`
    },
    description: '웹 개발, 프로그래밍, 기술 트렌드에 관한 개발자의 블로그입니다.',
    keywords: ['개발', '프로그래밍', '웹개발', '기술블로그', '코딩'],
    authors: [{ name: '강건호', url: 'https://github.com/dsds60321' }],
    creator: '작성자 이름',
    publisher: '작성자 이름',
    metadataBase: new URL('https://dsds60321.github.io'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: `${GLOBAL.NAME} 블로그`,
        description: '웹 개발, 프로그래밍 개발자의 블로그입니다.',
        url: 'https://dsds60321.github.io',
        siteName: '내 블로그',
        images: [
            {
                url: '/images/java/java.jpg',
                width: 1200,
                height: 630,
                alt: '블로그 썸네일',
            }
        ],
        locale: 'ko_KR',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    },
    verification: {
        google: 'DMt7PJJ8oGJEU-csPAUyjM7_wSshKvz8uNTppMVUeHU',
        // yandex: 'Yandex 인증 코드',
        // bing: 'Bing 인증 코드',
    },
};

// 블로그 포스트용 메타데이터 생성 함수
export function generatePostMetadata(post: {
    title: string;
    description: string;
    date: string;
    tags?: string[];
    coverImage?: string;
}) {
    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: ['작성자 이름'],
            tags: post.tags,
            images: [
                {
                    url: post.coverImage || '/images/default-post-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.coverImage || '/images/default-post-image.jpg'],
        },
    };
}

// 카테고리/태그 페이지용 메타데이터 생성 함수
export function generateCategoryMetadata(category: string) {
    const title = `${category} 관련 글 모음`;
    const description = `${category}에 관한 모든 블로그 게시물을 확인하세요.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `/images/categories/${category.toLowerCase()}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `${category} 카테고리 이미지`,
                }
            ],
        },
    };
}