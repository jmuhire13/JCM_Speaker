import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { recognitions } from '../content/trusted'

// Honours, newest first, on the ink band.
export default function Recognitions() {
  const root = useRef(null)
  useReveal(root, '.rec-reveal', { y: 50, stagger: 0.1 })

  return (
    <section ref={root} className="bg-ink text-on-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="rec-reveal font-hero text-cream max-w-5xl text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] text-balance uppercase">
          {recognitions.heading}
        </h2>

        <ul className="mt-14 md:mt-20">
          {recognitions.items.map((item) => (
            <li
              key={`${item.year}-${item.text}`}
              className="rec-reveal grid items-center gap-2 border-t border-white/20 py-7 last:border-b md:grid-cols-[1fr_2fr] md:gap-10 md:py-9"
            >
              <p className="font-hero text-gold text-5xl leading-none md:text-6xl">{item.year}</p>
              <p className="font-display text-cream text-3xl leading-tight uppercase md:text-5xl">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
