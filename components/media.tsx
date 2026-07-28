import styles from './media.module.css'

type ShotProps = {
  src: string
  alt: string
  caption?: string
  /** Renders edge to edge without the rounded frame. */
  bare?: boolean
}

/**
 * A captioned still. Plain `<img>` rather than `next/image` — the export is
 * static (`images.unoptimized`), so `next/image` would only add layout
 * constraints without buying any optimization.
 */
export function Shot({ src, alt, caption, bare }: ShotProps) {
  return (
    <figure className={styles.figure}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={bare ? styles.bareMedia : styles.media}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

type ClipProps = {
  src: string
  caption?: string
  poster?: string
  /**
   * Silent, looping, no chrome — for short clips. Long clips should keep the
   * default controls so nobody pays for a 30 MB download they didn't ask for.
   */
  autoplay?: boolean
}

export function Clip({ src, caption, poster, autoplay }: ClipProps) {
  return (
    <figure className={styles.figure}>
      <video
        className={styles.media}
        poster={poster}
        preload="metadata"
        playsInline
        muted={autoplay}
        loop={autoplay}
        autoPlay={autoplay}
        controls={!autoplay}
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

/** Side-by-side media on wide viewports, stacked on narrow ones. */
export function MediaRow({ children }: { children: React.ReactNode }) {
  return <div className={styles.row}>{children}</div>
}
