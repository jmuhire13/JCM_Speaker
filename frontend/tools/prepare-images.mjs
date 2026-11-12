// Gets photos ready before every build (`npm run build`, also on Cloudflare).
//
//  1. Shrinks any photo in src/assets/photos/ that is wider than 1600 pixels. The owner can
//     upload a photo straight from a phone or camera in the editor; without this, one such
//     photo (often 3 to 10 MB) would slow the whole site down.
//  2. Makes the small copies (480 x 600) used by the two background photo walls, in
//     src/assets/photos/tiles/, for every photo the walls list in the content data.
//
// It only ever rewrites a file that is too large, and only creates a tile that is missing or
// older than its photo, so running it again changes nothing.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') // frontend/
const photos = path.join(root, 'src/assets/photos')
const tiles = path.join(photos, 'tiles')
const MAX_WIDTH = 1600
const kB = (n) => `${Math.round(n / 1024)} kB`

// --- 1: shrink oversized photos -------------------------------------------------------------
for (const name of fs.readdirSync(photos)) {
  if (!/\.(jpe?g|png|webp)$/i.test(name)) continue
  const file = path.join(photos, name)
  // Read the file into memory first. Handing sharp the file itself keeps it open, and Windows
  // then refuses to let us write the smaller version over it.
  const original = fs.readFileSync(file)
  const before = original.length
  const { width } = await sharp(original).metadata()
  if (!width || width <= MAX_WIDTH) continue
  // .rotate() with no angle applies the phone's "which way is up" note, then drops it.
  const resized = sharp(original).rotate().resize({ width: MAX_WIDTH })
  const buffer = /\.png$/i.test(name)
    ? await resized.png({ compressionLevel: 9 }).toBuffer()
    : /\.webp$/i.test(name)
      ? await resized.webp({ quality: 80 }).toBuffer()
      : await resized.jpeg({ quality: 80, mozjpeg: true }).toBuffer()
  fs.writeFileSync(file, buffer)
  console.log(`Shrunk ${name}: ${width}px wide, ${kB(before)} -> ${MAX_WIDTH}px, ${kB(buffer.length)}`)
}

// --- 2: tiles for the photo walls -----------------------------------------------------------
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, 'src/content/data', name), 'utf8'))
const wall = [...(read('site.json').heroMosaic || []), ...(read('speaking.json').speakingMosaic || [])]
fs.mkdirSync(tiles, { recursive: true })
for (const p of new Set(wall)) {
  const source = path.join(root, p)
  if (!fs.existsSync(source)) continue // check-content.mjs reports missing photos
  const out = path.join(tiles, path.basename(p).replace(/\.(jpeg|png|webp)$/i, '.jpg'))
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(source).mtimeMs) continue
  await sharp(fs.readFileSync(source))
    .rotate()
    .resize(480, 600, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 60, mozjpeg: true })
    .toFile(out)
  console.log(`Made wall tile ${path.basename(out)} (${kB(fs.statSync(out).size)})`)
}
