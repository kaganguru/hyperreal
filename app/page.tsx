import Image from 'next/image'
import { Cards } from '@/components/cards'
import { Clip, MEDIA_CAPTION, MEDIA_FRAME } from '@/components/media'
import { RichCard } from '@/components/rich-card'
import terrain from '@/public/dev-assets/terrain.png'

/**
 * The homepage. Lives outside the docs catch-all so it can be laid out freely;
 * Nextra's Layout still wraps it (navbar, footer, theme switch), and its
 * sidebar/TOC settings come from the `index` entry in content/_meta.jsx.
 */

export const metadata = {
  description:
    'Plug-and-play photorealistic environment shaders for Godot 4.7+.'
}

const products = [
  {
    title: 'Terrain',
    href: '/terrain',
    image: '/dev-assets/terrain1.png',
    body: 'Photorealistic Terrain3D material with colour control that survives painting.'
  },
  {
    title: 'Water',
    href: '/water',
    image: '/dev-assets/posters/water-close-shot.jpg',
    body: 'Surface and underwater in one shader, with a full submarine state out of the box.'
  },
  {
    title: 'Fog & Wisps',
    href: '/fog-and-wisps',
    body: 'Distance fog that matches your actual sky, and billboard cards for smoke, dust and foliage.'
  },
  {
    title: 'Camera',
    href: '/camera',
    body: 'Lens optics, layered shake, and an operator that walks and flies your camera.'
  },
  {
    title: 'About',
    href: '/about',
    body: 'The design principles behind the bundle.'
  },
  {
    title: 'Get Hyperreal',
    href: '/purchase',
    body: 'What ships in the bundle, what it needs, and how to install it.'
  }
]

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 text-slate-700 dark:text-slate-200">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Hyperreal©
      </h1>
      <p className="mt-4 text-lg">
        Photorealistic environment shaders for Godot, built to be cheap enough
        to ship.
      </p>

      {/* Same frame and caption as <Clip> and Markdown images; this page is TSX,
          so mdx-components.js doesn't reach it. */}
      <figure className="mx-0 my-6">
        <Image
          className={MEDIA_FRAME}
          src={terrain}
          alt="Rolling green hills with exposed rock and a distant river, rendered in the Godot editor"
          placeholder="blur"
          priority
        />
        <figcaption className={MEDIA_CAPTION}>Terrain, running in the Godot editor.</figcaption>
      </figure>

      <div className="space-y-4 leading-7">
        <p>
          Godot can look like this. The problem has never been the renderer —
          it's that the material systems around it are built for stylized
          work, and the realistic path means either writing your own shaders or
          paying for effects you can't afford on a mid-range GPU.
        </p>
        <p>
          Hyperreal takes the other route: photorealistic results from
          controls you can actually author, at a cost you can actually ship.
        </p>
      </div>

      <Clip
        src="/dev-assets/water-close-shot.mp4"
        poster="/dev-assets/posters/water-close-shot.jpg"
        caption="Water — one material covering the surface, the depth beneath it, and the view from underwater."
      />

      <h2 className="mt-12 text-2xl font-semibold text-slate-900 dark:text-slate-100">
        What's in it
      </h2>
      <Cards columns={2}>
        {products.slice(0, 4).map(p => (
          <RichCard
            key={p.href}
            image={p.image}
            href={p.href}
            hrefLabel={p.title}
          >
            <span className="font-semibold">{p.title}</span>
            <p className="m-0 text-sm text-neutral-400">{p.body}</p>
          </RichCard>
        ))}
      </Cards>
      <Cards>
        {products.slice(4).map(p => (
          <Cards.Card key={p.href} title={p.title} href={p.href} arrow>
            {p.body}
          </Cards.Card>
        ))}
      </Cards>
    </main>
  )
}
