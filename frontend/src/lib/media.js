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
