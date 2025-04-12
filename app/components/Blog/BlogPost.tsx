// components/Blog/BlogPost.tsx
'use client';

import React from 'react';
import { BlogPost } from '@/app/types/blog';
import { remark } from 'remark';
import html from 'remark-html';

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
                    .use(html)
                    .process(post.md);
                setMdContent(processedContent.toString());
            }
        };

        processMarkdown();
    }, [post.md]);

    return (
        <article className={`prose max-w-none ${className}`}>
            {post.coverImage && (
                <div className="mb-8">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="max-w-full max-h-[500px] w-auto rounded-lg shadow-md object-contain"
                    />
                </div>
            )}

            <header className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center text-gray-500 text-sm">
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
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-primary text-white text-xs rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {post.md ? (
                <div
                    className="blog-content markdown-content"
                    dangerouslySetInnerHTML={{ __html: mdContent }}
                />
            ) : post.content ? (
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            ) : (
                <div className="blog-content">
                    <p>이 게시물에는 내용이 없습니다.</p>
                </div>
            )}
        </article>
    );
};