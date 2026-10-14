import Link from 'next/link'
import type { ReactNode } from 'react'

// Full class names, so Tailwind finds them when scanning this file.
const COLUMNS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}

type CardsProps = {
  children: ReactNode
  columns?: keyof typeof COLUMNS
}

function CardsGrid({ children, columns = 3 }: CardsProps) {
  return <div className={`mt-4 grid gap-4 ${COLUMNS[columns]}`}>{children}</div>
}

type CardProps = {
  title: string
  href: string
  /** Short description under the title. */
  children?: ReactNode
  arrow?: boolean
}

/**
 * Colours come from the surrounding text (`currentColor`) and the shared
 * `--border` token, so the card follows the light/dark toggle without any
 * `dark:` classes.
 */
function Card({ title, href, children, arrow }: CardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1 rounded-lg border border-border p-4 text-current no-underline transition-colors duration-200 hover:bg-current/5"
    >
      <span className="flex items-center gap-2 font-semibold">
        {title}
        {arrow && (
          <span
            aria-hidden
            className="transition-transform duration-75 group-hover:translate-x-0.5"
          >
            →
          </span>
        )}
      </span>
      {children && <span className="text-sm opacity-70">{children}</span>}
    </Link>
  )
}

/** Drop-in for Nextra's <Cards>/<Cards.Card> call sites. */
export const Cards = Object.assign(CardsGrid, { Card })
