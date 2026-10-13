import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { logos } from '../content/logos'
import { hosted, hostedNotes } from '../content/trusted'

// Every organisation that has hosted him: a white tile with the logo (grey until hover),
// the name beneath, and a one-line note once the owner supplies one. This is the readable,
// screen-reader-friendly list behind the sliding logos in the opening.
export default function HostedBy() {
  const root = useRef(null)
  useReveal(root, '.hosted-head', { y: 40, stagger: 0.12 })
  useReveal(root, '.hosted-card', { y: 28, stagger: 0.06 })

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="hosted-head font-hero text-ink text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {hosted.heading}
        </h2>
        <p className="hosted-head text-soft mt-5 max-w-xl text-lg md:text-xl">{hosted.intro}</p>

        <ul className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:mt-20 lg:grid-cols-4">
          {logos.map((logo) => (
            <li key={logo.name} className="hosted-card group">
              <div className="border-line flex aspect-[3/2] items-center justify-center rounded-[6px] border bg-white p-6">
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <p className="text-ink mt-3 text-sm leading-snug md:text-base">{logo.name}</p>
              {hostedNotes[logo.name] && (
                <p className="text-muted mt-1 text-sm leading-snug">{hostedNotes[logo.name]}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
