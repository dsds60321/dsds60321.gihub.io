// app/page.tsx
'use client';

import Layout from './components/layout/Layout';

export default function Home() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-dark-primary">환영합니다!</h1>
                <div className="bg-white dark:bg-dark-primary rounded-lg shadow-md p-4 md:p-6 mb-6 transition-colors duration-200">
                    <h2 className="text-xl font-semibold mb-3 md:mb-4 text-gray-800 dark:text-dark-primary">최근 게시물</h2>
                    <div className="space-y-3 md:space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-3 md:p-4 border border-gray-200 dark:border-gray-700 rounded-md transition-colors duration-200">
                                <h3 className="font-medium text-gray-800 dark:text-dark-primary">게시물 제목 예시 {i}</h3>
                                <p className="text-sm md:text-base text-gray-600 dark:text-dark-secondary mt-2">
                                    여기에 게시물 요약이 표시됩니다. 컨텐츠는 나중에 작성하실 수 있습니다.
                                </p>
                                <div className="flex items-center mt-2 text-xs md:text-sm text-gray-500 dark:text-dark-secondary">
                                    <span>2024년 x월 x일</span>
                                    <span className="mx-2">•</span>
                                    <span>카테고리</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}