import { BlogList } from '@components/Blog/BlogList';
import { reactPosts } from '@data/blog/react/react';
import Layout from "@components/layout/Layout";

export default function ReactPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">블로그</h1>
                <BlogList posts={reactPosts} className="md:grid-cols-2 lg:grid-cols-3" />
            </div>
        </Layout>
    );
}