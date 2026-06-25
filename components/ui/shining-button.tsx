'use client'

import * as React from 'react'
import styles from './shining-button.module.css'

type ShiningButtonProps = {
  children: React.ReactNode
}

export function ShiningButton({ children }: ShiningButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} border-[0.5px] border-blue-500 text-[0.75rem] group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-[0.4rem] font-medium text-white transition-all before:absolute before:top-0 before:h-[20rem] before:w-[0.4rem] before:-skew-x-[10deg] before:translate-x-[-8rem] before:bg-white before:blur-[8px] before:transition-all before:duration-[0.8s] hover:brightness-100 hover:before:translate-x-[7rem]`}
    >
      {children}
    </button>
  )
}
