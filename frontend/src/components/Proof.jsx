import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { proof } from '../content/site'
import { logos } from '../content/logos'

export default function Proof() {
  const root = useRef(null)
  useReveal(root, '.proof-reveal', { y: 40, stagger: 0.12 })
  useReveal(root, '.logo-reveal', { y: 24, stagger: 0.05 })

  const quote = proof.testimonials[0]

  return (
    <section ref={root} className="bg-ink text-on-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <p className="proof-reveal font-body text-on-ink-label text-[13px] tracking-[0.14em] uppercase">
          {proof.label}
        </p>
        <h2 className="proof-reveal font-hero text-cream mt-6 text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {proof.heading}
        </h2>
        <p className="proof-reveal text-on-ink mt-5 max-w-xl text-lg md:text-xl">{proof.intro}</p>

        {/* Facts, taken word for word from the owner's story (content/source/my-story.md) */}
        <ul className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:mt-24 md:grid-cols-3">
          {proof.facts.map((fact) => (
            <li key={fact.year} className="proof-reveal">
              <p className="font-hero text-ember text-6xl md:text-7xl">{fact.year}</p>
              <p className="text-on-ink mt-3 max-w-sm text-base leading-relaxed md:text-lg">
                {fact.text}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-24 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo) => (
            <li
              key={logo.name}
              className="logo-reveal group flex aspect-[3/2] items-center justify-center rounded-[6px] bg-white p-5"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>

        {/* Shown only once a real, named testimonial is added in content/site.js */}
        {quote && (
          <figure className="proof-reveal mt-20 max-w-4xl md:mt-32">
            <blockquote className="font-display text-cream text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] uppercase">
              {quote.text}
            </blockquote>
            <figcaption className="text-on-ink-label mt-6 text-base">
              <strong className="text-cream">{quote.name}</strong>, {quote.role}, {quote.organisation}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
