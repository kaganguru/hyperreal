'use client'

import data from './itch-data.json'

/**
 * Store data is fetched at build time by `scripts/fetch-itch.mjs`.
 *
 * itch's own api.js (`Itch.getGameData`) is deliberately not used: it XHRs
 * `https://<user>.itch.io/<game>/data.json`, which now returns a Cloudflare
 * challenge (403) with no CORS headers, so it never resolves in the browser —
 * and it parses the response inside an XHR listener, so the failure isn't even
 * catchable. Run `npm run itch:refresh` to pull new prices.
 */
export const itch = data

const POPUP_WIDTH = 680
const POPUP_HEIGHT = 400

/**
 * Opens itch's checkout in a popup, matching what `Itch.attachBuyButton` does.
 * Falls back to the store page if the popup is blocked.
 */
export function openItchCheckout() {
  const top = Math.max(0, (window.screen.height - POPUP_HEIGHT) / 2)
  const left = Math.max(0, (window.screen.width - POPUP_WIDTH) / 2)

  const popup = window.open(
    itch.purchaseUrl,
    'itch_purchase',
    `scrollbars=1,resizable=no,width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left}`
  )

  if (popup) popup.focus()
  else window.open(itch.gameUrl, '_blank', 'noopener,noreferrer')
}
