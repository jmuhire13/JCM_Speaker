import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useMedia from '../lib/useMedia'
import { audiences } from '../content/site'
import ngoPhoto from '../assets/photos/audience-ngo.jpg'
import hospitalPhoto from '../assets/photos/audience-hospital.jpg'
import schoolPhoto from '../assets/photos/audience-school.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Same order as audiences.items in content/site.js.
// provisional: stock photos (Unsplash), see src/assets/photos/CREDITS.md
// "pos" chooses which part of a wide photo stays visible in a tall frame.
const photos = [
  { src: ngoPhoto, pos: 'object-[55%_50%]' },
  { src: hospitalPhoto, pos: 'object-[72%_50%]' },
  { src: schoolPhoto, pos: 'object-[22%_50%]' },
]

export default function Audiences() {
  const root = useRef(null)
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const wide = useMedia('(min-width: 768px)')
  // The pinned scene needs room and motion. Phones, and visitors who asked for
  // less motion, get plain stacked cards instead.
  const pinned = wide && !reduced

  useGSAP(
    () => {
      if (reduced) return

      if (pinned) {
        const names = gsap.utils.toArray('.aud-name')
        const descs = gsap.utils.toArray('.aud-desc')
        const imgs = gsap.utils.toArray('.aud-photo')

        gsap.set(names.slice(1), { opacity: 0.22 })
        gsap.set(descs.slice(1), { opacity: 0, y: 14 })
        gsap.set(imgs.slice(1), { opacity: 0, scale: 1.08 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.aud-pin',
            start: 'top top',
            end: '+=240%',
            pin: true,
            scrub: 0.5,
          },
        })

        // Move the spotlight from item i-1 to item i.
        for (let i = 1; i < names.length; i++) {
          const at = 0.5 + (i - 1)
          tl.to(names[i - 1], { opacity: 0.22, duration: 0.4 }, at)
            .to(descs[i - 1], { opacity: 0, y: -14, duration: 0.4 }, at)
            .to(imgs[i - 1], { opacity: 0, duration: 0.5 }, at)
            .to(names[i], { opacity: 1, duration: 0.4 }, at)
            .to(descs[i], { opacity: 1, y: 0, duration: 0.4 }, at)
            .to(imgs[i], { opacity: 1, scale: 1, duration: 0.6 }, at)
        }
        tl.to({}, { duration: 0.6 }) // hold the last one for a moment
      } else {
        gsap.utils.toArray('.aud-card').forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })
      }

      document.fonts.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: root, dependencies: [pinned, reduced], revertOnUpdate: true },
  )

  if (pinned) {
    return (
      <section ref={root} className="bg-cream">
        <div className="aud-pin">
          <div className="mx-auto grid h-svh max-w-[1400px] grid-cols-[0.8fr_1.2fr] items-center gap-16 px-10 pt-20">
            <div className="relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden rounded-[6px]">
              {audiences.items.map((item, i) => (
                <img
                  key={item.name}
                  src={photos[i].src}
                  alt={item.photoAlt}
                  loading="lazy"
                  className={`aud-photo absolute inset-0 size-full object-cover ${photos[i].pos}`}
                />
              ))}
            </div>

            <div>
              <p className="font-body text-muted text-[13px] tracking-[0.14em] uppercase">
                {audiences.label}
              </p>
              <ul className="mt-6">
                {audiences.items.map((item) => (
                  <li key={item.name} className="border-line border-t py-[1.6svh]">
                    <h3 className="aud-name font-hero text-ink text-[min(8vw,11svh)] leading-[0.95] uppercase">
                      {item.name}
                    </h3>
                    <p className="aud-desc text-soft mt-2 max-w-md text-[clamp(0.95rem,2.2svh,1.125rem)] leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <p className="font-body text-muted text-[13px] tracking-[0.14em] uppercase">
          {audiences.label}
        </p>
        <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-8">
          {audiences.items.map((item, i) => (
            <article key={item.name} className="aud-card">
              <img
                src={photos[i].src}
                alt={item.photoAlt}
                loading="lazy"
                className={`aspect-[4/3] w-full rounded-[6px] object-cover ${photos[i].pos}`}
              />
              <h3 className="font-hero text-ink mt-6 text-5xl uppercase">{item.name}</h3>
              <p className="text-soft mt-2 text-lg leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
