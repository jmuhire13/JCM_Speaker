import { useRef } from 'react'
import Accent from '../lib/Accent'
import useHeroReveal from '../lib/useHeroReveal'
import { logos } from '../content/logos'
import { trustedHero } from '../content/trusted'

// One row of white logo tiles that slides sideways. Two copies, side by side, make the loop
// seamless. `reverse` runs it the other way.
function LogoRow({ items, reverse = false }) {
  return (
    <div aria-hidden="true" className="overflow-hidden">
      <div className={`flex w-max gap-4 ${reverse ? 'slide-right-slow' : 'slide-left-slow'}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4">
            {items.map((logo) => (
              <div
                key={`${copy}-${logo.name}`}
                className="flex h-28 w-48 shrink-0 items-center justify-center rounded-[6px] bg-white p-5 md:h-32 md:w-56"
              >
                <img
                  src={logo.src}
                  alt=""
                  className="max-h-full max-w-full object-contain opacity-80 grayscale"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Trusted By opens on ink: a huge count of the organisations, and two rows of logos
// sliding in opposite directions across the full width.
export default function TrustedHero() {
  const root = useRef(null)
  useHeroReveal(root)
  const half = Math.ceil(logos.length / 2)

  return (
    <section ref={root} className="gate bg-ink relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="ph-label font-body text-on-ink-label text-[13px] tracking-[0.14em] uppercase">
          {trustedHero.label}
        </p>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:gap-14">
          <p className="ph-after font-hero text-gold text-[clamp(8rem,26vw,22rem)] leading-[0.78]">
            {logos.length}
          </p>
          <div className="pb-2">
            <h1 className="ph-title font-hero text-cream max-w-3xl text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] text-balance uppercase">
              <Accent text={trustedHero.headline} word={trustedHero.accent} />
            </h1>
            <p className="ph-after text-on-ink mt-6 max-w-lg text-lg leading-relaxed md:text-xl">
              {trustedHero.intro}
            </p>
          </div>
        </div>
      </div>

      <div className="ph-after mt-16 space-y-4 md:mt-24">
        <LogoRow items={logos.slice(0, half)} />
        <LogoRow items={logos.slice(half)} reverse />
      </div>
    </section>
  )
}
