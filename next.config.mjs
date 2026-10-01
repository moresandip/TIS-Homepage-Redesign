/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from external sources like the TIS website
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tis.edu.in',
      },
    ],
  },
};

export default nextConfig;
