// Words for the Trusted By page. The data lives in data/trusted.json (edited at /admin).
// The logos are in content/logos.js.
//
// Recognitions were each read on an original page:
//  - 2015 Global Dialogues, Africa Youth Awards 2016, Mandela Washington Fellow 2018, honorary
//    citizen of Boone NC: Policy Center for the New South bio (the 2016 award also in New Times,
//    5 Jan 2017, and Inyarwanda, 3 Jan 2017).
//  - French Government Human Rights Prize 2019: the owner's own story.
//  - Queen's Young Leaders 2016 Runner-Up: listed by name under Rwanda on
//    opportunitiesforafricans.com (9 Dec 2015). The owner's team says it is him: confirm.
//
// PROVISIONAL: the headline and intro are our wording. Testimonials come from
// `proof.testimonials` (content/site.js): none until real, named, permitted ones exist.
import data from './data/trusted.json'
import logoData from './data/logos.json'

export const trustedHero = data.trustedHero
export const hosted = data.hosted

// A one-line "what he did" per organisation, keyed by logo name. It comes from the optional
// `note` on each logo, and shows only once the owner has confirmed and written one.
export const hostedNotes = Object.fromEntries(
  logoData.logos.filter((l) => l.note).map((l) => [l.name, l.note]),
)

export const recognitions = data.recognitions
export const testimonialsHeading = data.testimonialsHeading
