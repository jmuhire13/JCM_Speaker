import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
