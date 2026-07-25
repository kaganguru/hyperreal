import nextra from 'nextra'

const withNextra = nextra({
  latex: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Served from the root of a custom domain, so no basePath/assetPrefix.
  // Re-add basePath: '/hyperreal' if you ever fall back to
  // kaganguru.github.io/hyperreal.
  images: {
    unoptimized: true
  },
  reactStrictMode: true
}

export default withNextra(nextConfig)
