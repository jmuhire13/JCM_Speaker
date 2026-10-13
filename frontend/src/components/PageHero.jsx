import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, useGSAP)

// The opening of an inner page: a small label, a big headline that rises line by line,
// and an intro paragraph. Pass { label, headline, intro }.
export default function PageHero({ label, headline, intro }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rest = gsap
          .timeline({ paused: true })
          .from('.ph-label', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
          .from(
            '.ph-after',
            { y: 30, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
            0.6,
          )

        let started = false
        SplitText.create('.ph-title', {
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

  return (
    <section
      ref={root}
      className="gate mx-auto max-w-[1400px] px-5 pt-36 pb-20 md:px-10 md:pt-48 md:pb-32"
    >
      <p className="ph-label font-body text-muted text-[13px] tracking-[0.14em] uppercase">
        {label}
      </p>
      <h1 className="ph-title font-hero text-ink mt-6 max-w-6xl text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-balance uppercase">
        {headline}
      </h1>
      <p className="ph-after text-soft mt-10 max-w-3xl text-xl leading-relaxed md:text-2xl">
        {intro}
      </p>
    </section>
  )
}
