// All words on the Home hero and the navigation live here, not inside components,
// so they can be edited later (by hand, a CMS or an admin panel) without touching the design.

export const site = {
  name: 'Jean Claude Muhire',
  roles: 'Speaker · Storyteller · Community Builder',
  inviteLabel: 'Invite Jean Claude to speak',
  inviteTo: '/connect',
}

export const navLinks = [
  { label: 'Speaking', to: '/speaking' },
  { label: 'My Story', to: '/my-story' },
  { label: 'Beyond the Stage', to: '/beyond-the-stage' },
  { label: 'Trusted By', to: '/trusted-by' },
]

export const bridge = {
  label: 'Why marketing, for hospitals, schools and NGOs',
  lines: [
    'Belonging is built by what',
    'an organisation says,',
    'and by what it does',
    'again and again.',
  ],
  // Written by us from the client's brief (marked "added" in the brief).
  paragraph:
    'Jean Claude began in marketing and branding, which is the work of shaping how an organisation speaks and what it repeatedly does. He now brings that to hospitals, schools and NGOs, where people need to feel they belong before they can give their best.',
}

export const audiences = {
  label: 'Who he speaks to',
  items: [
    {
      name: 'NGOs',
      text: 'For teams who came for the mission and are tired. Purpose, retention, and holding a team together.',
      // provisional: stock photo
      photoAlt: 'A team talking together around a table (provisional stock photo)',
    },
    {
      name: 'Hospitals',
      text: 'For frontline staff under pressure. Burnout, morale, and remembering why they chose this work.',
      photoAlt: 'Two healthcare workers in scrubs and masks (provisional stock photo)',
    },
    {
      name: 'Schools',
      text: 'For staff and students. Culture, belonging, and a school where everyone has a place.',
      photoAlt: 'A student reading aloud in a full classroom (provisional stock photo)',
    },
  ],
}

export const themes = {
  heading: 'What your people walk away with',
  items: [
    {
      title: 'Lived experience',
      text: 'Your people hear a real story, and see their own in it.',
    },
    {
      title: 'Leadership',
      text: 'Leaders leave with a clearer sense of how they show up when it is hard.',
    },
    {
      title: 'Belonging',
      text: 'Teams leave knowing what makes people feel they belong, and what quietly pushes them out.',
    },
    {
      // added by us, tied to his core idea (marked "added" in the brief)
      title: 'Turning stories into action',
      text: 'The room leaves with one thing to do on Monday.',
    },
  ],
}

export const proof = {
  label: 'Track record',
  heading: 'Trusted by',
  intro: 'Organisations that have hosted Jean Claude.',
  // Taken from the owner's story (content/source/my-story.md). Keep the wording faithful.
  facts: [
    {
      year: '2015',
      text: 'Founded Love the Kids Rwanda, a registered non-profit that provides scholarships for children from vulnerable families to attend school in Rwanda.',
    },
    {
      year: '2018',
      text: "Selected as a Mandela Washington Fellow through the U.S. Department of State's Young African Leaders Initiative, at Appalachian State University in North Carolina.",
    },
    {
      year: '2019',
      text: "Laureate of the French Government's Human Rights Prize in Paris.",
    },
  ],
  // provisional: no testimonials yet. Add real, named, permitted ones as
  // { text, name, role, organisation }. The first one is shown; none shows nothing.
  testimonials: [],
}

export const note = {
  // provisional: placeholder wording from the brief, to be confirmed by the owner
  text: "Jean Claude doesn't teach leadership from a textbook. He speaks from what he has lived.",
  linkLabel: 'Read his story',
  to: '/my-story',
}

export const closing = {
  heading: 'Bring the story to your stage.',
  text: 'For NGOs, hospitals and schools who want their teams to feel they belong.',
  // provisional: the one-page summary PDF does not exist yet. Set summaryUrl when it does.
  summaryUrl: null,
  summaryLabel: 'Sharing this with your director? Download the one-page summary',
}

export const footer = {
  // provisional: placeholder address, to be confirmed by the owner
  email: 'hello@jcmuhire.com',
  site: 'jcmuhire.com',
  marquee: 'Leadership Through Lived Experience',
}

export const hero = {
  headline: "Leadership isn't something you learn. It's something you",
  highlight: 'live.',
  subtitle:
    'Sharing stories that foster belonging, strengthen connections, and inspire action.',
  secondaryLabel: 'See what an audience walks away with',
  secondaryTo: '/speaking',
  // TEMPORARY: public portrait (see PHOTOS_USED.md). Ideally replace with a sharp stage photo.
  photoAlt: 'Portrait of Jean Claude Muhire',
}
