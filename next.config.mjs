/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Skips ESLint checks only in production builds (use carefully)
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**', // Allows all images from Unsplash
            },
        ],
    },
};

export default nextConfig;
