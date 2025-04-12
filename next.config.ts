// next.config.ts
import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
    output: 'export', // 정적 HTML 내보내기 설정
    distDir: 'out', // 빌드 출력 디렉토리 설정
    images: {
        unoptimized: true, // GitHub Pages에서는 Next.js 이미지 최적화가 작동하지 않음
    },
    basePath: process.env.NODE_ENV === 'production' ? '/repository-name' : '', // 저장소 이름이 username.github.io가 아닌 경우 설정
    assetPrefix: process.env.NODE_ENV === 'production' ? '/repository-name' : '', // 저장소 이름이 username.github.io가 아닌 경우 설정
    webpack: (config) => {
        config.resolve.alias['@data'] = path.join(__dirname, 'data');
        config.resolve.alias['@type'] = path.join(__dirname, 'type');
        config.resolve.alias['@components'] = path.join(__dirname, 'components');
        return config;
    },
};

export default nextConfig;