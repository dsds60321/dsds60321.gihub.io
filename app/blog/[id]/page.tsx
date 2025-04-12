// app/blog/[id]/page.tsx
import { BlogPostComponent } from '@components/Blog/BlogPost';
import { notFound } from 'next/navigation';
import Layout from "@components/layout/Layout";
import { allPosts, getPostById } from "@data/blog/blogUtils";

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

export default async function Page({params}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Promise로 params와 searchParams 해결
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // ID와 일치하는 게시물 찾기
    const post = getPostById(id);

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