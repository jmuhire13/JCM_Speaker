// Words and photos for the Speaking page.
//
// PROVISIONAL (replace when the owner confirms):
//  - Talk titles and formats come from the brief and are marked provisional there.
//  - The one-line description under each talk is borrowed from the matching theme in
//    content/site.js (`themes`), as our stand-in, not the owner's own wording.
//  - The intro line is written by us (marked "added" in the brief).
//  - The tiles behind the opening are stock stand-ins (see PHOTOS_USED.md). Replace with
//    photos of him speaking to real audiences when they exist.
import { themes } from './site'
import ngo from '../assets/photos/audience-ngo.jpg'
import hospital from '../assets/photos/audience-hospital.jpg'
import school from '../assets/photos/audience-school.jpg'
import seated from '../assets/photos/audience-seated.jpg'
import support from '../assets/photos/beyond-support.jpg'
import mountains from '../assets/photos/story-2018-mountains.jpg'
import paris from '../assets/photos/story-2019-paris.jpg'
import canada from '../assets/photos/story-2022-canada.jpg'

export const speakingHero = {
  label: 'Speaking',
  headline: 'What your people walk away with',
  accent: 'walk away',
  intro:
    'Every talk starts from lived experience, Jean Claude’s own, and is shaped to your room.',
}

// Eight tiles: two per column of the mosaic.
export const speakingMosaic = [ngo, hospital, school, seated, support, mountains, paris, canada]

export const audienceNeeds = {
  heading: 'What each audience is facing',
}

export const talksSection = {
  heading: 'Talks',
  intro: 'Each one starts from a real story, then leads somewhere your people can act on.',
}

const titles = ['Lived, Not Learned', 'Leadership You Live', 'Where Belonging Begins', 'From Story to Action']

// Same order as `themes.items`
export const talks = titles.map((title, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title,
  text: themes.items[i].text,
}))

export const formats = {
  label: 'Formats',
  items: ['Keynote', 'Workshop', 'Fireside conversation', 'Panel', 'In person or online'],
  note: 'Length is agreed with the organiser.',
}
