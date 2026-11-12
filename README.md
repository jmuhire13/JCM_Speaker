# Jean Claude Muhire: speaker website

The website for **Jean Claude Muhire**, a lived experience advocate, community builder and social impact leader. Its single job is to get him invited to speak by NGOs, hospitals and schools. Every page leads to one action: **"Book Jean Claude"**.

Core idea: *Leadership Through Lived Experience*.

Live at **[jcmuhire.com](https://jcmuhire.com)**

## Status

The site is built, live and editable by its owner. It is **not launched yet**: it still asks search engines not to list it, and some photos and wording are waiting for Jean Claude's confirmation. See [Before launch](#before-launch).

## Pages

| Page | Address | Purpose |
| --- | --- | --- |
| Home | `/` | Convince in ten seconds, then route onward |
| Speaking | `/speaking` | What an audience walks away with: topic presentations, audiences, formats |
| My Story | `/my-story` | Why he does this: a timeline, a video, what he brings today |
| Beyond the Stage | `/beyond-the-stage` | The work that continues after the applause |
| Trusted By | `/trusted-by` | Remove risk for the person booking him: organisations and honours |
| Connect | `/connect` | The booking form every "Book Jean Claude" button leads to |
| Privacy policy | `/privacy` | What the site does with a visitor's details |
| Editor | `/admin/` | Where the owner changes the content (sign-in required) |

Each page deliberately has its own look and opening, so no two feel alike.

## Built with

React 19, Vite, Tailwind CSS 4, GSAP (animation), Lenis (smooth scrolling), React Router, React Helmet (page titles). Fonts are self-hosted. The owner's editor is Decap CMS. Hosting is on Cloudflare.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
git pull
cd frontend
npm install
npm run dev      # starts the site at http://localhost:5173
```

**Always `git pull` first.** The owner's editor saves straight to this repository, so it can be ahead of your computer.

Other commands, all run from `frontend/`:

| Command | What it does |
| --- | --- |
| `npm run build` | Prepares photos, checks the content, then builds the site into `frontend/dist/` |
| `npm run check:content` | Checks the content on its own (see below) |
| `npm run preview` | Serves the built site locally, to check it as visitors will see it |
| `npm run lint` | Checks the code for mistakes |

## How the project is organised

```text
frontend/
  src/
    content/
      data/       All the words, links and photo choices, as JSON. The editor saves here.
      *.js        Small files that hand that data to the components.
    components/   Sections and shared parts (navigation, buttons, heroes, forms...)
    pages/        One file per page, assembled from components
    lib/          Small helpers (animations, form sending, image lookup)
    assets/       Photos and logos
    index.css     Colours and fonts as named design tokens
  public/
    admin/        The owner's editor and its settings
    og-image.jpg  The picture shown when a link to the site is shared
    sitemap.xml   The list of pages for search engines
  tools/          Scripts that run before each build (photos, content check)
  wrangler.jsonc  How Cloudflare publishes the site
auth-helper/      A copy of the editor's sign-in helper (deployed separately on Cloudflare)
OWNER_EDITOR.md   How the editor works, for the owner and for developers
```

**The key rule:** words live in `src/content/data/`, never inside components. That is what lets the owner change them without touching the design.

## Changing content

**The owner** uses the editor at `https://jcmuhire.com/admin/`. He signs in with GitHub, changes words, photos, logos, testimonials, projects or the video, and presses Publish. The site updates a few minutes later. [OWNER_EDITOR.md](OWNER_EDITOR.md) explains it in plain language.

**A developer** can edit the JSON files in `frontend/src/content/data/` directly. When you add or rename a field, also update `frontend/public/admin/config.yml`, then run `npm run check:content`.

### The safety check

Before every build, two scripts run:

- `tools/prepare-images.mjs` shrinks any photo wider than 1600 pixels and makes the small copies used by the background photo walls.
- `tools/check-content.mjs` confirms the content files are valid, match the editor's settings, and point only to photos that exist.

If the check fails, the build fails, and **the live site keeps its previous version**. A broken edit never reaches visitors.

## The booking form

The Connect page checks the visitor's answers and sends them to the address set in the `VITE_ENQUIRY_ENDPOINT` build variable (a Formspree form), which emails every enquiry to the owner and keeps a copy. To test sending locally, copy `frontend/.env.example` to `frontend/.env` and fill it in. If sending fails, the form never claims success: it offers an email already filled in with the visitor's answers, so no enquiry is lost.

The address shown on the site, `contact@jcmuhire.com`, forwards to the owner's inbox through Cloudflare Email Routing.

## Deployment

The site is hosted on **Cloudflare** (Workers static assets) and rebuilds automatically on every push to `main`, including every save from the editor.

| Setting | Value |
| --- | --- |
| Root directory | `frontend` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Environment variable | `NODE_VERSION` = `22` |
| Build variable | `VITE_ENQUIRY_ENDPOINT` = the form service address |

`frontend/wrangler.jsonc` tells Cloudflare to publish `dist/` and to serve the main page for any unknown address, so refreshing `/speaking` or any other page works.

The editor's sign-in runs through a separate small Cloudflare Worker, `jcmuhire-editor-auth`. Its code is in `auth-helper/` and its setup is described in [OWNER_EDITOR.md](OWNER_EDITOR.md).

## Before launch

- [x] Connect the booking form to a real inbox and send a test enquiry
- [x] Make `contact@jcmuhire.com` a working address
- [x] Add a privacy policy page and link it from the footer
- [x] Add a share image and a sitemap, and check every page title and description
- [x] Speed pass on images and page loading
- [x] Give the owner an editor
- [ ] Replace the remaining stand-in photos and wording with Jean Claude's own, and confirm consents for photos of other people
- [ ] Have Jean Claude confirm the privacy policy wording
- [ ] Add the one-page PDF summary for bookers to forward
- [ ] Pre-render the pages, so each shared link shows its own title and description
- [ ] Run the full test pass (phones, Safari, accessibility, speed)
- [ ] Remove the two staging protections: the `noindex` tag in `frontend/index.html` and the `Disallow` in `frontend/public/robots.txt`

## Design principles

- **Warm and human:** a cream base with ink and deep-green bands, and gold as an accent. Photography carries the emotion.
- **Fast on a phone first.** Text appears immediately and animation enhances it. Visitors who prefer less motion get a calmer site.
- **Honest content.** Facts about Jean Claude come from his own story or from sources checked on the original page. Nothing is invented, and unverified details are left out.
