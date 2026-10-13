import { useRef } from 'react'
import Accent from '../lib/Accent'
import useHeroReveal from '../lib/useHeroReveal'
import TileMosaic from './TileMosaic'
import Button from './Button'
import { site } from '../content/site'
import { speakingHero, speakingMosaic } from '../content/speaking'

// Speaking opens on a dark stage: a slow wall of photo tiles, with the headline over it.
export default function SpeakingHero() {
  const root = useRef(null)
  useHeroReveal(root)

  return (
    <section ref={root} className="gate relative flex min-h-svh items-center overflow-hidden bg-ink">
      <TileMosaic tiles={speakingMosaic} />
      <div className="from-ink via-ink/80 to-ink/30 absolute inset-0 bg-gradient-to-r from-25%" />
      <div className="from-ink absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-36 pb-24 md:px-10">
        <p className="ph-label font-body text-on-ink-label text-[13px] tracking-[0.14em] uppercase">
          {speakingHero.label}
        </p>
        <h1 className="ph-title font-hero text-cream mt-6 max-w-5xl text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-balance uppercase">
          <Accent text={speakingHero.headline} word={speakingHero.accent} />
        </h1>
        <p className="ph-after text-on-ink mt-10 max-w-xl text-xl leading-relaxed md:text-2xl">
          {speakingHero.intro}
        </p>
        <div className="ph-after mt-10">
          <Button to={site.inviteTo} variant="cream">
            {site.inviteLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
