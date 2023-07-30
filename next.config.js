/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'standalone',
  // assetPrefix: isProd ? 'https://d3nq3ed4qzq05o.cloudfront.net/' : undefined,
  images: {
    loader: 'custom',
    loaderFile: './loaders/cloudfront.js',
  },
}

module.exports = nextConfig
