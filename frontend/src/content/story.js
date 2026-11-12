// Words and photos for the My Story page. The data lives in data/story.json (edited at /admin).
//
// Every factual sentence is copied from the owner's story, saved word for word in
// content/source/my-story.md, or from his feedback file (Adjusted_MY_STORY.md, Oct 2026).
// Do not rephrase facts. Only trim, never add.
//
// Notes that still apply to the data (JSON files cannot hold comments):
//  - PROVISIONAL photos: the 2016 award photo is a TEMPORARY public photo (Inyarwanda, 3 Jan
//    2017); the Nov 30 plane wing and the 2022 Canada photo are stock stand-ins. Every photo is
//    listed in PHOTOS_USED.md.
//  - The childhood photo (90s) is only 330px wide: ask for a larger scan.
//  - A timeline item with no photo shows a green panel with `panelWord`.
//  - "2016 Leader of the Year" and the "AUG 12" wedding come from public sources (Policy Center
//    for the New South bio; New Times, 15 Aug 2021): confirm with the owner. The wedding photo
//    file says 2020 while the card says 12 Aug 2021: confirm the date.
//  - `today.also`: from the Policy Center bio. We say only "Founder" of Love the Kids Rwanda
//    (its site lists him as Immediate Past President). Queen's Young Leaders 2016: confirm.
//  - PROVISIONAL: `today.reflections` are drawn from his bio, not his own recorded words.
import data from './data/story.json'
import { media } from '../lib/media'

// The years that slide behind the opening.
export const ghostYears = data.ghostYears

export const storyHero = {
  ...data.storyHero,
  portrait: data.storyHero.portrait?.src
    ? { ...data.storyHero.portrait, src: media(data.storyHero.portrait.src) }
    : null,
}

export const timeline = {
  ...data.timeline,
  items: data.timeline.items.map((item) => ({
    ...item,
    place: item.place || null,
    photo: media(item.photo),
  })),
}

export const today = data.today
