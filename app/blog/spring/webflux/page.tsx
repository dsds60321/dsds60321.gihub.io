import { BlogList } from '@components/Blog/BlogList';
import Layout from "@components/layout/Layout";
import {webfluxPosts} from "@data/blog/spring/webflux/webflux";

export default function WebfluxPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">WebFlux</h1>
                <BlogList posts={webfluxPosts} className="md:grid-cols-2 lg:grid-cols-3" />
            </div>
        </Layout>
    );
}