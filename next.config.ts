// next.config.ts
import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
    /* config options here */
    webpack: (config) => {
        config.resolve.alias['@data'] = path.join(__dirname, 'data');
        config.resolve.alias['@type'] = path.join(__dirname, 'type');
        config.resolve.alias['@components'] = path.join(__dirname, 'components');
        return config;
    },
};

export default nextConfig;