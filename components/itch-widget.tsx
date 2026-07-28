'use client'

import Link from 'next/link'
import { itch } from './itch'
import styles from './itch-widget.module.css'

export function ItchWidget() {
  const onSale = Boolean(itch.originalPrice)

  return (
    <div className={styles.card}>
      <a
        href={itch.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.coverLink}
        aria-label={`View ${itch.title} on itch.io`}
      >
        <div className={styles.cover}>
          {/* Our own artwork in public/, not itch's CDN thumbnail — the
              build-time refresh only touches the store text. */}
          <img
            src="/itch-cover.png"
            alt=""
            className={styles.coverImage}
            width={360}
            height={286}
            loading="lazy"
          />
          <span className={styles.coverLabel}>itch.io</span>
        </div>
      </a>

      <div className={styles.body}>
        <a
          href={itch.gameUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.title}
        >
          {itch.title}
        </a>
        <p className={styles.author}>by {itch.author}</p>

        <div className={styles.actions}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>{itch.price}</span>
            {itch.priceNote && (
              <span className={styles.priceNote}>{itch.priceNote}</span>
            )}
            {onSale && (
              <>
                <span className={styles.originalPrice}>
                  {itch.originalPrice}
                </span>
                {itch.saleRate && (
                  <span className={styles.saleBadge}>{itch.saleRate}</span>
                )}
              </>
            )}
          </div>

          {/* Goes to the pitch page rather than straight to itch's checkout —
              /get-started is where the bundle contents, requirements and
              licensing are explained, and where the checkout is triggered. */}
          <Link href="/get-started" className={styles.buyButton}>
            {itch.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
