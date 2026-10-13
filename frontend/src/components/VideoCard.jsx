import { useState } from 'react'
import { Play } from 'lucide-react'

// A YouTube video that costs nothing until someone presses play.
// It first shows a still thumbnail. Only on click does it load YouTube's privacy-friendly
// player (youtube-nocookie.com). No autoplay on page load, no tracking before a click.
export default function VideoCard({ id, label, note, tone = 'light', caption = true }) {
  const [playing, setPlaying] = useState(false)
  const dark = tone === 'dark'

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-[6px] bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${label}`}
            className="group absolute inset-0 size-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <span className="bg-ember absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition duration-300 group-hover:scale-110 md:size-24">
              <Play className="size-8 translate-x-0.5 fill-current md:size-10" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className={caption ? 'mt-4' : 'sr-only'}>
        <p className={`font-display text-2xl tracking-wide uppercase md:text-3xl ${dark ? 'text-cream' : 'text-ink'}`}>
          {label}
        </p>
        <p className={`mt-1 text-sm ${dark ? 'text-on-ink-label' : 'text-muted'}`}>{note}</p>
      </figcaption>
    </figure>
  )
}
