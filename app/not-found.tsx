// app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '@/app/components/layout/Layout';

export default function NotFound() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
                <h2 className="text-3xl font-semibold mb-4 mt-6">페이지를 찾을 수 없습니다</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </Layout>
    );
}