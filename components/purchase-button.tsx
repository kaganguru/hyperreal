'use client'

import { ShiningButton } from '@/components/ui/shining-button'
import { itch, openItchCheckout } from './itch'

/**
 * Navbar call to action. It deliberately does NOT open itch's checkout popup:
 * the pitch (what's in the bundle, requirements, licensing) lives on
 * /get-started, which is where the checkout is actually triggered.
 */
export function PurchaseButton() {
  return <ShiningButton href="/get-started">Get Hyperreal</ShiningButton>
}

/** The real checkout trigger, used on /get-started. */
export function CheckoutButton() {
  return (
    <ShiningButton onClick={openItchCheckout} className="text-[0.875rem] px-6 py-2">
      {itch.cta} — {itch.price} ↗
    </ShiningButton>
  )
}
