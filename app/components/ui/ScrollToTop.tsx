// app/components/ui/ScrollToTop.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollableContainer, setScrollableContainer] = useState<Element | null>(null);

    // 스크롤 위치 가져오기
    const getScrollPosition = (element: Element | null) => {
        if (!element) return 0;

        if (element === document.documentElement || element === document.body) {
            return Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
        }

        return element.scrollTop;
    };

    // 스크롤 위치에 따라 버튼 표시 여부 결정 (useCallback으로 메모이제이션)
    const checkScrollPosition = useCallback((element: Element | null) => {
        const scrollTop = getScrollPosition(element);

        if (scrollTop > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        // Next.js App Router에서 실제 스크롤되는 컨테이너 찾기
        const findScrollableContainer = () => {
            // 가능한 스크롤 컨테이너 후보들 (우선순위 순서대로)
            const possibleContainers = [
                // Next.js App Router 특화 요소
                document.querySelector('html'),
                document.documentElement,
                document.body,
                document.querySelector('body'),
                document.querySelector('main'),
                document.querySelector('#__next'),
                // 기타 가능한 래퍼 요소들
                document.querySelector('[data-main-content]'),
                document.querySelector('.layout-container'),
                document.querySelector('.page-content')
            ];

            // 실제로 스크롤이 발생하는 컨테이너 찾기
            for (const container of possibleContainers) {
                if (!container) continue;

                // 컨테이너의 스크롤 높이와 뷰포트 높이 비교
                const el = container as Element;
                const hasScrollbar = el.scrollHeight > el.clientHeight;
                const isScrollable = window.getComputedStyle(el).overflow !== 'hidden' &&
                    window.getComputedStyle(el).overflow !== 'visible';

                if (hasScrollbar && isScrollable) {
                    return el;
                }
            }

            return document.documentElement;
        };

        // 컴포넌트 마운트 후 약간 지연시켜 컨테이너 찾기 (페이지 렌더링 완료 후)
        const timer = setTimeout(() => {
            const container = findScrollableContainer();
            setScrollableContainer(container);

            // 처음 상태 확인
            checkScrollPosition(container);

            // 페이지를 처음 로드할 때 스크롤 위치가 이미 아래에 있는 경우 확인
            window.requestAnimationFrame(() => {
                checkScrollPosition(container);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [checkScrollPosition]);

    useEffect(() => {
        if (!scrollableContainer) return;

        // 스크롤 위치 확인 함수
        const handleScroll = () => {
            checkScrollPosition(scrollableContainer);
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll, { passive: true });
        scrollableContainer.addEventListener('scroll', handleScroll, { passive: true });

        // MutationObserver로 DOM 변화 감지 (컨텐츠 로딩 감지)
        const observer = new MutationObserver(() => {
            checkScrollPosition(scrollableContainer);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 클린업 함수
        return () => {
            window.removeEventListener('scroll', handleScroll);
            scrollableContainer.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [scrollableContainer, checkScrollPosition]);

    // 맨 위로 스크롤
    const scrollToTop = () => {
        if (!scrollableContainer) return;

        // 부드러운 스크롤 애니메이션 적용
        try {
            // 모던 브라우저용 스크롤 API
            scrollableContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } catch {
            // 폴백: 레거시 브라우저용 스크롤 방식
            if (scrollableContainer === document.documentElement || scrollableContainer === document.body) {
                window.scrollTo(0, 0);
            } else {
                scrollableContainer.scrollTop = 0;
            }
        }
    };

    // 버튼이 보이지 않을 때는 렌더링하지 않음 (성능 최적화)
    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 transform hover:scale-110"
            aria-label="맨 위로 스크롤"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                />
            </svg>
        </button>
    );
};

export default ScrollToTop;