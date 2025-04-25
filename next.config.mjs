// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      'cdn.noitatnemucod.net',
      'artworks.thetvdb.com',
      's4.anilist.co',
      'media.kitsu.app' // ✅ No protocol
    ],
  },
};

export default nextConfig;
