import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  // Disable ESLint errors during build
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build as well
  typescript: {
    // Don't run type checking during builds
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, webpack }) => {
    // Optimizations for client side rendering
    if (!isServer) {
      // Provide proper browser globals instead of Node.js globals
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        os: false,
        crypto: false,
      };

      // Add a plugin to replace require with a browser-compatible alternative
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
      );
    }
    
    // Add specific condition names for module resolution
    if (config.resolve.conditionNames) {
      config.resolve.conditionNames.push('import', 'default');
    }
    
    // Make sure webpack can resolve these modules
    config.resolve.modules = [
      ...config.resolve.modules || [],
      path.resolve('./node_modules'),
      'node_modules'
    ];
    
    return config;
  }
};

export default nextConfig;
