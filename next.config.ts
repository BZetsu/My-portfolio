import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  webpack: (config, { isServer }) => {
    // Explicitly resolve @splinetool/react-spline to its main entry point
    config.resolve.alias = {
      ...config.resolve.alias,
      '@splinetool/react-spline': path.resolve('./node_modules/@splinetool/react-spline/dist/react-spline.js'),
      '@splinetool/react-spline/next': path.resolve('./node_modules/@splinetool/react-spline/dist/react-spline.js'),
      '@splinetool/runtime': path.resolve('./node_modules/@splinetool/runtime/dist/runtime.js'),
    };
    
    // Add specific condition names for module resolution
    if (config.resolve.conditionNames) {
      config.resolve.conditionNames.push('import', 'require', 'default');
    }
    
    return config;
  }
};

export default nextConfig;
