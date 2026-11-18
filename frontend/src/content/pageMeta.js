// The title, description and address of every page: what search engines and share previews
// (WhatsApp, LinkedIn, email...) show. ONE list, read in two places so they never disagree:
//   - each page, through components/PageMeta.jsx (while the site runs in the browser);
//   - tools/prerender-heads.mjs, which writes one ready-made file per page at build time
//     (share apps and search engines read only that file, not the running site).
// It takes the raw content data (the JSON files in content/data) and imports nothing else,
// so it runs both in the browser and in Node during the build.
//
// ADDING A PAGE: add its route in App.jsx AND an entry below (and a line in public/sitemap.xml).
// The build fails if a route in App.jsx has no entry here, because the live site answers
// "not found" for any address that has no ready-made file.

export const SITE_URL = 'https://jcmuhire.com'
export const NAME = 'Jean Claude Muhire'

// Words not stored in the content files (the editor cannot change these).
const home = {
  title: `${NAME} | Lived Experience Advocate, Community Builder, Social Impact Leader`,
  description:
    'Jean Claude Muhire shares stories that foster belonging, strengthen connections, and inspire action, for NGOs, hospitals and schools.',
  shareTitle: `${NAME} | Leadership through lived experience`,
  shareDescription:
    'Sharing stories that foster belonging, strengthen connections, and inspire action. For NGOs, hospitals and schools.',
}

export const notFound = {
  title: `Page not found | ${NAME}`,
  description: 'This address does not match a page on jcmuhire.com.',
  label: 'Error 404',
  headline: 'Page not found',
  intro: 'The address may be mistyped, or the page has moved. These are the pages on the site:',
  homeLabel: 'Home',
}

// `data` holds the parsed JSON files: { story, speaking, beyond, trusted, connect, privacy }.
export function buildPageMeta(data) {
  const page = (path, file, label, description, shareTitle) => ({
    path,
    file,
    title: `${label} | ${NAME}`,
    description,
    shareTitle: shareTitle || `${label} | ${NAME}`,
    shareDescription: description,
    url: SITE_URL + path,
  })

  return [
    { path: '/', file: 'index.html', ...home, url: `${SITE_URL}/` },
    page('/speaking', 'speaking.html', 'Speaking', data.speaking.speakingHero.intro),
    page('/my-story', 'my-story.html', 'My Story', data.story.storyHero.description),
    page('/beyond-the-stage', 'beyond-the-stage.html', 'Beyond the Stage', data.beyond.beyondHero.intro),
    page('/trusted-by', 'trusted-by.html', 'Trusted By', data.trusted.trustedHero.intro),
    page('/connect', 'connect.html', 'Connect', data.connect.connectHero.intro, `Book ${NAME}`),
    page('/privacy', 'privacy.html', 'Privacy policy', data.privacy.privacy.description),
  ]
}
