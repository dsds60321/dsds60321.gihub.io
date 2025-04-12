// app/blog/[id]/page.tsx
import { BlogPostComponent } from '@components/Blog/BlogPost';
import { reactPosts } from '@data/blog/react/react';
import { kafkaPosts } from '@data/blog/kafka/kafka';
import { notFound } from 'next/navigation';
import Layout from "@components/layout/Layout";

// 모든 포스트 데이터를 하나의 객체로 모음
const allPosts = {
    'react': reactPosts,
    'kafka': kafkaPosts,
};

export function generateStaticParams() {
    // 모든 카테고리의 모든 게시물 ID를 생성
    const params = [];

    for (const category in allPosts) {
        allPosts[category].forEach(post => {
            params.push({
                id: post.id,
            });
        });
    }

    return params;
}

export default function BlogPost({ params }: { params: { id: string } }) {
    // 모든 카테고리에서 ID와 일치하는 게시물 찾기
    let post = null;

    for (const category in allPosts) {
        const foundPost = allPosts[category].find(post => post.id === params.id);
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