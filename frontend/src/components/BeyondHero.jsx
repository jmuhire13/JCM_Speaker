import { useRef } from 'react'
import Accent from '../lib/Accent'
import useHeroReveal from '../lib/useHeroReveal'
import { beyondHero, projects } from '../content/beyond'

// Where each fanned print sits and how it tilts. The outer box holds the fixed tilt; the inner
// one is what the animation moves, so the two never fight each other.
const spots = [
  'left-0 top-10 w-[56%] -rotate-[8deg]',
  'left-[22%] top-0 z-10 w-[58%] rotate-[2deg]',
  'right-0 top-20 w-[54%] rotate-[9deg]',
]

// Beyond the Stage opens on deep green, with the three projects fanned out like prints.
export default function BeyondHero() {
  const root = useRef(null)
  useHeroReveal(root)

  return (
    <section ref={root} className="gate bg-green-deep relative overflow-hidden">
      <div className="mx-auto grid min-h-svh max-w-[1400px] items-center gap-12 px-5 pt-32 pb-20 md:grid-cols-[1.1fr_1fr] md:px-10">
        <div>
          <p className="ph-label font-body text-on-green-label text-[13px] tracking-[0.14em] uppercase">
            {beyondHero.label}
          </p>
          <h1 className="ph-title font-hero text-cream mt-6 text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[0.95] text-balance uppercase">
            <Accent text={beyondHero.headline} word={beyondHero.accent} />
          </h1>
          <p className="ph-after text-on-green mt-10 max-w-xl text-xl leading-relaxed md:text-2xl">
            {beyondHero.intro}
          </p>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-[34rem] md:h-[36rem]">
          {projects.slice(0, 3).map((p, i) => (
            <div key={p.title} className={`absolute ${spots[i]}`}>
              <div className="ph-after bg-cream p-2 shadow-2xl">
                <img
                  src={p.photo}
                  alt={p.photoAlt}
                  className={`aspect-[4/5] w-full object-cover ${p.photoPos}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
