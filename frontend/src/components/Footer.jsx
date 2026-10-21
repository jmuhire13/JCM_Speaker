import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Accent from '../lib/Accent'
import Button from './Button'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import { footer, navLinks, site } from '../content/site'

const marqueeText = `${footer.marquee} · `.repeat(6)
const year = new Date().getFullYear()

const label = 'font-body text-on-ink-label text-[13px] tracking-[0.14em] uppercase'

// The closing statement and the Book button, a slim moving band, then logo, links and contact,
// and a bottom bar. All words are in content/site.js.
export default function Footer() {
  return (
    <footer className="bg-ink text-on-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 pb-14 md:px-10 md:pt-32 md:pb-20">
        <h2 className="font-hero text-cream max-w-5xl text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-balance uppercase">
          <Accent text={footer.statement} word={footer.statementAccent} />
        </h2>
        <div className="mt-10">
          <Button to={site.inviteTo} variant="cream">
            {site.inviteLabel}
          </Button>
        </div>
      </div>

      {/* Slowly scrolling band. Decorative, hidden from screen readers. */}
      <div aria-hidden="true" className="bg-ember text-ink overflow-hidden py-2.5 whitespace-nowrap">
        <div className="marquee-track flex w-max">
          <p className="font-display pr-6 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-none tracking-[0.12em] uppercase">
            {marqueeText}
          </p>
          <p className="font-display pr-6 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-none tracking-[0.12em] uppercase">
            {marqueeText}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1.2fr] md:gap-10 md:px-10 md:py-20">
        <div>
          <Link to="/" aria-label={`${site.name}, home`} className="text-cream inline-block">
            <Logo className="[&_.logo-mark]:size-12" />
          </Link>
          <p className="text-on-ink-label mt-5 max-w-xs leading-relaxed">{site.roles}</p>
        </div>

        <nav aria-label="Footer">
          <p className={label}>{footer.exploreLabel}</p>
          <ul className="mt-5 space-y-3 text-lg">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-cream transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={label}>{footer.contactLabel}</p>
          <p className="mt-5 text-lg">
            <a href={`mailto:${footer.email}`} className="hover:text-cream transition-colors">
              {footer.email}
            </a>
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="text-on-ink-label mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm md:px-10">
          <p>
            © {year} {site.name}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-cream inline-flex items-center gap-2 transition-colors"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
