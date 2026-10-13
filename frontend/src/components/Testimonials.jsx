import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { proof } from '../content/site'
import { testimonialsHeading } from '../content/trusted'

// The section itself. It is a separate component so its animation only starts when there is
// something on the page to animate (an animation pointed at nothing logs warnings).
function TestimonialsSection({ quotes }) {
  const root = useRef(null)
  useReveal(root, '.quote-reveal', { y: 40, stagger: 0.15 })

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="quote-reveal font-hero text-ink text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {testimonialsHeading}
        </h2>
        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.name} className="quote-reveal">
              <blockquote className="font-display text-ink text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.05] uppercase">
                {q.text}
              </blockquote>
              <figcaption className="text-muted mt-5 text-base">
                <strong className="text-ink">{q.name}</strong>, {q.role}, {q.organisation}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// Shows only real, named testimonials from `proof.testimonials` in content/site.js.
// With none, it renders nothing. We never invent proof.
export default function Testimonials() {
  const quotes = proof.testimonials.slice(0, 3)
  if (quotes.length === 0) return null
  return <TestimonialsSection quotes={quotes} />
}
