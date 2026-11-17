// Runs after "vite build" (npm "postbuild"). Writes one ready-made file per page, each with that
// page's own title, description, share title and text, and official address (canonical, og:url),
// plus 404.html for addresses that are not pages. QA defects D-07, D-12, D-13, D-14.
//
// Why: share apps (WhatsApp, LinkedIn, email previews) and many search engines read only the file
// the server sends and never run the site's code. Before this step every address got the same
// Home file. The visible page is unchanged: the browser still builds it with React.
//
// Cloudflare serves /speaking from speaking.html, and any other address gets 404.html with a real
// "404 not found" status (wrangler.jsonc: not_found_handling "404-page").
//
// Safety checks (the build fails, so the live site keeps its last good version):
//   - every route in src/App.jsx has an entry in src/content/pageMeta.js, and vice versa;
//   - every page is listed in public/sitemap.xml;
//   - each finished file has exactly one title, description, canonical, og:title, og:description
//     and og:url.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildPageMeta, notFound } from '../src/content/pageMeta.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, 'src/content/data', `${name}.json`), 'utf8'))
const data = Object.fromEntries(['story', 'speaking', 'beyond', 'trusted', 'connect', 'privacy'].map((n) => [n, readJson(n)]))
const pages = buildPageMeta(data)

const problems = []
const fail = (msg) => problems.push(msg)

// 1. Routes in App.jsx and pages in pageMeta.js must match.
const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8')
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== '*')
const listed = pages.map((p) => p.path)
for (const r of routes) if (!listed.includes(r)) fail(`Route ${r} in App.jsx has no entry in src/content/pageMeta.js: it would answer "not found" on the live site.`)
for (const p of listed) if (!routes.includes(p)) fail(`pageMeta.js lists ${p}, but App.jsx has no such route.`)

// 2. Every page in the sitemap.
const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8')
for (const p of pages) if (!sitemap.includes(`<loc>${p.url}</loc>`)) fail(`public/sitemap.xml is missing ${p.url}`)

// 3. Write the files.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
// Remove the template's replaceable tags (title and every data-rh tag), then add the page's own.
const stripped = template
  .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/, '')
  .replace(/<(meta|link)\s+data-rh="true"[\s\S]*?\/>\s*/g, '')
  .replace(/<link rel="preload" as="image"[\s\S]*?\/>\s*/g, '') // in case this step runs twice
  .replace(/<link rel="preload" as="font"[\s\S]*?\/>\s*/g, '')
if (!stripped.includes('<meta property="og:type"')) fail('index.html no longer has the og:type tag this script inserts before.')

function headFor(m, { robots = false } = {}) {
  const tags = [
    `<title data-rh="true">${esc(m.title)}</title>`,
    `<meta data-rh="true" name="description" content="${esc(m.description)}" />`,
  ]
  if (m.url) {
    tags.push(
      `<meta data-rh="true" property="og:title" content="${esc(m.shareTitle)}" />`,
      `<meta data-rh="true" property="og:description" content="${esc(m.shareDescription)}" />`,
      `<meta data-rh="true" property="og:url" content="${esc(m.url)}" />`,
      `<link data-rh="true" rel="canonical" href="${esc(m.url)}" />`,
    )
  }
  // The 404 file must never be listed, even after launch removes the staging noindex.
  if (robots && !/name="robots"/.test(stripped)) tags.push('<meta name="robots" content="noindex" />')
  return tags.join('\n    ') + '\n    '
}

// Every page: fetch the headline font (Anton) and the body font (Space Grotesk) straight away,
// in parallel with the site's code, so text does not appear in a stand-in font and then jump
// (QA T-09). Only the "latin" files: the other alphabets load only when a page needs them.
const FONTS = [/^anton-latin-400-normal-[\w-]+\.woff2$/, /^space-grotesk-latin-wght-normal-[\w-]+\.woff2$/]
const fontFiles = FONTS.map((re) => fs.readdirSync(path.join(dist, 'assets')).find((n) => re.test(n)))
if (fontFiles.some((f) => !f)) fail(`Could not find the fonts to preload in dist/assets (${FONTS.join(', ')}).`)
const fontPreload = fontFiles.filter(Boolean).map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />
    `).join('')

const write = (file, html) => fs.writeFileSync(path.join(dist, file), html)
const build = (m, opts) => stripped.replace('<meta property="og:type"', fontPreload + headFor(m, opts) + '<meta property="og:type"')

// Home: ask for the portrait (the biggest thing on the first screen) straight away, before the
// site's code has even loaded. Same choices and `sizes` as the <img> in components/Hero.jsx.
const HERO = 'jc-portrait-studio'
const HERO_SIZES = '(min-width: 1024px) 62vh, 35vh'
function heroPreload() {
  const assets = fs.readdirSync(path.join(dist, 'assets'))
  const list = []
  for (const name of assets) {
    // Built names look like jc-portrait-studio-480-BNdp6Omj.webp (480, 800 and full width 1000)
    if (!name.startsWith(`${HERO}-`)) continue
    const rest = name.slice(HERO.length + 1)
    const sized = rest.match(/^(\d+)-[\w-]+\.webp$/)
    if (sized) list.push([Number(sized[1]), name])
  }
  if (list.length < 2) {
    fail(`Could not find the Home portrait (${HERO}) and its lighter copies in dist/assets to preload.`)
    return ''
  }
  const set = list.sort((x, y) => x[0] - y[0]).map(([w, n]) => `/assets/${n} ${w}w`).join(', ')
  return `<link rel="preload" as="image" imagesrcset="${set}" imagesizes="${HERO_SIZES}" fetchpriority="high" />
    `
}
const homePreload = heroPreload()

for (const p of pages) {
  let html = build(p)
  if (p.path === '/') html = html.replace('<meta property="og:type"', homePreload + '<meta property="og:type"')
  const count = (re) => (html.match(re) || []).length
  const checks = {
    title: count(/<title[ >]/g),
    description: count(/name="description"/g),
    canonical: count(/rel="canonical"/g),
    'og:title': count(/property="og:title"/g),
    'og:description': count(/property="og:description"/g),
    'og:url': count(/property="og:url"/g),
  }
  for (const [k, n] of Object.entries(checks)) if (n !== 1) fail(`${p.file}: ${n} ${k} tags (expected exactly 1)`)
  write(p.file, html)
}
write('404.html', build({ title: notFound.title, description: notFound.description }, { robots: true }))

if (problems.length) {
  console.error('\nPage files check FAILED:\n - ' + problems.join('\n - ') + '\n')
  process.exit(1)
}
console.log(`Page files written: ${pages.map((p) => p.file).join(', ')}, 404.html`)
