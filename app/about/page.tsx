// app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import Layout from "@components/layout/Layout";

export const metadata = {
    title: '소개 | 강건호 포트폴리오',
    description: '웹 애플리케이션 개발자 강건호의 프로필입니다',
};

export default function AboutPage() {
    return (
        <Layout>
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <section className="mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-64 h-64 relative rounded-full overflow-hidden shrink-0 border-4 border-blue-500">
                        <Image
                            src="/profile-placeholder.jpg" // 실제 프로필 이미지로 교체하세요
                            alt="강건호 프로필 사진"
                            fill
                            sizes="256px"
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-4">강건호</h1>
                        <p className="text-lg text-gray-700 mb-6">
                            웹 애플리케이션 개발자 | 백엔드 개발자
                        </p>
                        <div className="space-y-2 mb-6">
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <a href="mailto:dsds60321@gmail.com" className="text-blue-600 hover:underline">dsds60321@gmail.com</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span>+82 10 3613 4750</span>
                            </p>
                        </div>
                        <div className="flex gap-4 mb-8">
                            <a
                                href="https://github.com/dsds60321"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                                aria-label="GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">소개</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        개발은 필요를 해결하기 위한 과정이라 생각합니다.
                    </p>
                    <p>
                        필요한 것을 직접 구현하고 사용자가 이를 활용하는 모습을 볼 때 큰 보람을 느낍니다.
                        제가 만든 서비스가 사용자에게 편의를 제공하고 도움이 될 때 가장 큰 만족감을 얻으며,
                        앞으로도 유저의 반응을 직접 확인하고 소통할 수 있는 서비스 개발에 참여하고 싶습니다.
                    </p>
                    <p>
                        이를 위해 새로운 기술을 배우고 적용하며 꾸준히 성장해 나가고자 합니다.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">기술 스택</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        'Node.js',
                        'Vue.js',
                        'Redis',
                        'Jenkins',
                        'Docker',
                        'Git',
                        'Java',
                        'JavaScript',
                        'Spring Boot',
                        'React.js',
                        'MySQL',
                        'JPA'
                    ].map((skill, index) => (
                        <div key={index} className="border bg-white border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow">
                            <p className="text-gray-800">{skill}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">경력</h2>
                <div className="space-y-8">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-bold text-xl">웹 애플리케이션 개발자</h3>
                        <p className="text-gray-600 mb-2">국내 IPG 회사 | 3년+</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>다양한 형태의 PG 모듈 개발 및 자사 결제 창 모듈 담당</li>
                            <li>프로젝트 리더로서 3DS 인증, 수기 결제 창, 내부 관리자 사이트, 가맹점 관리자 사이트의 설계와 구축 진행</li>
                            <li>차세대 글로벌 어드민 시스템 개발에 참여하여 국내외 결제 모듈 통합</li>
                            <li>내부 관리자 사이트와 가맹점 사이트 개발</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">프로젝트</h2>
                <div className="space-y-8">
                    <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-bold text-xl">결제 창 모듈</h3>
                        <p className="text-gray-700 mb-2">자사의 온라인 결제 솔루션 개발 및 유지보수</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Vue.js</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Spring Boot</span>
                        </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-bold text-xl">3DS 인증 시스템</h3>
                        <p className="text-gray-700 mb-2">신용카드 보안 강화를 위한 3DS 인증 시스템 구축</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Java</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Spring Boot</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">MySQL</span>
                        </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-bold text-xl">글로벌 어드민 시스템</h3>
                        <p className="text-gray-700 mb-2">국내외 결제 모듈 통합 관리 시스템 개발</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React.js</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Redis</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Docker</span>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">연락처</h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="space-y-3">
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">이메일:</span>
                            <a href="mailto:dsds60321@gmail.com" className="text-blue-600 hover:underline">dsds60321@gmail.com</a>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">GitHub:</span>
                            <a href="https://github.com/dsds60321" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/dsds60321</a>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">포트폴리오:</span>
                            <a href="https://drive.google.com/file/d/1_9gR1Iq1l9S3Xi021yVr39Z9WPOlJWLN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/dsds60321</a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
        </Layout>
    );
}