/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'nextproject.local',
        port: '', // اگر پورتی وجود ندارد، خالی بگذارید
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;