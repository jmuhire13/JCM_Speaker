import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import useReveal from '../lib/useReveal'
import VideoCard from './VideoCard'
import { videos, videoSection } from '../content/videos'

// The videos as full-width stacked features: a large player beside an outlined number, a
// big title and a link to watch on YouTube. Sides alternate.
export default function VideoSection({ background = 'bg-cream' }) {
  const root = useRef(null)
  useReveal(root, '.vid-head', { y: 40, stagger: 0.12 })
  useReveal(root, '.vid-card', { y: 40, stagger: 0.1 })

  return (
    <section ref={root} className={background}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="vid-head font-hero text-ink text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] text-balance uppercase">
          {videoSection.heading}
        </h2>
        <p className="vid-head text-soft mt-5 max-w-2xl text-lg md:text-xl">{videoSection.intro}</p>

        <div className="mt-14 md:mt-20">
          {videos.map((v, i) => (
            <article
              key={v.id}
              className="vid-card border-ink grid items-center gap-8 border-t-2 py-10 last:border-b-2 md:grid-cols-[1.5fr_1fr] md:gap-14 md:py-16"
            >
              <div className={i % 2 ? 'md:order-2' : ''}>
                <VideoCard {...v} caption={false} />
              </div>
              <div>
                <p className="font-hero [-webkit-text-stroke:2px_#1f1a1d] text-8xl leading-none text-transparent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-hero text-ink mt-4 text-[clamp(2rem,4vw,3.75rem)] leading-[0.95] text-balance uppercase">
                  {v.label}
                </h3>
                <p className="text-muted mt-3 text-base">{v.note}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink decoration-ember mt-6 inline-flex items-center gap-2 text-[15px] font-medium underline underline-offset-4"
                >
                  Watch on YouTube
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
