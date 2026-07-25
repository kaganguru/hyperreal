import Image from 'next/image'
import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { PurchaseButton } from '@/components/purchase-button'
import { getPageMap } from 'nextra/page-map'
import logo from './logo.png'
import './globals.css'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Hyperreal',
    template: '%s – Hyperreal'
  },
  description: 'Hyperreal documentation'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const navbar = (
    <Navbar
      logo={
        <span className="flex items-center gap-1 text-[1.5rem] font-bold text-blue-100 ">
          <Image src={logo} alt="Hyperreal" height={24} priority className='-mb-1'/>
          Graphics
        </span>
      }
      children={<PurchaseButton />}
    />
  )
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        faviconGlyph="◈"
        backgroundColor={{ dark: 'rgb(16, 16, 10)' }}
        color={{
          hue: 37,
          saturation: 0,
          lightness: {
            light: 20,
            dark: 84
          }
        }}
      />
      <body>
        <Layout
          navbar={navbar}
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
