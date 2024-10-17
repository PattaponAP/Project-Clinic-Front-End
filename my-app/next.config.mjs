/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Disable the Image Optimization API for export
  },
};

export default nextConfig;