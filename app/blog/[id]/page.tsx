// app/blog/[id]/page.tsx
import { BlogPostComponent } from '@components/Blog/BlogPost';
import { reactPosts } from '@data/blog/react/react';
import { kafkaPosts } from '@data/blog/kafka/kafka';
import { notFound } from 'next/navigation';
import Layout from "@components/layout/Layout";
import { BlogPost } from '@/app/types/blog';

// 타입 안전성을 위한 인덱스 시그니처 추가
const allPosts: Record<string, BlogPost[]> = {
    'react': reactPosts,
    'kafka': kafkaPosts,
};

// 정적 경로 생성
export function generateStaticParams() {
    const params: { id: string }[] = [];

    Object.keys(allPosts).forEach((category) => {
        allPosts[category].forEach(post => {
            params.push({
                id: post.id,
            });
        });
    });

    return params;
}

// Next.js 15.x의 PageProps 타입에 맞춰 수정
export default async function Page({params}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Promise로 params와 searchParams 해결
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // 모든 카테고리에서 ID와 일치하는 게시물 찾기
    let post: BlogPost | null = null;

    for (const category of Object.keys(allPosts)) {
        const foundPost = allPosts[category].find(p => p.id === id);
        if (foundPost) {
            post = foundPost;
            break;
        }
    }

    if (!post) {
        notFound();
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <BlogPostComponent post={post} />
            </div>
        </Layout>
    );
}