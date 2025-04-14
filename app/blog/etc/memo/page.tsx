import { BlogList } from '@components/Blog/BlogList';
import { memoPosts } from '@data/blog/etc/memo/memo';
import Layout from "@components/layout/Layout";

export default function EtcPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">개발 메모</h1>
                <BlogList posts={memoPosts} className="md:grid-cols-2 lg:grid-cols-3" />
            </div>
        </Layout>
    );
}