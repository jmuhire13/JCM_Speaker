// Words and photos for the My Story page.
//
// Every factual sentence here is copied from the owner's story, saved word for word
// in content/source/my-story.md. Do not rephrase facts. Only trim, never add.
//
// PROVISIONAL (replace when real input arrives):
//  - Photos named real-*.jpg/webp are TEMPORARY copies of public photos of Jean Claude, his
//    charity and his wedding. Rights are not cleared and they are low resolution. Replace each
//    with the owner's original. Every photo is listed in PHOTOS_USED.md.
//  - The remaining photos (2018 mountains, 2019 Paris, 2020 hospital, flight, 2022 Canada)
//    are Unsplash stand-ins: atmosphere, NOT pictures of him.
//  - The "reflections" in `today` are taken from his short bio, not from his own
//    recorded words. Replace them with his words from the planned conversation
//    (what it taught him, what he believes, what he helps audiences see).
//  - `storyHero.portrait` is empty on purpose. Set it to a real portrait.
import children from '../assets/photos/real-ltkr-children.webp'
import mountains from '../assets/photos/story-2018-mountains.jpg'
import paris from '../assets/photos/story-2019-paris.jpg'
import hospital from '../assets/photos/story-2020-hospital.jpg'
import flight from '../assets/photos/story-flight.jpg'
import canada from '../assets/photos/story-2022-canada.jpg'
import wedding from '../assets/photos/real-wedding-2021.jpg'
import awards from '../assets/photos/real-aya-2016.jpg'
import portrait from '../assets/photos/real-portrait.jpg'

// The years that slide behind the opening (taken from the timeline below).
export const ghostYears = ['2012', '2015', '2016', '2018', '2019', '2020', '2021', '2022']

export const storyHero = {
  label: 'My Story',
  // The owner's own title and bio (his feedback file Adjusted_MY_STORY.md, Oct 2026).
  // One line each in the big headline.
  headline: ['Community services worker', 'Non-profit leader', 'Advocate'],
  intro:
    'Jean Claude Muhire is a college-trained community services worker, dedicated non-profit leader, and chronic illness advocate. His work is grounded in two connected areas: Lived Experience, including chronic illness, resilience, belonging, and the realities of navigating systems not always built with care in mind, and Community Action, including advocacy, servant leadership, and the power of turning personal stories into support, awareness, and collective responsibility.',
  // Short version for the search-result and share-preview description (his first sentence).
  description:
    'Jean Claude Muhire is a college-trained community services worker, dedicated non-profit leader, and chronic illness advocate.',
  // TEMPORARY real portrait, public source (Policy Center for the New South, also used on the
  // Love the Kids Rwanda team page). Only 450px wide, so it is soft on large screens.
  // Replace with the full-resolution original. See PHOTOS_USED.md.
  portrait: { src: portrait, alt: 'Portrait of Jean Claude Muhire' },
}

