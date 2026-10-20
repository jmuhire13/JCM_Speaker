# Jean Claude Muhire: speaker website

The website for **Jean Claude Muhire**, a speaker, storyteller and community builder. Its single job is to get him invited to speak by NGOs, hospitals and schools. Every page leads to one action: **"Book Jean Claude"**.

Core idea: *Leadership Through Lived Experience*.

## Status

Work in progress. All six pages are built and the site is deployed for review. Many photos and some text are **temporary placeholders** until Jean Claude supplies his own, and the contact form is **not yet connected** to an inbox. See [Before launch](#before-launch).

## Pages

| Page | Address | Purpose |
| --- | --- | --- |
| Home | `/` | Convince in ten seconds, then route onward |
| Speaking | `/speaking` | What an audience walks away with: topic presentations, audiences, formats |
| My Story | `/my-story` | Why he does this: a timeline, videos, what he brings today |
| Beyond the Stage | `/beyond-the-stage` | The work that continues after the applause |
| Trusted By | `/trusted-by` | Remove risk for the person booking him: organisations and honours |
| Connect | `/connect` | The enquiry form every "Invite" button leads to |

Each page deliberately has its own look and opening, so no two feel alike.

## Built with

React 19, Vite, Tailwind CSS 4, GSAP (animation), Lenis (smooth scrolling), React Router, React Helmet (page titles and share previews). Fonts are self-hosted. Hosting is on Cloudflare.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
cd frontend
npm install
npm run dev      # starts the site at http://localhost:5173
```

Other commands, all run from `frontend/`:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the finished site into `frontend/dist/` and compresses images |
| `npm run preview` | Serves the built site locally, to check it as visitors will see it |
| `npm run lint` | Checks the code for mistakes |

## How the project is organised

```text
frontend/
  src/
    content/      All the words, links and data (one file per area). Edit text here.
    components/   Sections and shared parts (navigation, buttons, heroes, forms...)
    pages/        One file per page, assembled from components
    lib/          Small helpers (animations, form sending, media queries)
    assets/       Photos and logos
    index.css     Colours and fonts as named design tokens
  public/         Files served as they are (robots.txt, favicon)
  wrangler.jsonc  How Cloudflare publishes the site
```

**The key rule:** words live in `src/content/`, never inside components. That means text, links, testimonials and logos can change without touching the design, and a content editor or admin screen can be added later without a redesign.

## Changing content

- **Text:** edit the matching file in `frontend/src/content/` (for example `site.js` for Home, `story.js` for My Story, `speaking.js` for Speaking).
- **Photos:** put the image in `frontend/src/assets/photos/`, then point to it from the content file. Keep photos reasonably small: the site is built for phones and slow connections.
- **Logos:** add the file to `frontend/src/assets/logos/` and one line to `src/content/logos.js`.
- **Testimonials:** add a real, named, permitted entry to `proof.testimonials` in `src/content/site.js`. The section appears automatically, and stays hidden while the list is empty.
- Anything still a stand-in is marked `provisional` or `TEMPORARY` in a code comment next to it.

## The contact form

The Connect page checks the visitor's answers and sends them to the address set in `VITE_ENQUIRY_ENDPOINT`. Copy `frontend/.env.example` to `frontend/.env` and fill it in to connect a form service. **With no address set, the form never claims to have sent anything.** It offers an email, already filled in with the visitor's answers, so no enquiry is lost.

## Deployment

The site is hosted on **Cloudflare** (Workers static assets) and rebuilds automatically on every push to `main`.

| Setting | Value |
| --- | --- |
| Root directory | `frontend` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Environment variable | `NODE_VERSION` = `22` |

`frontend/wrangler.jsonc` tells Cloudflare to publish `dist/` and to serve the main page for any unknown address, so refreshing `/speaking` or any other page works.

While the site is in review it asks search engines not to list it (the `noindex` tag in `frontend/index.html` and `frontend/public/robots.txt`).

## Before launch

- [ ] Replace temporary photos and placeholder text with Jean Claude's own
- [ ] Connect the contact form to a real inbox on the `jcmuhire.com` domain, and send one real test enquiry
- [ ] Add a privacy policy page and link it from the footer
- [ ] Remove the three staging protections: the `noindex` tag, the `Disallow` in `robots.txt`, and any access restriction on the host
- [ ] Add social share images and check every page title and description
- [ ] Run a speed and accessibility check
- [ ] Point `jcmuhire.com` at the site and confirm that refreshing every page works

## Design principles

- **Warm and human:** a cream base with ink and deep-green bands, and ember as an accent. Photography carries the emotion.
- **Fast on a phone first.** Text appears immediately and animation enhances it. Visitors who prefer less motion get a calmer site.
- **Honest content.** Facts about Jean Claude come from his own story or from sources checked on the original page. Nothing is invented, and unverified details are left out.
