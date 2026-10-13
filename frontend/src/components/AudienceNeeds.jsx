import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { audiences } from '../content/site'
import { audienceNeeds } from '../content/speaking'

// What each sector is facing, in its own words (reuses the text from Home's "Who he speaks to").
export default function AudienceNeeds() {
  const root = useRef(null)
  useReveal(root, '.need-reveal', { y: 44, stagger: 0.14 })

  return (
    <section ref={root} className="bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="need-reveal font-hero text-ink max-w-5xl text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] text-balance uppercase">
          {audienceNeeds.heading}
        </h2>

        <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {audiences.items.map((item) => (
            <li key={item.name} className="need-reveal border-ink border-t-2 pt-6">
              <h3 className="font-hero text-ink text-5xl uppercase md:text-6xl">{item.name}</h3>
              <p className="text-soft mt-4 text-lg leading-relaxed md:text-xl">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
