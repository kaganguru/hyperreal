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
    template: 'Hyperreal - %s'
  },
  description: 'Hyperreal documentation',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png'
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const navbar = (
    <Navbar
      // Always-dark navbar: Nextra's and our dark styles all key off being
      // inside `.dark`, so this renders the links, search and button dark in
      // both themes. `dark` sets no text colour of its own, and the active link
      // inherits it (text-current), so text-white and scheme-dark stand in for
      // what the dark theme gives the page. The background and border are set
      // in globals.css.
      // className="dark scheme-dark text-white"
      logo={
        <span className="flex items-center gap-1 text-[1.5rem] font-bold">
          <Image src={logo} alt="Hyperreal" height={18} priority/>
          Hyperreal<span className='text-[0.5rem]'>©</span>
        </span>
      }
      children={<PurchaseButton />}
    />
  )
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
      />
      <body>
        <Layout
          navbar={navbar}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
