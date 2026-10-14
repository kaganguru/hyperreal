import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Clip, MEDIA_FRAME } from '@/components/media'
import { cn } from '@/lib/utils'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  // Wraps the theme's img so click-to-zoom and the static-import sizing/blur
  // still apply; only the frame is ours.
  img: props => (
    <docsComponents.img {...props} className={cn(MEDIA_FRAME, props.className)} />
  ),
  Clip,
  ...components
})
