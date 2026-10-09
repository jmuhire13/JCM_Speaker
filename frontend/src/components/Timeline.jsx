import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MapPin } from 'lucide-react'
import useReveal from '../lib/useReveal'
import { timeline } from '../content/story'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// A vertical timeline in the style of the CHII reference: a line draws itself as you
// scroll, photos alternate left and right, and each moment is revealed in turn.
export default function Timeline() {
  const root = useRef(null)
  useReveal(root, '.tl-heading', { y: 50 })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.tl-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.tl-list', start: 'top 60%', end: 'bottom 70%', scrub: 1 },
          },
        )

        gsap.utils.toArray('.tl-item').forEach((item) => {
          gsap
            .timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: { trigger: item, start: 'top 75%' },
            })
            .fromTo(
              item.querySelector('.tl-media'),
              { clipPath: 'inset(0% 0% 100% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' },
              0,
            )
            .from(item.querySelector('.tl-media img'), { scale: 1.25, duration: 1.8 }, 0)
            .from(item.querySelector('.tl-date'), { y: 30, opacity: 0, duration: 1 }, 0.2)
            .from(
              item.querySelectorAll('.tl-text > *'),
              { y: 30, opacity: 0, duration: 1, stagger: 0.12 },
              0.4,
            )
        })

        document.fonts.ready.then(() => ScrollTrigger.refresh())
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-ink text-on-ink overflow-x-clip">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="tl-heading font-hero text-cream text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[1.02] text-balance uppercase">
          {timeline.heading}
        </h2>

        <div className="tl-list relative mt-16 md:mt-24">
          <div
            aria-hidden="true"
            className="tl-line bg-cream/60 absolute top-0 bottom-0 left-1/2 -ml-[1.5px] hidden w-[3px] origin-top md:block"
          />

          {timeline.items.map((item, i) => {
            const mediaLeft = i % 2 === 0
            return (
              <article
                key={item.title}
                className="tl-item relative grid items-center gap-6 py-10 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-24"
              >
                <div className="tl-date bg-ink relative z-20 flex flex-col items-center px-3 py-2 md:col-start-2 md:row-start-1">
                  <span className="font-display text-on-ink-label text-lg tracking-widest uppercase md:text-2xl">
                    {item.small}
                  </span>
                  <span className="font-hero text-ember text-[clamp(2.5rem,5.5vw,5.5rem)] leading-none whitespace-nowrap">
                    {item.big}
                  </span>
                </div>

                <div
                  className={`tl-media relative z-0 aspect-[3/2] overflow-hidden md:row-start-1 ${
                    mediaLeft ? 'md:col-start-1 md:-mr-[3.5vw]' : 'md:col-start-3 md:-ml-[3.5vw]'
                  }`}
                >
                  <img
                    src={item.photo}
                    alt={item.photoAlt}
                    loading="lazy"
                    className={`size-full object-cover ${item.photoPos}`}
                  />
                </div>

                <div
                  className={`tl-text md:row-start-1 ${
                    mediaLeft ? 'md:col-start-3 md:pl-[7%]' : 'md:col-start-1 md:pr-[7%] md:pl-[2%]'
                  }`}
                >
                  <h3 className="font-display text-cream text-[clamp(1.75rem,3vw,2.75rem)] leading-none uppercase">
                    {item.title}
                  </h3>
                  {item.place && (
                    <p className="font-display text-on-ink-label mt-3 flex items-center gap-2 text-xl uppercase md:text-2xl">
                      <MapPin className="text-ember size-5" aria-hidden="true" />
                      {item.place}
                    </p>
                  )}
                  <p className="text-on-ink mt-4 max-w-md text-sm leading-relaxed md:text-base">
                    {item.text}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
