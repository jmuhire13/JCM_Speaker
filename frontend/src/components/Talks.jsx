import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { talks, talksSection } from '../content/speaking'

// The four topic presentations as big stacked blocks: an outlined number, a huge title,
// a description and what the audience leaves with (words in content/speaking.js).
export default function Talks() {
  const root = useRef(null)
  useReveal(root, '.talk-reveal', { y: 50, stagger: 0.12 })

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="talk-reveal font-hero text-ink text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {talksSection.heading}
        </h2>
        <p className="talk-reveal text-soft mt-5 max-w-xl text-lg md:text-xl">{talksSection.intro}</p>

        <ol className="mt-14 md:mt-20">
          {talks.map((talk) => (
            <li
              key={talk.title}
              className="talk-reveal border-ink grid items-center gap-4 border-t-2 py-8 last:border-b-2 md:grid-cols-[auto_1.2fr_1fr] md:gap-14 md:py-12"
            >
              <p className="font-hero [-webkit-text-stroke:2px_#1f1a1d] text-[clamp(4.5rem,11vw,10rem)] leading-none text-transparent">
                {talk.number}
              </p>
              <h3 className="font-hero text-ink text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.95] text-balance uppercase">
                {talk.title}
              </h3>
              <div>
                <p className="text-soft text-lg leading-relaxed md:text-xl">{talk.text}</p>
                <p className="text-ink mt-5 text-lg leading-relaxed font-medium italic md:text-xl">
                  {talk.leave}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
