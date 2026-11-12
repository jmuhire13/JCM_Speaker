// Words and photos for the Beyond the Stage page. The data lives in data/beyond.json (edited
// at /admin).
//
// Facts come from sources read on the original pages:
//  - Love the Kids Rwanda: the owner's story and the charity's own site
//    (https://lovethekidsrwanda.org/our-work, three programmes, used as tags).
//  - The film Liza: New Times, 23 May 2015 and 5 Jan 2017.
// Do not add claims we have not read in a source.
//
// Notes that still apply to the data (JSON files cannot hold comments):
//  - Order, titles and descriptions are the owner's own wording (Adjusted_BEYOND_THE_STAGE.md,
//    Oct 2026). The titles are long on purpose.
//  - Project 03 leaves out his sentence describing the plot of Liza in detail (it names child
//    abuse; a booker may be put off). Restore it if the owner wants it.
//  - PROVISIONAL: project 01 uses a stock photo. The children photo needs the charity's
//    permission. The intro line is written by us.
import data from './data/beyond.json'
import { media } from '../lib/media'

export const beyondHero = data.beyondHero

// Numbered in the order they are listed.
export const projects = data.projects.map((p, i) => ({
  number: String(i + 1).padStart(2, '0'),
  ...p,
  tags: p.tags || [],
  link: p.link?.href ? p.link : null,
  photo: media(p.photo),
}))

export const alsoBeyond = data.alsoBeyond || []
export const impact = data.impact
