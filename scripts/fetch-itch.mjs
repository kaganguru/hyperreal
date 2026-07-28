/**
 * Pulls the live store data for the itch.io bundle at build time.
 *
 * Why scrape the embed page instead of using itch's own api.js?
 * `Itch.getGameData` XHRs `https://<user>.itch.io/<game>/data.json`, which now
 * sits behind a Cloudflare managed challenge (403) and sends no CORS headers —
 * so it can never succeed from the browser. The embed page on itch.io itself is
 * unchallenged and carries the same fields, so we read it here and bake the
 * result into the bundle.
 *
 * Network failures are non-fatal: the previously committed JSON is kept so
 * offline and CI builds still work.
 *
 * Only the store text (title, price, CTA) is pulled. The cover is `public/
 * itch-cover.png`, owned by this repo — it is deliberately not scraped, so the
 * widget's artwork never depends on itch's markup or CDN.
 */

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const EMBED_ID = '4712768'
const EMBED_URL = `https://itch.io/embed/${EMBED_ID}`
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATA_OUT = join(root, 'components', 'itch-data.json')

const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x?([0-9a-f]+);/gi, (_, c) =>
      String.fromCodePoint(parseInt(c, /^x/i.test(_.slice(2)) ? 16 : 10))
    )
    .trim()

const pick = (html, re) => {
  const m = html.match(re)
  return m ? decode(m[1]) : null
}

async function main() {
  const res = await fetch(EMBED_URL, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`embed page returned ${res.status}`)
  const html = await res.text()

  const gameUrl = pick(html, /<a[^>]*href="(https:\/\/[^"]+\.itch\.io\/[^"/]+)"/)
  const purchaseUrl = pick(html, /href="([^"]*\/purchase\?popup=1)"/)
  const title = pick(html, /class="game_title"[^>]*>\s*<a[^>]*>([^<]+)</)
  const author = pick(html, /class="author_row"[\s\S]*?<a[^>]*>([^<]+)</)
  const tagline = pick(html, /class="author_row"[\s\S]*?<h3[^>]*>([^<]+)</)
  const price = pick(html, /class="dollars"[^>]*>([^<]+)</)
  const priceNote = pick(html, /class="dollars"[^>]*>[^<]*<\/span>\s*<span class="sub">([^<]*)</)
  const cta = pick(html, /class="button purchase_popup_btn"[^>]*>([^<]+)</)
  const originalPrice = pick(html, /class="original_price"[^>]*>([^<]+)</)
  const saleRate = pick(html, /class="sale_tag"[^>]*>([^<]+)</)

  if (!title || !price) throw new Error('could not parse title/price from embed')

  const data = {
    title,
    author,
    tagline,
    price,
    priceNote: priceNote || null,
    originalPrice,
    saleRate,
    cta: cta || 'Purchase',
    gameUrl,
    purchaseUrl,
    fetchedAt: new Date().toISOString()
  }

  await writeFile(DATA_OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(`[itch] ${data.title} — ${data.price} (${data.cta})`)
}

main().catch(err => {
  console.warn(
    `[itch] could not refresh store data (${err.message}); keeping committed copy`
  )
})
