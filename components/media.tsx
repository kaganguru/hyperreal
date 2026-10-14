/**
 * Frame shared by Markdown images (applied in mdx-components.js) and <Clip>
 * videos, so stills and footage in page content look like one set.
 */
export const MEDIA_FRAME =
  'block h-auto max-w-full rounded-xl border border-border drop-shadow-sm'

/** Matches the italic paragraph used under Markdown images. */
export const MEDIA_CAPTION = 'mt-[1.25em] leading-7 italic'

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

/** Registered in mdx-components.js, so MDX pages use it without an import. */
export function Clip({ src, caption, poster, autoplay }: ClipProps) {
  return (
    <figure className="mx-0 my-6">
      {/* w-full fills the column before metadata loads; the dark background
          letterboxes footage that doesn't match the column's aspect. */}
      <video
        className={`${MEDIA_FRAME} w-full bg-neutral-950`}
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
      {caption && <figcaption className={MEDIA_CAPTION}>{caption}</figcaption>}
    </figure>
  )
}
