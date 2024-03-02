import('./src/env.mjs')

const isDev = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
