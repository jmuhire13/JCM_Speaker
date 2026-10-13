import { useRef } from 'react'
import useHeroReveal from '../lib/useHeroReveal'
import { ghostYears, storyHero } from '../content/story'

// My Story opens with "ghost years": outlined numerals of his timeline slide slowly across
// the bottom, behind the headline. The portrait sits on an ember offset block.
export default function StoryHero() {
  const root = useRef(null)
  useHeroReveal(root)

  const { portrait } = storyHero
  const years = `${ghostYears.join('  ·  ')}  ·  `

  return (
    <section ref={root} className="gate bg-cream relative min-h-svh overflow-hidden">
      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-36 pb-44 md:grid-cols-[1.3fr_1fr] md:px-10 md:pt-44 md:pb-72">
        <div>
          <p className="ph-label font-body text-muted text-[13px] tracking-[0.14em] uppercase">
            {storyHero.label}
          </p>
          <h1 className="ph-title font-hero text-ink mt-6 text-[clamp(3rem,8vw,8rem)] leading-[0.95] text-balance uppercase">
            {storyHero.headline}
          </h1>
          <p className="ph-after text-soft mt-10 max-w-2xl text-xl leading-relaxed md:text-2xl">
            {storyHero.intro}
          </p>
        </div>

        {/* Appears once a real portrait is set in content/story.js */}
        {portrait && (
          <div className="ph-after relative mx-auto w-full max-w-[26rem] md:ml-auto">
            <div aria-hidden="true" className="bg-ember absolute inset-0 translate-x-3 translate-y-3 rounded-[6px]" />
            <img
              src={portrait.src}
              alt={portrait.alt}
              className="relative aspect-[4/5] w-full rounded-[6px] object-cover object-[50%_30%]"
            />
          </div>
        )}
      </div>

      {/* Ghost years: decorative */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-6 overflow-hidden whitespace-nowrap">
        <div className="slide-left-slow flex w-max">
          {[0, 1].map((n) => (
            <p
              key={n}
              className="font-hero [-webkit-text-stroke:2px_rgba(31,26,29,0.28)] pr-10 text-[clamp(6rem,15vw,14rem)] leading-none text-transparent"
            >
              {years.repeat(2)}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
