/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['service-finder-75.preview.emergentagent.com', 'customer-assets.emergentagent.com'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://build-connect-9.preview.emergentagent.com',
  },
}

module.exports = nextConfig