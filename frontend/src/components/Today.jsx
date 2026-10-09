import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { today } from '../content/story'

export default function Today() {
  const root = useRef(null)
  useReveal(root, '.today-reveal', { y: 50, stagger: 0.12 })

  return (
    <section ref={root} className="bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="today-reveal font-hero text-ink text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {today.heading}
        </h2>
        <p className="today-reveal text-ink mt-10 max-w-4xl text-xl leading-snug md:text-3xl">
          {today.text}
        </p>

        {/* Roles and honours from public sources. Confirm with the owner (see content/story.js). */}
        <ul className="mt-12 flex flex-wrap gap-3">
          {today.also.map((line) => (
            <li
              key={line}
              className="today-reveal border-ink/30 text-ink rounded-full border px-4 py-2 text-sm md:text-base"
            >
              {line}
            </li>
          ))}
        </ul>

        {/* Provisional: drawn from his bio. Replace with his own words (see content/story.js). */}
        <ul className="mt-16 md:mt-24">
          {today.reflections.map((r) => (
            <li
              key={r.label}
              className="today-reveal border-line-strong grid gap-3 border-t py-8 last:border-b md:grid-cols-[1fr_1.4fr] md:gap-10 md:py-10"
            >
              <p className="font-body text-muted self-center text-[13px] tracking-[0.14em] uppercase">
                {r.label}
              </p>
              <p className="font-display text-ink text-3xl leading-tight uppercase md:text-5xl">
                {r.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
