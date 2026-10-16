// Words for the Trusted By page.
//
// The logos live in content/logos.js (organisations the owner confirmed have hosted him).
// Recognitions below were each read on an original page:
//  - 2015 Global Dialogues, Africa Youth Awards 2016, Mandela Washington Fellow 2018,
//    honorary citizen of Boone NC: Policy Center for the New South bio. The Africa Youth
//    Awards win is also in New Times (5 Jan 2017) and Inyarwanda (3 Jan 2017).
//  - French Government Human Rights Prize 2019: the owner's own story.
//  - Queen's Young Leaders 2016 Runner-Up: listed by name under Rwanda on
//    opportunitiesforafricans.com (9 Dec 2015). The owner's team says it is him: confirm.
//
// PROVISIONAL (replace when real input arrives):
//  - The headline and intro are our wording.
//  - `hostedNotes`: a one-line description of what he did for each organisation. We do not
//    have these yet, so none is shown. Add them keyed by the exact logo name.
//  - Testimonials: see `proof.testimonials` in content/site.js. None until real, named,
//    permitted ones exist.

export const trustedHero = {
  label: 'Trusted By',
  headline: 'The rooms he has been invited into.',
  accent: 'rooms',
  intro: 'Organisations that have hosted, worked with, or honoured Jean Claude, and the honours his work has earned.',
}

export const hosted = {
  heading: 'Worked with',
  intro: 'Hosts, partners and programmes that have welcomed him, worked with him, or honoured his work.',
}

// Example: { 'African Union': 'Keynote speaker, 2022' } (only once the owner confirms it)
export const hostedNotes = {}

export const recognitions = {
  heading: 'Recognised for the work',
  items: [
    // Newest first
    { year: '2019', text: 'Laureate, French Government’s Human Rights Prize, Paris' },
    { year: '2018', text: 'Mandela Washington Fellow, Appalachian State University' },
    { year: '2016', text: 'Leader of the Year, Africa Youth Awards' },
    { year: '2016', text: 'Runner-Up, Queen’s Young Leaders Award' },
    { year: '2015', text: 'International Winner, Global Dialogues contest' },
    { year: 'Honorary', text: 'Citizen of Boone, North Carolina' },
  ],
}

export const testimonialsHeading = 'What organisers say'
