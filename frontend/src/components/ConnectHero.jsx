import { useRef } from 'react'
import Accent from '../lib/Accent'
import useHeroReveal from '../lib/useHeroReveal'
import ConnectForm from './ConnectForm'
import { connectHero } from '../content/connect'

// Connect opens on deep gold, a colour used nowhere else on the site. This is the
// page where the action happens, so it gets the boldest background on the site.
export default function ConnectHero() {
  const root = useRef(null)
  useHeroReveal(root)

  return (
    <section ref={root} className="gate bg-gold-deep text-cream relative overflow-hidden">
      <div className="mx-auto grid min-h-svh max-w-[1400px] items-center gap-12 px-5 pt-32 pb-20 md:grid-cols-[1.05fr_1fr] md:px-10">
        <div>
          <p className="ph-label font-body text-cream text-[13px] tracking-[0.14em] uppercase">
            {connectHero.label}
          </p>
          <h1 className="ph-title font-hero text-cream mt-6 text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.95] text-balance uppercase">
            <Accent text={connectHero.headline} word={connectHero.accent} className="text-ink" />
          </h1>
          <p className="ph-after text-cream mt-10 max-w-xl text-xl leading-relaxed md:text-2xl">
            {connectHero.intro}
          </p>
        </div>

        <div className="ph-after relative">
          <ConnectForm />
        </div>
      </div>
    </section>
  )
}
