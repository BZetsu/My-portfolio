import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  webpack: (config, { isServer }) => {
    // Explicitly resolve @splinetool packages
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
    
    // Ensure dependencies are properly handled
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    
    // Make sure webpack can resolve these modules
    config.resolve.modules = [
      ...config.resolve.modules || [],
      path.resolve('./node_modules'),
      'node_modules'
    ];
    
    // Explicitly map the external dependencies
    if (!config.externals) {
      config.externals = [];
    }
    
    if (Array.isArray(config.externals)) {
      // Add specific rules for @splinetool packages
      config.externals.push({
        '@splinetool/runtime': 'commonjs @splinetool/runtime',
      });
    }
    
    return config;
  }
};

export default nextConfig;
