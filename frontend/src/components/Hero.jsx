import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from 'lucide-react'
import Button from './Button'
import TileMosaic from './TileMosaic'
import { hero, heroMosaic, site } from '../content/site'
import heroPhoto from '../assets/photos/jc-portrait-studio.jpg'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Home opens on a dark stage like Speaking (a faint wall of photos), but with a poster feel:
// his studio portrait stands large in front, a giant outlined "LIVE." sits behind him, and the
// headline rises on the left.
//
// The portrait was shot on black. `mix-blend-lighten` lets that black take the colour of the
// stage, so he seems to stand in it. For that to work the photo must sit directly in the
// section, with no wrapper that has a transform, opacity, filter, mask or z-index.
export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rest = gsap
          .timeline({ paused: true })
          .from('.hero-roles', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
          .from('.hero-live', { opacity: 0, xPercent: 8, duration: 1.6, ease: 'power3.out' }, 0)
          .from('.hero-photo', { opacity: 0, y: 60, duration: 1.4, ease: 'power3.out' }, 0.15)
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

        // The giant word and the portrait drift at different speeds as you scroll past.
        gsap.to('.hero-live', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-photo', {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
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
      className="gate bg-ink relative flex min-h-svh flex-col overflow-hidden md:h-svh md:min-h-[40rem]"
    >
      <TileMosaic tiles={heroMosaic} />
      {/* Keep the wall faint, and darker where the words sit */}
      <div className="bg-ink/55 absolute inset-0 md:hidden" />
      <div className="from-ink via-ink/85 to-ink/40 absolute inset-0 bg-gradient-to-r from-30%" />
      <div className="from-ink absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t to-transparent" />
      {/* A solid dark spotlight behind him, so the photo wall never shows through his jacket */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{ background: 'radial-gradient(ellipse 34% 78% at 77% 60%, #1f1a1d 55%, transparent 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 80%, #1f1a1d 55%, transparent 100%)' }}
      />

      {/* The portrait: straight in the section, so the blend can see the stage behind it */}
      <img
        src={heroPhoto}
        alt={hero.photoAlt}
        width="1000"
        height="1500"
        fetchPriority="high"
        className="hero-photo pointer-events-none absolute right-1/2 bottom-0 h-[52svh] w-auto max-w-none translate-x-1/2 object-contain mix-blend-lighten md:right-[3vw] md:h-[92svh] md:translate-x-0"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, black 82%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, black 82%, transparent)',
          WebkitMaskComposite: 'source-in',
        }}
      />

      {/* Giant outlined word across his chest, like lettering on a film poster. Decorative: the
          headline already says it. */}
      <p
        aria-hidden="true"
        className="hero-live font-hero [-webkit-text-stroke:2px_#e8b23a] pointer-events-none absolute right-[-1vw] bottom-[1svh] text-[clamp(5rem,26vw,9rem)] leading-none text-transparent uppercase select-none md:right-[3vw] md:bottom-[3svh] md:text-[clamp(8rem,15vw,16rem)]"
      >
        {hero.highlight}
      </p>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 pt-32 pb-8 md:px-10 md:pt-40 md:pb-16">
        <div className="max-w-[58rem] md:max-w-[54%]">
          <p className="hero-roles font-body text-on-ink-label text-[13px] tracking-[0.14em] uppercase">
            {site.roles}
          </p>

          <h1 className="hero-title font-hero text-cream mt-6 text-[clamp(2.5rem,5vw,5.75rem)] leading-[0.95] uppercase">
            {hero.headline} <span className="text-gold">{hero.highlight}</span>
          </h1>

          <p className="hero-after text-on-ink mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            {hero.subtitle}
          </p>

          <div className="hero-after mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button to={site.inviteTo} variant="cream">
              {site.inviteLabel}
            </Button>
            <Link
              to={hero.secondaryTo}
              className="text-cream decoration-gold text-[15px] font-medium underline underline-offset-4"
            >
              {hero.secondaryLabel}
            </Link>
          </div>
        </div>

        {/* Room for the portrait on phones, then the scroll cue */}
        <div className="min-h-[44svh] flex-1 md:min-h-0" aria-hidden="true" />
        <p
          aria-hidden="true"
          className="hero-after text-on-ink-label mt-6 hidden items-center gap-2 text-[13px] tracking-[0.14em] uppercase md:flex"
        >
          <ArrowDown className="size-4 motion-safe:animate-bounce" />
          Scroll
        </p>
      </div>
    </section>
  )
}
