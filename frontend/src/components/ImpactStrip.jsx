import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { impact } from '../content/beyond'

// Three big numbers on the ink band. Keep these to facts we have read in a source.
export default function ImpactStrip() {
  const root = useRef(null)
  useReveal(root, '.impact-reveal', { y: 40, stagger: 0.14 })

  return (
    <section ref={root} className="bg-ink text-on-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
          {impact.map((item) => (
            <li key={item.big} className="impact-reveal">
              <p className="font-hero text-ember text-[clamp(3rem,6.2vw,5.5rem)] leading-none">
                {item.big}
              </p>
              <p className="text-on-ink mt-4 max-w-xs text-lg leading-relaxed md:text-xl">
                {item.small}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
