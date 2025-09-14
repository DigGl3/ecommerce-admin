/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    domains: [
      "res.cloudinary.com"
    ]
  },
  reactStrictMode: true,
  experimental: {
    serverActions: true, // ⚠️ activează Server Actions
  },
};

module.exports = nextConfig;
