/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'standalone',
  // assetPrefix: isProd ? 'https://d3nq3ed4qzq05o.cloudfront.net/' : undefined,
  images: {
    loader: 'custom',
    // Custom loader that strips out all query params that worn't working through cloudfront
    loaderFile: './loaders/cloudfront.js',
  },
}

module.exports = nextConfig
