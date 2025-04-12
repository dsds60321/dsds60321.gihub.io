import { BlogList } from '@components/Blog/BlogList';
import {javaPosts} from '@data/blog/lang/java/java';
import Layout from "@components/layout/Layout";

export default function KafkaPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">JAVA</h1>
                <BlogList posts={javaPosts} className="md:grid-cols-2 lg:grid-cols-3" />
            </div>
        </Layout>
    );
}