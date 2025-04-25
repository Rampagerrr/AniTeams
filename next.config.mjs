// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
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
