# The owner's editor

Jean Claude can change the words, photos, logos, testimonials, projects and the video on
jcmuhire.com himself, at **https://jcmuhire.com/admin/**, without a developer.

## Part 1: for Jean Claude

### Changing something

1. Open **jcmuhire.com/admin/** and sign in with your GitHub account.
2. Pick the page you want (for example "Speaking page" or "Organisation logos").
3. Change the words, or click a photo to replace it. You can upload a photo straight from your
   phone or camera: the site makes it smaller by itself.
4. Press **Publish**, then **Publish now**.
5. Wait about two to five minutes, then refresh jcmuhire.com to see the change.

### Good to know

- **Lists** (presentations, projects, logos, timeline moments, testimonials) have an **Add**
  button at the bottom, a bin to remove an item, and can be dragged to reorder.
- **"Words shown in gold"** must be copied exactly from the headline above them.
- **"Photo focus"** says which part of a photo stays in view when it is cropped: across, then
  down. `50% 50%` is the centre; `50% 20%` keeps the top (useful for faces).
- **Testimonials:** only real quotes from a named person who agreed to be quoted.
- **Logos and videos:** only show what you have permission to show.
- **Privacy policy page:** everything on it must stay true.
- **If your change does not appear after ten minutes,** the site found a problem with it (a
  missing photo, for example) and kept the previous version, so visitors never see a broken
  page. Tell your developer; nothing is lost.
- **Every change is saved in the site's history,** so any mistake can be undone.

### What the editor cannot change

The design itself, the booking form's behaviour, the large portrait on the Home opening, the
three "Who he speaks to" photos, and the picture shown when a link is shared. Ask your developer
for those.

## Part 2: for the developer

### How it works

- The editor is [Decap CMS](https://decapcms.org) (open source, formerly Netlify CMS), pinned to
  an exact version in `frontend/public/admin/index.html`.
- All editable content is in `frontend/src/content/data/*.json`. The files in
  `frontend/src/content/*.js` only hand that data to the components.
- The editor's fields are described in `frontend/public/admin/config.yml`. It must match the
  data files, and `npm run check:content` proves that it does.
- Saving in the editor makes a commit on `main`. Cloudflare then rebuilds the site.
- Before every build, `tools/prepare-images.mjs` shrinks large photos and makes the photo-wall
  tiles, and `tools/check-content.mjs` checks the content. If the check fails, the build fails
  and the live site keeps its previous version.

### One-time setup (not done yet)

1. **GitHub account for Jean Claude.** He creates a free account; add him as a collaborator
   with write access on `jmuhire13/JCM_Speaker`.
2. **Sign-in helper.** GitHub needs a small server to complete a sign-in. Deploy
   [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) (MIT licence) as a Cloudflare
   Worker in the account that hosts the site, and note its address.
3. **GitHub OAuth app.** On GitHub: Settings, Developer settings, OAuth Apps, New. Homepage
   `https://jcmuhire.com`, callback `<worker address>/callback`. Copy the Client ID and create
   a Client Secret.
4. **Worker variables.** On the Worker: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (as a
   secret), and `ALLOWED_DOMAINS` = `jcmuhire.com, www.jcmuhire.com`.
5. **Point the editor at it.** In `frontend/public/admin/config.yml`, replace the `base_url`
   placeholder with the Worker address. Commit and push.
6. **Test on the live site:** open `jcmuhire.com/admin/`, sign in, change one word, publish,
   and confirm the site rebuilds and shows it.

Never put the Client Secret in a file. It lives only in the Worker's settings.

### Testing the editor on your own computer (no sign-in needed)

From the repository root, in two terminals:

    npx decap-server
    cd frontend && npm run dev

Then open `http://localhost:5173/admin/index.html`. Saving there writes straight to the files on
your computer, so check `git diff` and undo anything you do not want to keep.

### When you add or rename a content field

Change the data file, the matching `content/*.js` file if needed, and
`public/admin/config.yml`, then run `npm run check:content`.
