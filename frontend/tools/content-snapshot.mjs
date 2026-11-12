// Dumps everything the site's content files export, as one JSON document.
// Used as a safety check when the content files are restructured: take a snapshot before,
// take one after, and compare. Run from frontend/:  node tools/content-snapshot.mjs out.json
import { createServer } from 'vite'
import fs from 'node:fs'

const modules = ['site', 'story', 'speaking', 'beyond', 'trusted', 'logos', 'connect', 'videos', 'privacy']
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const out = {}
for (const m of modules) {
  const mod = await server.ssrLoadModule(`/src/content/${m}.js`)
  out[m] = JSON.parse(JSON.stringify({ ...mod }))
}
await server.close()
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 2))
console.log('snapshot written:', process.argv[2], Object.entries(out).map(([k, v]) => `${k}(${Object.keys(v).length})`).join(' '))
