import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Button from './Button'
import TileMosaic from './TileMosaic'
import MotionToggle from './MotionToggle'
import { hero, heroMosaic, site } from '../content/site'
import heroPhoto from '../assets/photos/jc-portrait-studio.jpg'
import { srcSet } from '../lib/media'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Home opens on a dark stage like Speaking (a faint wall of photos), but with a poster feel:
// his studio portrait stands large in front and the headline rises on the left. (The giant
// outlined "LIVE." and the Scroll cue were removed at the owner's request, Nov 2026.)
//
// The portrait was shot on black. `mix-blend-lighten` lets that black take the colour of the
// stage, so he seems to stand in it. For that to work the photo must sit directly in the
// section, with no wrapper that has a transform, opacity, filter, mask or z-index.
export default function Hero() {
  const root = useRef(null)

  // The entrance (label, headline, portrait, intro and buttons) is plain CSS that starts the
  // moment the page paints: see ".opening" in index.css. Nothing waits for this script, so the
  // headline and portrait are never hidden while the code loads (QA T-01).
  // Only the slow scroll drift of the portrait is done here.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero-photo', {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="opening bg-ink relative flex min-h-svh flex-col overflow-hidden lg:h-svh lg:min-h-[40rem]"
    >
      <TileMosaic tiles={heroMosaic} />
      {/* Keep the wall faint, and darker where the words sit */}
      <div className="bg-ink/55 absolute inset-0 lg:hidden" />
      <div className="from-ink via-ink/85 to-ink/40 absolute inset-0 bg-gradient-to-r from-30%" />
      <div className="from-ink absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t to-transparent" />
      {/* A solid dark spotlight behind him, so the photo wall never shows through his jacket */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{ background: 'radial-gradient(ellipse 34% 78% at 77% 60%, #1f1a1d 55%, transparent 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 80%, #1f1a1d 55%, transparent 100%)' }}
      />

      {/* The portrait: straight in the section, so the blend can see the stage behind it.
          Centred on phones with left/right 0 and auto margins, never with a translate class:
          GSAP's scroll drift on this image would overwrite a CSS translate and push it sideways. */}
      <img
        src={heroPhoto}
        srcSet={srcSet('/src/assets/photos/jc-portrait-studio.jpg')}
        // Shown 92% of the screen height on laptops, 52% on phones; the photo is 2:3.
        sizes="(min-width: 1024px) 62vh, 35vh"
        alt={hero.photoAlt}
        width="1000"
        height="1500"
        fetchPriority="high"
        className="hero-photo pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[52svh] w-auto max-w-none object-contain mix-blend-lighten lg:right-[3vw] lg:left-auto lg:mx-0 lg:h-[92svh]"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, black 82%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, black 82%, transparent)',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 pt-32 pb-8 md:px-10 md:pt-40 md:pb-16">
        <div className="max-w-[58rem] lg:max-w-[54%]">
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

        {/* Room for the portrait on phones */}
        <div className="min-h-[44svh] flex-1 lg:min-h-0" aria-hidden="true" />
      </div>

      <MotionToggle className="absolute bottom-5 left-5 z-10 md:left-10" />
    </section>
  )
}