export const timeline = {
  // The owner's own heading (Adjusted_MY_STORY.md, Oct 2026)
  heading: 'How did he get there?',
  items: [
    {
      // Owner's own text (Adjusted_MY_STORY.md). No photo yet: an item with `photo: null`
      // shows a typographic panel instead. Add a real photo here when he supplies one.
      small: 'Born',
      big: '90s',
      title: 'Born and raised',
      place: 'Butare, Rwanda',
      text: 'Jean Claude was born and raised in rural southern Rwanda, where he completed his primary and secondary education. He lost his biological mother at the age of 12 and was raised by his single grandmother during the difficult years following the 1994 Genocide against the Tutsi. Those early experiences brought hardship, but they also helped shape who he is today, strengthening his resilience, compassion, and commitment to serving others.',
      photo: null,
      panelWord: 'Butare',
    },
    {
      small: 'Beginning',
      big: '2012',
      title: 'Humanitarian and social work',
      place: 'Kigali, Rwanda',
      text: 'Jean Claude’s commitment to community service began in 2012, when he served full-time as a volunteer responsible for communication and correspondence at the former Kimisagara Orphanage, which supported more than 250 orphans and vulnerable children in Rwanda. Although he was admitted to the University of Rwanda to study chemistry, his passion for serving others continued to pull him toward community work. During that time, he was also trained as a peer educator and facilitator with Kimisagara Youth Center, contributing to youth-focused efforts to raise awareness and prevent HIV/AIDS and drug abuse in partnership with Rwanda’s Ministry of Youth.',
      photo: null,
      panelWord: 'Kigali',
    },
    {
      small: 'Founded',
      big: '2015',
      title: 'Love the Kids Rwanda',
      place: 'Rwanda',
      text: 'In 2015, Jean Claude founded Love the Kids Rwanda, a registered non-profit organization that provides scholarships for children from vulnerable families to attend school in Rwanda. Over the years, the organization has supported more than 250 young people, including students who have gone on to complete high school and university.',
      photo: children, // TEMPORARY real photo, public source (New Times, 25 Jan 2020). Permission and a sharp original needed. See PHOTOS_USED.md.
      photoPos: 'object-[50%_50%]',
      photoAlt: 'Children supported by Love the Kids Rwanda, posing for a group photo',
    },
    {
      // From public sources (Policy Center for the New South bio). Confirm with the owner.
      small: 'Award',
      big: '2016',
      title: 'Leader of the Year',
      place: null,
      text: 'Winner of the Africa Youth Awards 2016, Leader of the Year. A year earlier, he was the International Winner of the 2015 Global Dialogues contest.',
      photo: awards, // TEMPORARY real photo, public source (Inyarwanda, 3 Jan 2017). Replace with an original. See PHOTOS_USED.md.
      photoPos: 'object-[50%_30%]',
      photoAlt: 'Jean Claude Muhire, in a photo published with the 2016 Africa Youth Awards news',
    },
    {
      small: 'Fellowship',
      big: '2018',
      title: 'Mandela Washington Fellow',
      place: 'North Carolina, USA',
      text: 'His selection as a Mandela Washington Fellow through the U.S. Department of State’s Young African Leaders Initiative at Appalachian State University in North Carolina in 2018.',
      photo: mountains,
      photoPos: 'object-[50%_50%]',
      photoAlt: 'Forested mountain ridges in morning light (provisional stock photo)',
    },
    {
      small: 'Prize',
      big: '2019',
      title: 'Human Rights Prize',
      place: 'Paris',
      text: 'A laureate of the French Government’s Human Rights Prize in Paris in 2019.',
      photo: paris,
      photoPos: 'object-[35%_50%]',
      photoAlt: 'The Eiffel Tower at dusk between dark buildings (provisional stock photo)',
    },
    {
      small: 'Diagnosis',
      big: '2020',
      title: 'Final-stage kidney disease',
      place: null,
      text: 'In 2020, Jean Claude learned that he had reached the final stage of chronic kidney disease. Doctors told him that a kidney transplant was his only path forward, but the surgery could not be performed in his home country. With limited access to specialized care, his condition posed a serious risk to his life.',
      photo: hospital,
      photoPos: 'object-[50%_50%]',
      photoAlt: 'A quiet hospital corridor ending in a window (provisional stock photo)',
    },
    {
      // The year (2020) follows from New Times, 15 Aug 2021, which reports the surgery
      // as already done by then. The story itself gives only the day and month.
      small: 'Transplant · 2020',
      big: 'NOV 30',
      title: 'A kidney from Marie Reine',
      place: 'Egypt',
      text: 'Marie Reine, his girlfriend at the time and now his wife, agreed to donate one of her kidneys. With the support of a close friend, Jean Claude launched a GoFundMe campaign that raised more than $20,000 in less than five days. He and Marie Reine then traveled to Egypt, where, on November 30, he received a successful transplant.',
      photo: flight,
      photoPos: 'object-[50%_72%]',
      photoAlt: 'An aeroplane wing seen through a window at sunrise (provisional stock photo)',
    },
    {
      // From public sources (New Times, 15 Aug 2021). Confirm with the owner.
      small: 'Married',
      big: 'AUG 12',
      title: 'A wedding',
      place: null,
      text: 'On August 12, 2021, Jean Claude and Marie Reine held their civil wedding.',
      photo: wedding, // TEMPORARY real photo, public source (New Times, 15 Aug 2021, credit "Courtesy"). Ask the couple for the original. See PHOTOS_USED.md.
      photoPos: 'object-[50%_30%]',
      photoAlt: 'Jean Claude Muhire and Marie Reine at their civil wedding in August 2021',
    },
    {
      small: 'Moved',
      big: '2022',
      title: 'A new home',
      place: 'Canada',
      text: 'In 2022, Jean Claude immigrated to Canada, where he now lives with his wife and daughter.',
      photo: canada,
      photoPos: 'object-[50%_68%]',
      photoAlt: 'Autumn maple leaves over a quiet street corner (provisional stock photo)',
    },
  ],
}

export const today = {
  heading: 'Today',
  text: 'Today, he speaks to audiences about what it means to lead from lived experience, build meaningful community, and transform hardship into purpose. He brings a deep human perspective to conversations on leadership, health equity, community support, resilience, and purpose, reminding audiences that no one should have to face their hardest moments alone and that support from others can help people survive, heal, and move forward.',
  // From public sources, read on the original pages. Confirm with the owner before launch.
  //  - Policy Center for the New South bio: founder, author, film producer, certified peer
  //    educator, gender equality advocate and mentor, honorary citizen of Boone.
  //    That bio calls him "Executive President" of Love the Kids Rwanda, but the
  //    organisation's own website now lists him as Immediate Past President, so we say
  //    only "Founder".
  //  - Queen's Young Leaders 2016 runner-up: listed by name under Rwanda on
  //    opportunitiesforafricans.com (9 Dec 2015). The owner's team says it is him: confirm.
  also: [
    'Founder of Love the Kids Rwanda',
    'Published author of I Leave You Today',
    'Producer of the film Liza',
    'Certified peer educator',
    'Gender equality advocate and mentor',
    'Queen’s Young Leaders Award 2016, Runner-Up',
    'Honorary citizen of Boone, North Carolina',
  ],
  // provisional: drawn from his bio, to be replaced by his own words
  reflections: [
    {
      label: 'What it taught him',
      text: 'The power of turning personal stories into action.',
    },
    {
      label: 'What he believes',
      text: 'No one should have to face their hardest moments alone.',
    },
    {
      label: 'What he helps audiences see differently',
      text: 'What it means to lead from lived experience, build meaningful community, and transform hardship into purpose.',
    },
  ],
}
