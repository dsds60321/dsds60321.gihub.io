// app/components/search/SearchModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/app/types/blog';
import { getAllPosts } from '@data/blog/blogUtils';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 검색 기능 구현
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const allPosts = getAllPosts();
        const results = allPosts.filter(post => {
            // 제목과 태그에서 검색어 포함 여부 확인
            const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
            const tagMatch = post.tags?.some(tag =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return titleMatch || tagMatch;
        });

        setSearchResults(results);
    }, [searchTerm]);

    // 모달 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // 모달이 열릴 때 input에 포커스
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            // 모달 열릴 때 스크롤 방지
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 sm:pt-24">
            <div
                ref={modalRef}
                className="bg-white dark:bg-dark-primary rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden transition-all duration-200"
            >
                <div className="p-4 border-b dark:border-gray-700">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="검색어를 입력하세요..."
                            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-secondary text-gray-800 dark:text-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute left-3 top-2.5">🔍</span>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto p-4">
                    {searchResults.length > 0 ? (
                        <div className="space-y-4">
                            {searchResults.map((post) => (
                                <Link
                                    href={`/blog/${post.id}`}
                                    key={post.id}
                                    onClick={onClose}
                                    className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <h3 className="font-semibold text-gray-800 dark:text-dark-primary">{post.title}</h3>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="px-1.5 py-0.5 bg-primary text-white text-xs rounded-md">
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : searchTerm ? (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
                    ) : (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">검색어를 입력하세요.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;