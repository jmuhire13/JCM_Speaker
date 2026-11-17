import { Helmet } from 'react-helmet-async'
import { pageMeta } from '../content/pages'

// The head tags for one page: title, description, share title and text, and its one official
// address (canonical). Every tag here also exists in the ready-made page file, marked
// data-rh="true", so this REPLACES it instead of adding a second copy (QA D-12, D-13).
export default function PageMeta({ path }) {
  const m = pageMeta[path]
  return (
    <Helmet>
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <meta property="og:title" content={m.shareTitle} />
      <meta property="og:description" content={m.shareDescription} />
      <meta property="og:url" content={m.url} />
      <link rel="canonical" href={m.url} />
    </Helmet>
  )
}
