// app/page.tsx
import Layout from './components/layout/Layout';
import { getRecentPosts } from '@data/blog/blogUtils';
import Link from 'next/link';

export default function Home() {
    // 최근 게시물 3개 가져오기
    const recentPosts = getRecentPosts(3);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 dark:text-dark-primary">환영합니다!</h1>
                <div className="bg-white dark:bg-dark-primary rounded-lg shadow-md p-6 md:p-8 mb-8 transition-colors duration-200">
                    <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-6 text-gray-800 dark:text-dark-primary">최근 게시물</h2>
                    <div className="space-y-6 md:space-y-8">
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <Link href={`/blog/${post.id}`} key={post.id} className="block">
                                    <div className="p-5 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200
                                                hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md
                                                transform hover:-translate-y-1">
                                        <h3 className="font-semibold text-lg md:text-xl text-gray-800 dark:text-dark-primary mb-2">{post.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600 dark:text-dark-secondary mb-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-xs md:text-sm text-gray-500 dark:text-dark-secondary">
                                            <span className="font-medium">{post.date}</span>
                                            {post.tags && post.tags.length > 0 && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                                                        {post.tags[0]}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-5 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <p className="text-gray-600 dark:text-dark-secondary">아직 게시물이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}