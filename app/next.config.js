/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/bark-and-found.appspot.com/o/pet-pictures/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  