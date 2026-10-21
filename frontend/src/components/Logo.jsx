import { site } from '../content/site'

// The Jean Claude Muhire mark: an arch (the shape of the portrait frame used on the site) holding
// a J and a C, with one ember dot. Drawn as plain paths, so it needs no font and matches
// public/favicon.svg. The colour follows the text colour (currentColor), so it works on cream
// and on ink. Pass `showName={false}` for the mark alone.
export default function Logo({ showName = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 56 64"
        className="logo-mark h-9 w-auto shrink-0"
        fill="none"
        role={showName ? undefined : 'img'}
        aria-label={showName ? undefined : site.name}
        aria-hidden={showName ? 'true' : undefined}
      >
        <path d="M4 62V28C4 12 14 2 28 2s24 10 24 26v34" stroke="currentColor" strokeWidth="3" />
        <path
          d="M24 26v14c0 6-3 10-7 10-3 0-5-1.5-6-4"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M45 31c-1-3.5-3.5-5-6.5-5-4.5 0-7 3.5-7 12s2.5 12 7 12c3 0 5.5-1.5 6.5-5"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle cx="28" cy="57" r="2.2" fill="#e4572e" />
      </svg>
      {showName && (
        <span className="font-display text-2xl tracking-wide md:text-3xl">{site.name}</span>
      )}
    </span>
  )
}
