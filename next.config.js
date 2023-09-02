/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'standalone',
  // assetPrefix: isProd ? 'https://d3nq3ed4qzq05o.cloudfront.net/' : undefined,
  images: {
    loader: 'custom',
    // Custom loader that strips out all query params that worn't working through cloudfront
    loaderFile: './src/loaders/cloudfront.js',
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === 'nodejs')
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      )
    return config
  },
}

module.exports = nextConfig
