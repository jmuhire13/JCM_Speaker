// Words and photos for the Speaking page. The data lives in data/speaking.json (edited at /admin).
//
// Notes that still apply to the data (JSON files cannot hold comments):
//  - The four topic presentations (titles, descriptions, "Audiences leave with" lines, order)
//    are the owner's own wording (Adjusted_SPEAKING.md, Oct 2026). Keep them faithful.
//  - PROVISIONAL: formats come from the brief; the intro line is written by us.
//  - `speakingMosaic` is the wall of photo tiles behind the opening: eight photos, two per column.
import data from './data/speaking.json'
import { tile } from '../lib/media'

export const speakingHero = data.speakingHero
export const speakingMosaic = data.speakingMosaic.map(tile)
export const audienceNeeds = data.audienceNeeds
export const talksSection = data.talksSection

// Numbered in the order they are listed.
export const talks = data.presentations.map((p, i) => ({
  number: String(i + 1).padStart(2, '0'),
  ...p,
}))

export const formats = data.formats
