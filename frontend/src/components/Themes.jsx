import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { themes } from '../content/site'

export default function Themes() {
  const root = useRef(null)
  useReveal(root, '.theme-reveal', { y: 50, stagger: 0.12 })

  return (
    <section ref={root} className="bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="theme-reveal font-hero text-ink max-w-5xl text-balance text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {themes.heading}
        </h2>

        <ul className="mt-14 md:mt-20">
          {themes.items.map((item) => (
            <li
              key={item.title}
              className="theme-reveal border-line-strong group grid gap-3 border-t py-8 last:border-b md:grid-cols-[1fr_1.4fr] md:gap-10 md:py-10"
            >
              <h3 className="font-display text-ink group-hover:text-ember text-4xl tracking-wide transition-colors duration-300 md:text-6xl">
                {item.title}
              </h3>
              <p className="text-soft self-center text-lg leading-relaxed md:text-xl">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
