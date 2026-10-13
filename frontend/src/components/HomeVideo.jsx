import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../lib/useReveal'
import VideoCard from './VideoCard'
import { featuredVideo } from '../content/videos'

// The video slot under the Home hero: a sand band, the video large on an ember offset block,
// and a short statement beside it. Until a real stage reel exists it shows a feature about his
// story, labelled honestly. Swap `featuredVideo` in content/videos.js.
// The statement is drawn from his bio ("no one should have to face their hardest moments alone").
export default function HomeVideo() {
  const root = useRef(null)
  useReveal(root, '.hv-reveal', { y: 40, stagger: 0.14 })

  return (
    <section ref={root} className="bg-sand">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 md:grid-cols-[1.5fr_1fr] md:gap-16 md:px-10 md:py-36">
        <div className="hv-reveal relative">
          <div aria-hidden="true" className="bg-ember absolute inset-0 translate-x-3 translate-y-3 rounded-[6px]" />
          <div className="relative">
            <VideoCard {...featuredVideo} caption={false} />
          </div>
        </div>

        <div>
          <p className="hv-reveal font-body text-muted text-[13px] tracking-[0.14em] uppercase">
            Watch
          </p>
          <p className="hv-reveal font-hero text-ink mt-4 text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.95] text-balance uppercase">
            No one should have to face their hardest moments alone.
          </p>
          <p className="hv-reveal text-muted mt-5 text-base">
            {featuredVideo.label} · {featuredVideo.note}
          </p>
          <Link
            to="/my-story"
            className="hv-reveal decoration-ember mt-8 inline-block text-[15px] font-medium underline underline-offset-4"
          >
            Read and watch more of his story
          </Link>
        </div>
      </div>
    </section>
  )
}
