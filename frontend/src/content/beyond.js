// Words and photos for the Beyond the Stage page.
//
// Facts come from sources read on the original pages:
//  - Love the Kids Rwanda: the owner's story (content/source/my-story.md) and the charity's
//    own site, https://lovethekidsrwanda.org/our-work (three programmes).
//  - The film Liza: New Times, 23 May 2015 and 5 Jan 2017.
//  - Advocacy: the owner's story and short bio.
// Do not add claims we have not read in a source.
//
// PROVISIONAL (replace when real input arrives):
//  - The Liza and advocacy photos are Unsplash stand-ins. The Love the Kids Rwanda photo is a
//    TEMPORARY public photo of the charity's children (permission needed). See PHOTOS_USED.md.
//  - The intro line is written by us (marked "added" in the brief).
import children from '../assets/photos/real-ltkr-children.webp'
import film from '../assets/photos/beyond-film.jpg'
import support from '../assets/photos/beyond-support.jpg'

export const beyondHero = {
  label: 'Beyond the Stage',
  headline: 'His work doesn’t end when the applause does.',
  accent: 'applause',
  // added by us
  intro:
    'A talk is where the story is told. The work after it is where belonging gets built: community, conversation and action.',
}

// Order, titles and descriptions are the owner's own wording (his feedback file,
// Adjusted_BEYOND_THE_STAGE.md, Oct 2026). The titles are long on purpose: keep them as he wrote them.
export const projects = [
  {
    number: '01',
    label: 'Launched by Jean Claude in 2025 · Ottawa',
    title: 'Supporting newcomers, immigrants, and refugees living with chronic illnesses in Canada',
    text: 'Drawing on his experience as a newcomer and as someone with a history of chronic kidney disease, Jean Claude launched Sounds From a New Home (SFNH), a community-based health and social services initiative that supports newcomers, immigrants, and refugees living with chronic illness in Ottawa through storytelling, counselling, peer education, and community events.',
    tags: [],
    link: null,
    photo: support, // provisional stock photo
    photoPos: 'object-[50%_45%]',
    photoAlt: 'Two people holding each other’s hands on a table (provisional stock photo)',
  },
  {
    number: '02',
    label: 'Founded by Jean Claude in 2015',
    title: 'Keeping vulnerable children in schools through Love the Kids Rwanda',
    text: 'In 2015, Jean Claude founded Love the Kids Rwanda, a registered non-profit, non-governmental organization that provides scholarships to children from vulnerable families to attend school in Rwanda. Over the years, the organization has supported more than 250 young people, including students who have gone on to complete high school and university.',
    // The charity's own three programmes (https://lovethekidsrwanda.org/our-work)
    tags: ['Education & Child Development', 'Community Transformation', 'Family Strengthening'],
    link: { href: 'https://lovethekidsrwanda.org/', label: 'Visit Love the Kids Rwanda' },
    photo: children, // TEMPORARY real photo (New Times, 25 Jan 2020). Permission needed.
    photoPos: 'object-[50%_50%]',
    photoAlt: 'Children supported by Love the Kids Rwanda, posing for a group photo',
  },
  {
    number: '03',
    label: 'Film 2015 · Short story 2017',
    title: 'Sharing stories that confront gender based violence in Rwanda',
    // Owner's wording, except that we left out the sentence describing the plot of Liza in
    // detail (it names child abuse; a booker may be put off). Restore if the owner wants it.
    text: 'Jean Claude is a storyteller who uses writing and film to speak out against gender-based violence. His film Liza, released in October 2015, and his short story I Leave You Today, published by Huza Press in July 2017, brought public attention to violence against girls and women in Rwanda. Liza follows a young girl who is orphaned at age 12 and goes to live in an orphanage. I Leave You Today explores domestic abuse from a woman’s perspective. The Global Dialogues Trust recognized both works.',
    tags: ['Film: Liza', 'Short story: I Leave You Today', 'Huza Press'],
    link: null,
    photo: film, // provisional stock photo
    photoPos: 'object-[50%_50%]',
    photoAlt: 'A film clapperboard lying on a surface (provisional stock photo)',
  },
]

// Nothing extra now: I Leave You Today is part of project 03.
export const alsoBeyond = []

export const impact = [
  { big: '2015', small: 'Love the Kids Rwanda founded' },
  { big: '250+', small: 'Young people supported through scholarships' },
  { big: '2025', small: 'Sounds From a New Home launched in Ottawa' },
]
