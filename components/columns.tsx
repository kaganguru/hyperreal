import type { ReactNode } from 'react'

// Full class names, so Tailwind finds them when scanning this file.
//
// A top-level grid stacks until its own width reaches a container breakpoint
// (`@xl` = 36rem, `@3xl` = 48rem). A grid nested inside a Columns.Item never
// stacks: it always splits its cell, so text + two nested images come out
// 2:1:1. The `in-[[data-columns-item]]` variant matches when an ancestor is a
// Columns.Item; `!` lets it beat the breakpoint classes.
const COUNT = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 @xl:grid-cols-2 in-[[data-columns-item]]:grid-cols-2!',
  3: 'grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 in-[[data-columns-item]]:grid-cols-3!'
}

type ColumnsProps = {
  children: ReactNode
  count?: keyof typeof COUNT
}

/**
 * Lays its children out in columns, stacking on narrow viewports. Import it
 * in the MDX page: `import { Columns } from '@/components/columns'`.
 *
 * Each top-level Markdown block is one cell. To keep an image and its caption
 * in the same cell, wrap them in `<Columns.Item>`. Leave blank lines around
 * Markdown inside JSX, or MDX won't parse it:
 *
 *   <Columns count={2}>
 *
 *   <Columns.Item>
 *
 *   ![…](/dev-assets/terrain1.png)
 *
 *   _Caption_
 *
 *   </Columns.Item>
 *
 *   </Columns>
 */
function ColumnsGrid({ children, count = 2 }: ColumnsProps) {
  // The outer div is the container the breakpoints measure; a grid can't
  // query its own width. `*:mt-0!` cancels the theme's top margin on
  // paragraphs so cells line up; it needs `!` because the theme's selector is
  // more specific.
  return (
    <div className="@container my-6">
      <div className={`grid items-start gap-4 *:mt-0! ${COUNT[count]}`}>
        {children}
      </div>
    </div>
  )
}

/**
 * One cell: groups several Markdown blocks so they share a column. Drops the
 * top margin of its first block, so a nested Columns lines up with the cells
 * beside it.
 */
function Item({ children }: { children: ReactNode }) {
  return (
    <div data-columns-item className="*:first:mt-0!">
      {children}
    </div>
  )
}

export const Columns = Object.assign(ColumnsGrid, { Item })
