// Organisations and programmes shown in the logo walls (Home, and the Trusted By page).
// The list lives in data/logos.json (edited at /admin); the files are in src/assets/logos/.
//
// Notes that still apply to the data (JSON files cannot hold comments):
//  - Only the first 12 were confirmed by the owner as having hosted him. CONFIRM how each of the
//    others is connected (host, honour, partner, funder) and that he is happy to show it. That
//    is why the page says "hosted, worked with, or honoured".
//  - To fix before launch: the UNESCO file carries a "cleanpng" watermark. Low-resolution files
//    (ask for better ones): Mandela Washington Fellowship, Africa Youth Awards, Policy Center
//    for the New South, Front Line Defenders, Global Youth Connect, Rocena Kidney Foundation.
//  - Logos only with permission.
import data from './data/logos.json'
import { media } from '../lib/media'

export const logos = data.logos.map(({ name, src }) => ({ name, src: media(src) }))
