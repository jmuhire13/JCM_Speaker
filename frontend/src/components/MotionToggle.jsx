import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'

// A small pause / play button for the site's endless moving bands (photo walls, logo rows,
// ghost years, formats ticker, footer band). Accessibility rule WCAG 2.2.2: anything that moves
// for more than five seconds must be stoppable. One button pauses ALL of them, on every page,
// and the choice is remembered on this device. The pausing itself is CSS: the class
// `motion-paused` on <html> (see index.css). Visitors who asked their device to reduce motion
// never see movement, so the button is hidden for them.

const KEY = 'jcm-motion-paused'
const EVENT = 'jcm-motion-change'

function stored() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

// Apply a remembered choice as soon as this file loads (the footer always loads it).
if (typeof document !== 'undefined' && stored()) {
  document.documentElement.classList.add('motion-paused')
}

const isPaused = () => document.documentElement.classList.contains('motion-paused')

const tones = {
  dark: 'bg-ink/80 text-cream ring-cream/40',
  light: 'bg-cream/90 text-ink ring-ink/25',
}

export default function MotionToggle({ tone = 'dark', className = '' }) {
  const [paused, setPaused] = useState(isPaused)

  // Keep every button on the page in step when one of them is pressed.
  useEffect(() => {
    const sync = () => setPaused(isPaused())
    window.addEventListener(EVENT, sync)
    return () => window.removeEventListener(EVENT, sync)
  }, [])

  const toggle = () => {
    const next = !isPaused()
    document.documentElement.classList.toggle('motion-paused', next)
    try {
      localStorage.setItem(KEY, next ? '1' : '0')
    } catch {
      // Private browsing: the choice still works for this visit.
    }
    window.dispatchEvent(new Event(EVENT))
  }

  const Icon = paused ? Play : Pause
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? 'Play moving images' : 'Pause moving images'}
      title={paused ? 'Play moving images' : 'Pause moving images'}
      className={`motion-toggle grid size-11 place-items-center rounded-full ring-1 backdrop-blur-sm transition-opacity hover:opacity-100 ${tones[tone]} ${className}`}
    >
      <Icon className="size-4" fill="currentColor" aria-hidden="true" />
    </button>
  )
}
