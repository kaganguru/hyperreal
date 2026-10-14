'use client'

import Link from 'next/link'
import { itch } from './itch'
import { RichCard } from './rich-card'

/** Shows through until the cover image paints, and if it ever 404s. */
const coverBackground = [
  'radial-gradient(circle at 20% 80%, oklch(0.55 0.14 230 / 45%), transparent 55%)',
  'radial-gradient(circle at 80% 20%, oklch(0.45 0.1 260 / 35%), transparent 50%)',
  'linear-gradient(145deg, oklch(0.22 0.04 240), oklch(0.12 0.02 250))'
].join(', ')

export function ItchWidget() {
  const onSale = Boolean(itch.originalPrice)

  return (
    // Our own artwork in public/, not itch's CDN thumbnail — the build-time
    // refresh only touches the store text.
    <RichCard
      image="/itch-cover.png"
      href={itch.gameUrl}
      hrefLabel={`View ${itch.title} on itch.io`}
      badge="itch.io"
      coverBackground={coverBackground}
    >
      <span className="text-[13px] font-bold leading-[1.3] text-neutral-50">
        {itch.title}
      </span>
      <p className="m-0 text-[11px] text-neutral-400">by {itch.author}</p>

      <div className="mt-1.5 flex items-center justify-between gap-2">
        <div className="flex min-h-5 flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-[13px] font-semibold text-neutral-50">
            {itch.price}
          </span>
          {itch.priceNote && (
            <span className="text-[11px] text-neutral-400">
              {itch.priceNote}
            </span>
          )}
          {onSale && (
            <>
              <span className="text-[11px] text-neutral-500 line-through">
                {itch.originalPrice}
              </span>
              {itch.saleRate && (
                <span className="rounded-full bg-[oklch(0.55_0.2_25)] px-1.25 py-px text-[10px] font-bold text-neutral-50">
                  {itch.saleRate}
                </span>
              )}
            </>
          )}
        </div>

        {/* Goes to the pitch page rather than straight to itch's checkout —
              /purchase is where the bundle contents, requirements and
              licensing are explained, and where the checkout is triggered. */}
        <Link
          href="/purchase"
          className="relative z-20 inline-block shrink-0 whitespace-nowrap rounded-full border-[0.5px] border-[oklch(0.55_0.2_260)] bg-linear-to-b from-[oklch(0.55_0.2_260)] via-[oklch(0.45_0.18_260)] to-[oklch(0.35_0.15_260)] px-3 py-[0.3rem] text-center text-[11px] font-semibold text-neutral-50 no-underline transition-[filter] duration-150 hover:brightness-110"
        >
          {itch.cta}
        </Link>
      </div>
    </RichCard>
  )
}
