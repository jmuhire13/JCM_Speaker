import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { navLinks, site } from '../content/site'
import { notFound } from '../content/pages'

// Shown for any address that is not a page (QA D-07). On the live site Cloudflare also answers
// with a real "404 not found" status (dist/404.html, made by tools/prerender-heads.mjs), so
// search engines never list a wrong address as a page.
export default function NotFound() {
  return (
    <section className="bg-cream mx-auto min-h-svh max-w-[1400px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
      <Helmet>
        <title>{notFound.title}</title>
        <meta name="description" content={notFound.description} />
      </Helmet>
      <p className="font-body text-muted text-[13px] tracking-[0.14em] uppercase">{notFound.label}</p>
      <h1 className="font-hero text-ink mt-6 text-[clamp(3rem,9vw,8rem)] leading-[0.95] uppercase">
        {notFound.headline}
      </h1>
      <p className="text-soft mt-8 max-w-xl text-lg leading-relaxed md:text-xl">{notFound.intro}</p>
      <ul className="mt-8 flex flex-wrap gap-x-8 text-lg">
        {[{ to: '/', label: notFound.homeLabel }, ...navLinks].map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-ink decoration-gold-deep inline-block py-2 underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button to={site.inviteTo}>{site.inviteLabel}</Button>
      </div>
    </section>
  )
}
