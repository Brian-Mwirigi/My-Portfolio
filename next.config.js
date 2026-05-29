/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  transpilePackages: ['three'],
  async redirects() {
    return [
      // Legacy routes
      { source: '/codesession-cli', destination: '/costhq', permanent: true },
      { source: '/docs/codesession-cli-docs', destination: '/docs/costhq-docs', permanent: true },
      // Phantom URLs Google picked up — redirect to home with 301
      { source: '/login', destination: '/', permanent: true },
      { source: '/api/users', destination: '/', permanent: true },
      { source: '/api/:path*', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
