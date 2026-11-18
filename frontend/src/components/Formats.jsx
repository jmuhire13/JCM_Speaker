import { formats } from '../content/speaking'
import MotionToggle from './MotionToggle'

// The formats he offers, as a huge slow ticker on the ink band. Formats are provisional
// (see content/speaking.js). The ticker is decorative (hidden from screen readers); the same
// formats follow as a plain visible list.
export default function Formats() {
  const line = `${formats.items.join('  /  ')}  /  `

  return (
    <section className="bg-ink text-on-ink overflow-hidden py-16 md:py-24">
      <div className="flex items-center justify-between gap-4 px-5 md:px-10">
        <p className="font-body text-on-ink-label text-sm md:text-[13px] tracking-[0.14em] uppercase">{formats.label}</p>
        <MotionToggle />
      </div>

      <div aria-hidden="true" className="mt-6 whitespace-nowrap">
        <div className="slide-left-slow flex w-max">
          {[0, 1].map((n) => (
            <p
              key={n}
              className="font-hero text-cream pr-8 text-[clamp(3.5rem,10vw,9rem)] leading-none uppercase"
            >
              {line.repeat(3)}
            </p>
          ))}
        </div>
      </div>

      {/* The same formats as a plain list anyone can read at a glance, without waiting for the
          moving line or pausing it (QA T-20). */}
      <ul className="mt-10 flex flex-wrap gap-3 px-5 md:px-10">
        {formats.items.map((item) => (
          <li
            key={item}
            className="border-cream/30 text-cream rounded-full border px-4 py-2 text-[15px] font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="text-on-ink-label mt-6 px-5 text-base md:px-10">{formats.note}</p>
    </section>
  )
}
