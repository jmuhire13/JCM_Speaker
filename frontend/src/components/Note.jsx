import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../lib/useReveal'
import { note } from '../content/site'

export default function Note() {
  const root = useRef(null)
  useReveal(root, '.note-reveal', { y: 40, stagger: 0.15 })

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <p className="note-reveal font-display text-ink max-w-5xl text-balance text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] uppercase">
          {note.text}
        </p>
        <Link
          to={note.to}
          className="note-reveal decoration-gold-deep mt-10 inline-block text-[15px] font-medium underline underline-offset-4"
        >
          {note.linkLabel}
        </Link>
      </div>
    </section>
  )
}
