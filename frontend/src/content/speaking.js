// Words and photos for the Speaking page.
//
// PROVISIONAL (replace when the owner confirms):
//  - Formats come from the brief and are still provisional. The four topic presentations
//    are now the owner's own wording (see below).
//  - The intro line is written by us (marked "added" in the brief).
//  - The tiles behind the opening are now the owner's own photos (TEDx, a lectern, the Atlantic
//    Dialogues, the 2019 prize, events). Swap in newer stage photos when he has them.
import tedx from '../assets/photos/speaking-tedx.jpg'
import speech from '../assets/photos/speaking-speech.jpg'
import adel from '../assets/photos/speaking-adel-morocco.jpg'
import prize from '../assets/photos/story-2019-prize.jpg'
import library from '../assets/photos/beyond-library.jpg'
import boone from '../assets/photos/story-boone-conversation.jpg'
import casual from '../assets/photos/jc-portrait-casual.jpg'
import appalachian from '../assets/photos/story-2018-appalachian.jpg'

export const speakingHero = {
  label: 'Speaking',
  headline: 'What your people walk away with',
  accent: 'walk away',
  intro:
    'Every presentation starts from lived experience, Jean Claude’s own, and is shaped to your room.',
}

// Eight tiles: two per column of the mosaic.
export const speakingMosaic = [tedx, speech, adel, prize, library, boone, casual, appalachian]

export const audienceNeeds = {
  heading: 'What each audience is facing',
}

export const talksSection = {
  heading: 'Topic presentations',
  intro: 'Each one starts from a real story, then leads somewhere your people can act on.',
}

// Titles, descriptions and "leave with" lines are the owner's own wording (his feedback file,
// Adjusted_SPEAKING.md, Oct 2026). Order is his. Keep faithful when editing.
const presentations = [
  {
    title: 'More than Medicine',
    text: 'Diagnosed with chronic kidney disease in 2019 while living in Rwanda, Jean Claude received a kidney transplant in Egypt in 2020 and immigrated to Canada in 2022. In 2023, he returned to dialysis after his transplanted kidney failed. Through his journey as a kidney patient, transplant recipient, and newcomer, he shows that good care depends on more than treatment: it also depends on dignity, communication, and community.',
    leave: 'Audiences leave with a clearer understanding of the human side of chronic illness and of what patients need beyond the clinic.',
  },
  {
    title: 'Why Belonging Matters?',
    text: 'Arriving in Canada with hope of rebuilding his life, Jean Claude had to navigate a new healthcare system while adapting to life as a newcomer. He explains how belonging shapes whether people feel safe seeking care, speaking up, and staying connected to support.',
    leave: 'Audiences leave with practical ways to make their organizations and communities more welcoming to newcomers, immigrants, and refugees.',
  },
  {
    title: 'Leadership Through Lived Experience',
    text: 'From founding Love the Kids Rwanda in 2015 to using film and writing against gender-based violence, to living with kidney disease in a new country, Jean Claude has led through some of life’s hardest transitions. He shares how lived experience builds credibility, empathy, and resilience in leaders.',
    leave: 'Audiences leave with ways to turn their own challenges into purpose and to lead others with greater understanding.',
  },
  {
    title: 'From Personal Story to Community Action',
    text: 'Jean Claude’s experience led him to launch Sounds From a New Home in 2025, an Ottawa-based initiative that uses storytelling, peer education, counselling, and community events to support newcomers living with chronic illness. He shows how a personal story can grow into a program and how partnerships across healthcare, the arts, and community groups multiply its impact.',
    leave: 'Audiences leave with a plan for moving from sharing a story to creating change.',
  },
]

export const talks = presentations.map((p, i) => ({
  number: String(i + 1).padStart(2, '0'),
  ...p,
}))

export const formats = {
  label: 'Formats',
  items: ['Keynote', 'Workshop', 'Fireside conversation', 'Panel', 'In person or online'],
  note: 'Length is agreed with the organiser.',
}
