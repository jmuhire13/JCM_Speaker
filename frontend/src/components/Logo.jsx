import { site } from '../content/site'

// The Jean Claude Muhire mark: a bold "JC" in ember on a solid square, the same picture as the
// browser-tab icon (public/favicon.svg). Drawn as plain paths, so it needs no font. The square
// takes the text colour (currentColor), so it is ink on cream and cream on dark openings.
// Pass `showName={false}` for the mark alone.
export default function Logo({ showName = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="logo-mark size-9 shrink-0"
        fill="none"
        role={showName ? undefined : 'img'}
        aria-label={showName ? undefined : site.name}
        aria-hidden={showName ? 'true' : undefined}
      >
        <rect width="64" height="64" rx="12" fill="currentColor" />
        <g stroke="#E4572E" strokeWidth="10">
          <path d="M22 8V36C22 44 19 50 14 50C12 50 10.5 49.2 9.5 47.8" />
          <path d="M52.4 18.6A9 19 0 1 0 52.4 45.4" />
        </g>
      </svg>
      {showName && (
        <span className="font-display text-2xl tracking-wide md:text-3xl">{site.name}</span>
      )}
    </span>
  )
}
