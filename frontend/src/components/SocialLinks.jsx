import { siLinkedin, siX, siFacebook, siInstagram } from 'simple-icons'
import { socials } from '../content/site'

const icons = {
  linkedin: siLinkedin,
  x: siX,
  facebook: siFacebook,
  instagram: siInstagram,
}

// Round icon links to Jean Claude's accounts (content/site.js `socials`).
// Colours follow the band they sit on, so pass `className` for light or dark backgrounds.
export default function SocialLinks({ className = 'text-on-ink hover:text-cream border-white/25' }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex size-11 items-center justify-center rounded-full border transition-colors ${className}`}
          >
            <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
              <path d={icons[s.icon].path} />
            </svg>
            <span className="sr-only">{s.name} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
