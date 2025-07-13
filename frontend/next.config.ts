import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        MOVIEDB_API_URL: process.env.MOVIEDB_API_URL,
        MOVIEDB_API_TOKEN: process.env.MOVIEDB_API_TOKEN,
        MOVUIEDB_BEARER: process.env.MOVUIEDB_BEARER,
        MOVIEDB_IMAGE_URL: process.env.MOVIEDB_IMAGE_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.dev',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
                pathname: '/**',
                search: '',
            }
        ],

    },

};

export default nextConfig;
