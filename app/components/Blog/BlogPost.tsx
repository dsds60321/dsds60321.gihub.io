// components/Blog/BlogPost.tsx
'use client';

import React from 'react';
import { BlogPost } from '@/app/types/blog';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import Image from 'next/image';
import rehypePrism from 'rehype-prism-plus';

interface BlogPostProps {
    post: BlogPost;
    className?: string;
}

export const BlogPostComponent: React.FC<BlogPostProps> = ({ post, className = '' }) => {
    const [mdContent, setMdContent] = React.useState<string>('');

    React.useEffect(() => {
        const processMarkdown = async () => {
            if (post.md) {
                const processedContent = await remark()
                    .use(gfm)
                    .use(html)
                    .use(rehypePrism, {
                        showLineNumbers: true, // 줄 번호 표시
                        ignoreMissing: true,
                        aliases: {
                            js: 'javascript',
                            ts: 'typescript',
                            jsx: 'javascript',
                            tsx: 'typescript',
                            sh: 'bash'
                        }
                    })
                    .process(post.md);
                setMdContent(processedContent.toString());
            }
        };

        processMarkdown();
    }, [post.md]);

    // 나머지 코드는 동일
    return (
        <article className={`prose max-w-none prose-sm sm:prose ${className}`}>
            {/* 기존 코드 유지 */}
            {post.coverImage && (
                <div className="mb-4 sm:mb-8">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="max-w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-auto rounded-lg shadow-md object-contain mx-auto"
                    />
                </div>
            )}

            <header className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center text-gray-500 text-xs sm:text-sm flex-wrap">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</time>
                    {post.author && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{post.author}</span>
                        </>
                    )}
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary text-white text-xs rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            <div className="blog-content markdown-content overflow-x-auto">
                {post.md ? (
                    <div className="prose" dangerouslySetInnerHTML={{ __html: mdContent }} />
                ) : post.content ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                    <p>이 게시물에는 내용이 없습니다.</p>
                )}
            </div>
        </article>
    );
};