/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Button } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Hyperreal',
    template: '%s – Hyperreal'
  },
  description: 'Hyperreal documentation'
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <div>
          <b>Hyperreal</b>{' '}
          <span style={{ opacity: '60%' }}>Documentation</span>
        </div>
      }
      children={<Button variant="default">Buy Now</Button>}
    />
  )
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="◈" backgroundColor={{ dark: 'rgb(10, 10, 10)' }} />
      <body>
        <Layout
          navbar={navbar}
          // footer={<Footer>MIT {new Date().getFullYear()} © Hyperreal.</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/kaganguru/hyperreal/tree/main"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
