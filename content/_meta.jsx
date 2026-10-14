import { ItchWidget } from '@/components/itch-widget'
import { RichCard } from '@/components/rich-card'

export default {
  index: {
    title: 'Overview',
    // theme: { // This page is a regular tsx page app/page.tsx
    //   breadcrumb: false,
    //   timestamp: false,
    //   pagination: false,
    //   toc: false,
    //   sidebar: false,
    //   layout: 'full',
    // }
  },


  '###': {
    type: 'separator',
    title: 'Products'
    
  },


  terrain: {
    title: 'Terrain',
    theme: {
      breadcrumb: false,
      toc: false,
    }
  },
  water: {
    title: 'Water',
    theme: {
      breadcrumb: false,
      toc: false,
    }
  },
  'fog-and-wisps': {
    title: 'Fog & Wisps',
    theme: {
      breadcrumb: false,
      toc: false,
    }
  },
  camera: {
    title: 'Camera',
    theme: {
      breadcrumb: false,
      toc: false,
    }
  },


  about: {
    title: 'About my mission, pricing, and AI',
    type: 'page',
    theme: {
      sidebar: true,
      typesetting: 'article',
    }
  },
  purchase: {
    title: 'Get Hyperreal',
    display: 'hidden'
  },

  '--purchase': {
    type: 'separator',
    title: <ItchWidget />,
    
  },
  
  Products: {
    title: 'Products',
    type: 'menu',
    // Nextra renders each item as a link around its title, so the cards get no
    // href of their own — `hoverable` gives them the hover effect instead.
    items: {
      terrain: {
        title: (
          <RichCard size="compact" hoverable image="/dev-assets/terrain1.png">
            <span className="font-semibold">Terrain</span>
          </RichCard>
        ),
        href: '/terrain'
      },
      water: {
        title: (
          <RichCard
            size="compact"
            hoverable
            image="/dev-assets/posters/water-close-shot.jpg"
          >
            <span className="font-semibold">Water</span>
          </RichCard>
        ),
        href: '/water'
      },
      'fog-and-wisps': {
        title: (
          <RichCard size="compact" hoverable>
            <span className="font-semibold">Fog & Wisps</span>
          </RichCard>
        ),
        href: '/fog-and-wisps'
      }
    }
  }
}
