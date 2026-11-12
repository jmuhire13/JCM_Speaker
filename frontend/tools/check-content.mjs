// Safety check for the content the owner edits at /admin. It runs before every build
// (`npm run build`) and on its own with `npm run check:content`.
//
// If anything here fails, the build stops, so the live site simply keeps its previous
// version. A broken edit can never reach visitors.
//
// It checks that:
//  1. every data file in src/content/data/ is valid JSON;
//  2. the editor settings (public/admin/config.yml) and the data files agree, field by field,
//     so the editor never silently drops a value or shows a field that goes nowhere;
//  3. every photo or logo the content points to really exists;
//  4. the words that are shown in gold really appear in their headline;
//  5. videos have an ID and sensible start and end times.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') // frontend/
const repo = path.resolve(root, '..')
const problems = []
const fail = (msg) => problems.push(msg)

const config = parse(fs.readFileSync(path.join(root, 'public/admin/config.yml'), 'utf8'))
const files = config.collections.flatMap((c) => c.files || [])

// --- 1 and 2: data files against the editor settings -------------------------------------
const isImage = (f) => f.widget === 'image'
const imagePaths = []

function checkValue(field, value, where) {
  const optional = field.required === false || field.widget === 'hidden'
  if (value === undefined || value === null || value === '') {
    if (!optional && value === undefined) fail(`${where}: missing in the data file`)
    return
  }
  if (field.widget === 'hidden') return
  if (isImage(field)) return void imagePaths.push([where, value])
  if (field.widget === 'object') {
    if (typeof value !== 'object' || Array.isArray(value)) return fail(`${where}: should be a group of fields`)
    return checkFields(field.fields, value, where)
  }
  if (field.widget === 'list') {
    if (!Array.isArray(value)) return fail(`${where}: should be a list`)
    value.forEach((item, i) => {
      if (field.fields) checkFields(field.fields, item, `${where}[${i + 1}]`)
      else if (field.field) checkValue(field.field, item, `${where}[${i + 1}]`)
    })
    return
  }
  if (field.widget === 'number') {
    if (typeof value !== 'number') fail(`${where}: should be a number`)
    return
  }
  if (typeof value !== 'string') return fail(`${where}: should be text`)
  if (field.widget === 'select') {
    const allowed = field.options.map((o) => (typeof o === 'object' ? o.value : o))
    if (!allowed.includes(value)) fail(`${where}: "${value}" is not one of ${allowed.join(', ')}`)
  }
  if (field.pattern && !new RegExp(field.pattern[0]).test(value)) fail(`${where}: "${value}" (${field.pattern[1]})`)
}

function checkFields(fields, data, where) {
  const known = new Set(fields.map((f) => f.name))
  for (const key of Object.keys(data)) {
    if (!known.has(key)) fail(`${where}.${key}: is in the data file but not in the editor settings (the editor would drop it)`)
  }
  for (const f of fields) checkValue(f, data[f.name], `${where}.${f.name}`)
}

const data = {}
for (const f of files) {
  const file = path.join(repo, f.file)
  try {
    data[f.name] = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    fail(`${f.file}: cannot be read as JSON (${e.message})`)
    continue
  }
  checkFields(f.fields, data[f.name], f.name)
}

const onDisk = fs.readdirSync(path.join(root, 'src/content/data')).filter((n) => n.endsWith('.json'))
for (const n of onDisk) {
  if (!files.some((f) => f.file.endsWith(`/${n}`))) fail(`src/content/data/${n}: not listed in the editor settings`)
}

// --- 3: every image exists ----------------------------------------------------------------
for (const [where, p] of imagePaths) {
  if (/^https?:\/\//.test(p)) continue
  if (!p.startsWith('/src/assets/')) fail(`${where}: "${p}" should start with /src/assets/`)
  else if (!fs.existsSync(path.join(root, p))) fail(`${where}: the file ${p} does not exist`)
}

// --- 4: gold words appear in their headline -----------------------------------------------
const has = (text, word) => text.toLowerCase().includes(word.toLowerCase())
const accents = [
  ['speaking.speakingHero', data.speaking?.speakingHero],
  ['beyond.beyondHero', data.beyond?.beyondHero],
  ['trusted.trustedHero', data.trusted?.trustedHero],
  ['connect.connectHero', data.connect?.connectHero],
  ['privacy.privacy', data.privacy?.privacy],
]
for (const [where, h] of accents) {
  if (h && !has(h.headline, h.accent)) fail(`${where}: the gold words "${h.accent}" are not in the headline "${h.headline}"`)
}
const footer = data.site?.footer
if (footer && !has(footer.statement, footer.statementAccent)) {
  fail(`site.footer: the gold words "${footer.statementAccent}" are not in the statement "${footer.statement}"`)
}

// --- 5: videos ----------------------------------------------------------------------------
for (const [i, v] of (data.videos?.videos || []).entries()) {
  const where = `videos.videos[${i + 1}]`
  if (!/^[A-Za-z0-9_-]{11}$/.test(v.id || '')) fail(`${where}: "${v.id}" is not a YouTube video ID (11 letters, digits, - or _)`)
  if (v.start && v.end && v.end <= v.start) fail(`${where}: the stop time must be after the start time`)
}

if (problems.length) {
  console.error(`\nContent check FAILED (${problems.length}):`)
  for (const p of problems) console.error('  - ' + p)
  console.error('\nThe site was not built. Fix the items above (in the editor or in the data files) and try again.\n')
  process.exit(1)
}
console.log(`Content check passed: ${files.length} data files, ${imagePaths.length} images.`)
