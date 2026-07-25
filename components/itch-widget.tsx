'use client'

import { itch, openItchCheckout } from './itch'
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
          {itch.cover && (
            <img
              src={itch.cover}
              alt=""
              className={styles.coverImage}
              width={360}
              height={286}
              loading="lazy"
            />
          )}
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

          <button
            type="button"
            className={styles.buyButton}
            onClick={openItchCheckout}
          >
            {itch.cta} ↗
          </button>
        </div>
      </div>
    </div>
  )
}
