import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { bridge } from '../content/site'
import texture from '../assets/photos/speaking-tedx.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Each line steps further right on desktop. On phones all lines align left.
const offsets = ['', 'md:ml-[8%]', 'md:ml-[16%]', 'md:ml-[24%]']

export default function Bridge() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: '.bridge-statement', start: 'top 80%', once: true },
          })
          .from('.bridge-label', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
          .from(
            '.bridge-line',
            { yPercent: 110, duration: 1.1, stagger: 0.14, ease: 'power4.out' },
            0.15,
          )
          .from(
            '.bridge-copy',
            { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' },
            '-=0.4',
          )

        // The statement drifts a little slower than the page, for depth.
        gsap.to('.bridge-statement', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        // Fonts change line widths, so measure the trigger positions again once they load.
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="bg-green-deep text-on-green relative overflow-hidden"
    >
      {/* Faint, tinted texture. Decorative only. */}
      <img
        src={texture}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-[0.16] grayscale"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <p className="bridge-label font-body text-on-green-label text-[13px] tracking-[0.14em] uppercase">
          {bridge.label}
        </p>

        <h2 className="bridge-statement font-hero text-cream mt-8 text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.95] uppercase">
          {bridge.lines.map((line, i) => (
            <span key={line} className={`block overflow-hidden py-[0.04em] ${offsets[i]}`}>
              <span
                className={`bridge-line block ${
                  i === bridge.lines.length - 1 ? 'text-ember' : ''
                }`}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p className="bridge-copy text-on-green mt-12 max-w-xl text-lg leading-relaxed md:mt-20 md:ml-[24%] md:text-xl">
          {bridge.paragraph}
        </p>
      </div>
    </section>
  )
}
