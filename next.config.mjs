/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the live site's URL style (/about/, /quad-room/ ...)
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      // Legacy room URL, already 301 on the live site (audit 02)
      { source: "/ac-wooden-tent", destination: "/quad-room/", permanent: true },
    ];
  },
};

export default nextConfig;
