'use client'

import { ShiningButton } from '@/components/ui/shining-button'
import { openItchCheckout } from './itch'

export function PurchaseButton() {
  // Fixed label by design; swap for `itch.cta` to mirror itch's own
  // wording ("Pre-order", "Buy now", "Download").
  return <ShiningButton onClick={openItchCheckout}>Purchase ↗</ShiningButton>
}
