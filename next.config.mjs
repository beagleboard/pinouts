/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export", // Ensures it works with static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default config;