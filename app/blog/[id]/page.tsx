// app/blog/[id]/page.tsx
import { BlogPostComponent } from '@components/Blog/BlogPost';
import { reactPosts } from '@data/blog/react/react';
import { notFound } from 'next/navigation';
import Layout from "@components/layout/Layout";

export function generateStaticParams() {
    return reactPosts.map(post => ({
        id: post.id,
    }));
}

export default function BlogPost({ params }: { params: { id: string } }) {
    const post = reactPosts.find(post => post.id === params.id);

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