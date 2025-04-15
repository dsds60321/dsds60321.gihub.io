import { BlogList } from '@components/Blog/BlogList';
import Layout from "@components/layout/Layout";
import {reactPosts} from "@data/blog/js/react/react";

export default function ReactPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">React</h1>
                <BlogList posts={reactPosts} className="md:grid-cols-2 lg:grid-cols-3" />
            </div>
        </Layout>
    );
}