/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sof statik sayt — server kerak emas (Vercel/GitHub Pages/oddiy hosting).
  output: 'export',

  // Statik eksportda Next.js rasm optimizatsiyasi ishlamaydi.
  images: {
    unoptimized: true,
  },

  // /veb/01 -> /veb/01/index.html  (har qanday hostingda toza URL)
  trailingSlash: true,
};

export default nextConfig;
