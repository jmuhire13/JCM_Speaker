import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Button from './Button'
import { hero, site } from '../content/site'
import heroPhoto from '../assets/photos/speaker-crowd.jpg'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Everything except the headline lines, held until the headline is ready.
        const rest = gsap
          .timeline({ paused: true })
          .from('.hero-roles', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
          .from(
            '.hero-frame',
            { y: 70, opacity: 0, duration: 1.3, ease: 'power3.out' },
            0.1,
          )
          .from('.hero-photo', { scale: 1.2, duration: 2, ease: 'power3.out' }, 0.1)
          .from(
            '.hero-after',
            { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
            0.7,
          )

        let started = false
        SplitText.create('.hero-title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true, // re-split if fonts load late or the window is resized
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

        // Photo drifts slowly as you scroll past the hero.
        gsap.to('.hero-parallax', {
          yPercent: -11,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
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
      className="gate relative mx-auto grid min-h-svh max-w-[1400px] items-center gap-10 px-5 pt-28 pb-16 md:grid-cols-[1.3fr_1fr] md:gap-12 md:px-10"
    >
      <div>
        <p className="hero-roles font-body text-muted text-[13px] tracking-[0.14em] uppercase">
          {site.roles}
        </p>

        <h1 className="hero-title font-hero text-ink mt-6 text-[clamp(2.5rem,6.2vw,6.75rem)] leading-[0.95] uppercase">
          {hero.headline} <span className="text-ember">{hero.highlight}</span>
        </h1>

        <p className="hero-after text-soft mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
          {hero.subtitle}
        </p>

        <div className="hero-after mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Button to={site.inviteTo}>{site.inviteLabel}</Button>
          <Link
            to={hero.secondaryTo}
            className="text-ink decoration-ember text-[15px] font-medium underline underline-offset-4"
          >
            {hero.secondaryLabel}
          </Link>
        </div>
      </div>

      {/* Arch-shaped photo, 4:5 */}
      <div className="hero-frame aspect-[4/5] w-full overflow-hidden rounded-[220px_220px_6px_6px] md:max-w-[520px] md:justify-self-end">
        <div className="hero-parallax h-[115%] w-full">
          <img
            src={heroPhoto}
            alt={hero.photoAlt}
            width="1600"
            height="1067"
            fetchPriority="high"
            className="hero-photo size-full object-cover object-[72%_50%]"
          />
        </div>
      </div>
    </section>
  )
}
