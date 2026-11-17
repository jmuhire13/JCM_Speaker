// Build-time rendering (QA T-21). `npm run build` makes a second, "server" copy of the site in
// dist-ssr/; tools/prerender-heads.mjs calls render() for every page and writes the resulting
// HTML into that page's file, so phones can paint the page before any JavaScript has loaded.
// The browser then takes over the same HTML (hydrateRoot in main.jsx) instead of rebuilding it.
//
// Keep the tree the same as in main.jsx (StrictMode > router > App). HelmetProvider is left out
// on purpose: head tags are written into the page file by the build, not rendered here.
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

async function pass(url) {
  // prerender (unlike renderToString) waits for the pages that are loaded on demand (lazy).
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // React normally splits large blocks into a placeholder plus a later piece moved in by a
    // script (to paint sooner while streaming). A ready-made file has nothing to stream, so keep
    // everything in place: the page then reads correctly even without JavaScript.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}

// Two passes: the first loads the on-demand pages; in the second they are ready, so React writes
// the content directly in place. With one pass it writes a placeholder and a small script that
// moves the content in later, which leaves the page empty for visitors without JavaScript.
export async function render(url) {
  await pass(url)
  return pass(url)
}
