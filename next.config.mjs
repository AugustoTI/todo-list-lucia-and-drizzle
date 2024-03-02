import('./src/env.mjs')

const isDev = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
  compiler: {
    removeConsole: !isDev,
  },
  logging: {
    fetches: {
      fullUrl: isDev,
    },
  },
}

export default nextConfig
