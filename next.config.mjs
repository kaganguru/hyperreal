import nextra from 'nextra'

const withNextra = nextra({
  latex: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/hyperreal',
  assetPrefix: '/hyperreal/',
  images: {
    unoptimized: true
  },
  reactStrictMode: true
}

export default withNextra(nextConfig)
