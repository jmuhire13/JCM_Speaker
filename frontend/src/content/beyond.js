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

export const projects = [
  {
    number: '01',
    label: 'Founded by Jean Claude in 2015',
    title: 'Love the Kids Rwanda',
    text: 'Love the Kids Rwanda is a registered non-profit organization that provides scholarships for children from vulnerable families to attend school in Rwanda. Over the years, the organization has supported hundreds of young people, including students who have gone on to complete high school and university.',
    // The charity's own three programmes (https://lovethekidsrwanda.org/our-work)
    tags: ['Education & Child Development', 'Community Transformation', 'Family Strengthening'],
    link: { href: 'https://lovethekidsrwanda.org/', label: 'Visit Love the Kids Rwanda' },
    photo: children, // TEMPORARY real photo (New Times, 25 Jan 2020). Permission needed.
    photoPos: 'object-[50%_50%]',
    photoAlt: 'Children supported by Love the Kids Rwanda, posing for a group photo',
  },
  {
    number: '02',
    label: '2015',
    title: 'Liza',
    text: 'A film about a girl who loses both parents at 12 and goes to live in an orphanage. Jean Claude made it for the 2015 Global Dialogues contest, where he was among 20 Rwandans selected. He is best known for it, a film on violence against young girls and women.',
    tags: [],
    link: null,
    photo: film, // provisional stock photo
    photoPos: 'object-[50%_50%]',
    photoAlt: 'A film clapperboard lying on a surface (provisional stock photo)',
  },
  {
    number: '03',
    label: 'Ongoing',
    title: 'Living with chronic illness',
    text: 'Jean Claude is an advocate for people living with chronic illness. He reminds audiences that no one should have to face their hardest moments alone, and that support from others can help people survive, heal, and move forward.',
    tags: [],
    link: null,
    photo: support, // provisional stock photo
    photoPos: 'object-[50%_45%]',
    photoAlt: 'Two people holding each other’s hands on a table (provisional stock photo)',
  },
]

// From his public bio only (Policy Center for the New South). Confirm with the owner.
export const alsoBeyond = ['Author of I Leave You Today']

export const impact = [
  { big: '2015', small: 'Love the Kids Rwanda founded' },
  { big: '3', small: 'Programmes: education, community and family' },
  { big: 'Hundreds', small: 'Of young people supported' },
]
