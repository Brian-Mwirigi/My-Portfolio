const path = require('path')

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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'cursor/canvas': path.resolve(__dirname, 'src/lib/cursor-canvas/index.ts'),
    }
    return config
  },
  async redirects() {
    return [
      // COBBLE short URL
      { source: '/cobble', destination: '/cobble-mcp', permanent: true },
      // AUX short URL
      { source: '/aux', destination: '/aux-mcp', permanent: true },
      { source: '/spotify-aux', destination: '/aux-mcp', permanent: true },
      { source: '/spotify-mcp', destination: '/aux-mcp', permanent: true },
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
