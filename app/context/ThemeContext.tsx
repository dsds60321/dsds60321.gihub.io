// app/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // 현재 시간에 따라 기본 테마 설정 함수
    const getDefaultThemeByTime = (): Theme => {
        const currentHour = new Date().getHours();
        // 아침 6시부터 저녁 6시까지는 라이트 테마, 그 외에는 다크 테마
        return (currentHour >= 6 && currentHour < 18) ? 'light' : 'dark';
    };

    // 클라이언트 사이드에서만 실행
    useEffect(() => {
        setMounted(true);

        // 로컬 스토리지에서 테마 가져오기
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // 저장된 테마가 없으면 시간에 따라 테마 설정
            setTheme(getDefaultThemeByTime());
        }
    }, []);

    // 테마 변경 시 HTML에 클래스 추가/제거
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};