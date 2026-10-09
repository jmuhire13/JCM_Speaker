import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { storyHero } from '../content/story'

gsap.registerPlugin(SplitText, useGSAP)

export default function StoryHero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rest = gsap
          .timeline({ paused: true })
          .from('.sh-label', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
          .from(
            '.sh-after',
            { y: 30, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
            0.6,
          )

        let started = false
        SplitText.create('.sh-title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            gsap.set(root.current, { visibility: 'visible' })
            if (!started) {
              started = true
              rest.play()
            }
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.1,
              ease: 'power4.out',
            })
          },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(root.current, { visibility: 'visible' })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  const { portrait } = storyHero

  return (
    <section
      ref={root}
      className="gate mx-auto max-w-[1400px] px-5 pt-36 pb-20 md:px-10 md:pt-48 md:pb-32"
    >
      <div className={portrait ? 'grid items-end gap-12 md:grid-cols-[1.4fr_1fr]' : ''}>
        <div>
          <p className="sh-label font-body text-muted text-[13px] tracking-[0.14em] uppercase">
            {storyHero.label}
          </p>
          <h1 className="sh-title font-hero text-ink mt-6 text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-balance uppercase">
            {storyHero.headline}
          </h1>
          <p className="sh-after text-soft mt-10 max-w-3xl text-xl leading-relaxed md:text-2xl">
            {storyHero.intro}
          </p>
        </div>

        {/* Appears once a real portrait is set in content/story.js */}
        {portrait && (
          <div className="sh-after aspect-[4/5] w-full overflow-hidden rounded-[220px_220px_6px_6px] md:max-w-[460px] md:justify-self-end">
            <img
              src={portrait.src}
              alt={portrait.alt}
              className="size-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
