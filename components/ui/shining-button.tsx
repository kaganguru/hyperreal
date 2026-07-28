'use client'

import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'
import styles from './shining-button.module.css'

const SHINING_CLASS = `${styles.button} border-[0.5px] border-blue-500 text-[0.75rem] group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-[0.4rem] font-medium text-white transition-all before:absolute before:top-0 before:h-[20rem] before:w-[0.4rem] before:-skew-x-[10deg] before:translate-x-[-8rem] before:bg-white before:blur-[8px] before:transition-all before:duration-[0.8s] hover:brightness-100 hover:before:translate-x-[7rem]`

type ShiningButtonProps = {
  children: React.ReactNode
  /** When set, renders a `next/link` anchor instead of a `<button>`. */
  href?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const ShiningButton = React.forwardRef<
  HTMLButtonElement,
  ShiningButtonProps
>(function ShiningButton({ children, className = '', href, ...props }, ref) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(SHINING_CLASS, 'no-underline', className)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(SHINING_CLASS, className)}
    >
      {children}
    </button>
  )
})
