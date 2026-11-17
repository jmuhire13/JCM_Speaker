// Turns an image path stored in the content data (src/content/data/*.json) into the real
// address of the file on the built site.
//
// The data files store paths such as "/src/assets/photos/story-wedding.jpg", because that is
// what the owner's editor (/admin) writes when he picks or uploads a photo. Vite gives every
// image a new address when it builds the site, so we look the path up here.
const files = import.meta.glob('../assets/{photos,logos}/**/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  import: 'default',
})

const keyFor = (path) => `..${path.slice('/src'.length)}`

// The address of an image, or null when there is none (or it is missing).
export function media(path) {
  if (!path) return null
  if (/^https?:\/\//.test(path)) return path
  const url = files[keyFor(path)]
  if (!url) console.warn(`Image not found: ${path}`)
  return url || null
}

// The small copy of a photo used in the background photo walls (assets/photos/tiles/, made by
// tools/prepare-images.mjs before every build). Falls back to the full photo.
export function tile(path) {
  if (!path) return null
  const name = path.split('/').pop().replace(/\.(jpeg|png|webp)$/i, '.jpg')
  return files[`../assets/photos/tiles/${name}`] || media(path)
}

// Lighter copies of each photo (assets/photos/sizes/, made by tools/prepare-images.mjs before
// every build): 480, 800, 1200 pixels wide and the photo's own width, all in WebP. `srcSet(path)`
// lists them, so the browser downloads only the size the screen needs (QA D-15).
// Use it with a `sizes` attribute that says how wide the picture is shown.
const sized = import.meta.glob('../assets/photos/sizes/*.webp', { eager: true, import: 'default' })
const fullWidths =
  import.meta.glob('../assets/photos/sizes/widths.json', { eager: true, import: 'default' })[
    '../assets/photos/sizes/widths.json'
  ] || {}

export function srcSet(path) {
  if (!path || /^https?:\/\//.test(path)) return undefined
  const base = path.split('/').pop().replace(/\.[^.]+$/, '')
  const parts = []
  for (const [key, url] of Object.entries(sized)) {
    const m = key.match(/\/([^/]+)-(\d+)\.webp$/)
    if (m && m[1] === base) parts.push([Number(m[2]), url])
  }
  // Older builds had no full-width WebP copy: then offer the original file as the largest choice.
  const full = media(path)
  const w = fullWidths[base]
  if (full && w && !parts.some(([pw]) => pw === w)) parts.push([w, full])
  if (parts.length < 2) return undefined
  return parts
    .sort((a, b) => a[0] - b[0])
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ')
}
