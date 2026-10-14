import Link from 'next/link'
import type { ReactNode } from 'react'

type RichCardProps = {
  /** Cover image, filling the whole card. Ignored when `video` is set. */
  image?: string
  /** Cover clip — plays silent and looping, so keep it short. */
  video?: string
  /** Still shown before the clip loads. */
  poster?: string
  /** Alt text for the cover image; leave empty when it's decorative. */
  alt?: string
  /** Makes the whole card a link. Full URLs open in a new tab. */
  href?: string
  /** Name of the link target, for screen readers. */
  hrefLabel?: string
  /** Small label pinned to the top-right corner. */
  badge?: ReactNode
  /** CSS background behind the cover, visible until it paints or if it 404s. */
  coverBackground?: string
  /**
   * Hover effects without a link of the card's own — for when something around
   * the card is already the link, like a Nextra menu item. Defaults to on when
   * `href` is set.
   */
  hoverable?: boolean
  /** `compact` is a short fixed-height strip, for menus. */
  size?: 'default' | 'compact'
  /**
   * Body content: titles, text, prices, buttons — anything. When the card has
   * an `href`, give interactive children `relative z-20` so they sit above the
   * card-wide link and stay clickable on their own.
   */
  children: ReactNode
}

/**
 * Opaque black card. With a cover, the image or clip fills the card and the
 * content sits at the bottom over a gradient to black, so text stays readable
 * on any cover. Always dark, in both themes. Fills whatever it's placed in, so
 * inside <Cards columns={n}> it takes one grid cell.
 */
export function RichCard({
  image,
  video,
  poster,
  alt = '',
  href,
  hrefLabel,
  badge,
  coverBackground,
  hoverable = Boolean(href),
  size = 'default',
  children
}: RichCardProps) {
  const hasCover = Boolean(image || video)
  const compact = size === 'compact'
  const coverClass =
    'block size-full object-cover transition-transform duration-500 group-hover:scale-105'

  return (
    <div
      data-rich-card
      className={[
        'group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-md bg-black shadow-[0_0_12px_rgb(0_0_0/0.18)] font-normal text-neutral-50',
        compact ? 'h-16 w-60 max-w-full' : hasCover && 'min-h-48',
        hoverable && 'transition-shadow duration-200 hover:shadow-[0_0_20px_rgb(0_0_0/0.3)]'
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasCover && (
        <div
          className="absolute inset-0 -z-10 bg-neutral-900"
          style={coverBackground ? { background: coverBackground } : undefined}
        >
          {video ? (
            <video
              className={coverClass}
              poster={poster}
              preload="metadata"
              muted
              loop
              autoPlay
              playsInline
            >
              <source src={video} type="video/mp4" />
            </video>
          ) : (
            <img src={image} alt={alt} className={coverClass} loading="lazy" />
          )}
        </div>
      )}

      {badge && (
        <span className="absolute top-2 right-2 z-20 rounded bg-black/45 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-neutral-300 uppercase">
          {badge}
        </span>
      )}

      <div
        className={[
          'flex flex-col gap-1',
          compact ? 'px-2.5 pb-2' : 'px-3 pb-3',
          hasCover
            ? `bg-linear-to-t from-black from-30% via-black/70 to-transparent ${compact ? 'pt-6' : 'pt-12'}`
            : 'pt-2.5'
        ].join(' ')}
      >
        {children}
      </div>

      {/* Card-wide link, layered over everything except children marked
          `relative z-20`. */}
      {href && <CardLink href={href} label={hrefLabel} />}
    </div>
  )
}

function CardLink({ href, label }: { href: string; label?: string }) {
  const className = 'absolute inset-0 z-10'
  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={label}
      />
    )
  }
  return <Link href={href} className={className} aria-label={label} />
}
