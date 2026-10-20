import { Link } from 'react-router-dom'
import { footer, navLinks, site } from '../content/site'
import SocialLinks from './SocialLinks'

const marqueeText = `${footer.marquee} · `.repeat(6)
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink text-on-ink">
      {/* Slowly scrolling band. Decorative, hidden from screen readers. */}
      <div aria-hidden="true" className="bg-ember text-ink overflow-hidden py-3 whitespace-nowrap">
        <div className="marquee-track flex w-max">
          <p className="font-display pr-6 text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide uppercase">
            {marqueeText}
          </p>
          <p className="font-display pr-6 text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide uppercase">
            {marqueeText}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-cream text-4xl tracking-wide">{site.name}</p>
          <p className="text-on-ink-label mt-2">{site.roles}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-cream transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2">
          <p>
            <a href={`mailto:${footer.email}`} className="hover:text-cream transition-colors">
              {footer.email}
            </a>
          </p>
          <p className="text-on-ink-label">{footer.site}</p>
          <div className="pt-3">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="text-on-ink-label border-t border-white/10 px-5 py-6 text-sm md:px-10">
        <div className="mx-auto max-w-[1400px]">© {year} {site.name}</div>
      </div>
    </footer>
  )
}
