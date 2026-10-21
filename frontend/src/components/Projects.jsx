import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { projects, alsoBeyond } from '../content/beyond'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Big feature rows: a photo opens with a clip reveal and drifts slowly while you scroll,
// and the text rises in beside it. Rows alternate sides.
export default function Projects() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.project').forEach((row) => {
          const media = row.querySelector('.proj-media')
          const img = row.querySelector('.proj-media img')

          gsap
            .timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: { trigger: row, start: 'top 75%' },
            })
            .fromTo(
              media,
              { clipPath: 'inset(0% 0% 100% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' },
              0,
            )
            .from(
              row.querySelectorAll('.proj-text > *'),
              { y: 30, opacity: 0, duration: 1, stagger: 0.1 },
              0.3,
            )

          // The photo drifts a little slower than the page.
          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        document.fonts.ready.then(() => ScrollTrigger.refresh())
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-24">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="project border-line-strong grid items-center gap-8 border-t py-12 first:border-t-0 md:grid-cols-2 md:gap-16 md:py-24"
          >
            <div
              className={`proj-media aspect-[4/3] overflow-hidden rounded-[6px] ${
                i % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <img
                src={p.photo}
                alt={p.photoAlt}
                loading="lazy"
                className={`h-[118%] w-full object-cover ${p.photoPos}`}
              />
            </div>

            <div className="proj-text">
              <p className="font-hero text-gold-deep text-6xl leading-none md:text-7xl">{p.number}</p>
              <p className="font-body text-muted mt-5 text-[13px] tracking-[0.14em] uppercase">
                {p.label}
              </p>
              <h2 className="font-hero text-ink mt-3 text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1] text-balance uppercase">
                {p.title}
              </h2>
              <p className="text-soft mt-6 max-w-xl text-lg leading-relaxed md:text-xl">{p.text}</p>

              {p.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-ink/30 text-ink rounded-full border px-3 py-1.5 text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink decoration-gold-deep mt-8 inline-flex items-center gap-2 text-[15px] font-medium underline underline-offset-4"
                >
                  {p.link.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </article>
        ))}

        {/* From his public bio only; confirm with the owner (see content/beyond.js) */}
        {alsoBeyond.length > 0 && (
          <ul className="border-line-strong flex flex-wrap gap-3 border-t pt-10">
            {alsoBeyond.map((line) => (
              <li
                key={line}
                className="border-ink/30 text-ink rounded-full border px-4 py-2 text-sm md:text-base"
              >
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
