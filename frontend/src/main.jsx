import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import '@fontsource/bebas-neue'
import '@fontsource/anton'
import '@fontsource-variable/space-grotesk'
import './index.css'
import App from './App.jsx'

// The page file arrives with its own title, description, share tags and canonical address, for
// share apps and search engines that never run this code (tools/prerender-heads.mjs). They are
// marked data-rh="true". Once the site runs, each page renders the same tags itself through React
// (components/PageMeta.jsx), so remove the file's copies first or every tag appears twice (QA D-12).
document.head.querySelectorAll('[data-rh="true"]').forEach((el) => el.remove())

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// On the live site each page file already contains the page, rendered at build time
// (src/entry-server.jsx, QA T-21): take it over without rebuilding it. In development the
// container is empty, so build it from scratch.
const root = document.getElementById('root')
if (!root.hasChildNodes()) createRoot(root).render(app)
else {
  // The page is already on screen and its links already work. Starting the code is a big job
  // for a slow phone, so first let the opening's pictures (the Home portrait above all) load
  // and paint, then take over. Capped at 1.5 s so the menu and buttons are never kept waiting
  // long (QA T-03, Home LCP render delay).
  const pics = [...root.querySelectorAll('.opening img')].filter((i) => i.loading !== 'lazy').slice(0, 4)
  const painted = Promise.all(pics.map((i) => i.decode().catch(() => {})))
  const cap = new Promise((r) => setTimeout(r, 1500))
  Promise.race([painted, cap]).then(() =>
    requestAnimationFrame(() => setTimeout(() => hydrateRoot(root, app), 0)),
  )
}
