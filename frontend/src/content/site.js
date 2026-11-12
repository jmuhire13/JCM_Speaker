// Words for the Home page, the navigation and the footer.
//
// The words themselves live in data/site.json, so the owner can change them from the editor
// at /admin without touching code. This file only hands them to the components.
//
// Notes that still apply to the data (JSON files cannot hold comments):
//  - `site.roles` is the owner's revised roles line (Adjusted_MY_STORY.md, Oct 2026).
//  - `bridge.paragraph` and the fourth theme were written by us from the brief ("added").
//  - `proof.facts` come from the owner's story (content/source/my-story.md): keep them faithful.
//  - PROVISIONAL: the Home personal note, the audience photo descriptions (stock photos),
//    `footer.email`, and the summary PDF (`closing.summaryUrl`, empty until the PDF exists).
//  - `proof.testimonials` is empty on purpose. Add only real, named, permitted ones.
//  - `heroMosaic` is the faint wall of photos behind the Home opening (the owner's own photos).
import data from './data/site.json'
import { tile } from '../lib/media'

export const site = data.site
export const navLinks = data.navLinks
export const hero = data.hero
export const heroMosaic = data.heroMosaic.map(tile)
export const bridge = data.bridge
export const audiences = data.audiences
export const themes = data.themes
export const proof = { ...data.proof, testimonials: data.proof.testimonials || [] }
export const note = data.note
export const closing = { ...data.closing, summaryUrl: data.closing.summaryUrl || null }
export const socials = data.socials
export const footer = data.footer
