import { BlogList } from '@components/Blog/BlogList';
import Layout from "@components/layout/Layout";
import {jpaPosts} from "@data/blog/spring/jpa/jpa";

export default function JpaPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">JPA</h1>
                <BlogList posts={jpaPosts} className="md:grid-cols-2 lg:grid-cols-3" />
            </div>
        </Layout>
    );
}