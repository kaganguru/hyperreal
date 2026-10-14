import { ItchWidget } from '@/components/itch-widget'

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
    items: {
      terrain: {
        title: 'Terrain',
        href: '/terrain'
      },
      water: {
        title: 'Water',
        href: '/water'
      },
      'fog-and-wisps': {
        title: 'Fog & Wisps',
        href: '/fog-and-wisps'
      }
    }
  }
}
