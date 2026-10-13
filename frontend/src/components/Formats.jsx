import { formats } from '../content/speaking'

// The formats he offers, as a huge slow ticker on the ink band. Formats are provisional
// (see content/speaking.js). The ticker is decorative, so screen readers get a plain list.
export default function Formats() {
  const line = `${formats.items.join('  /  ')}  /  `

  return (
    <section className="bg-ink text-on-ink overflow-hidden py-16 md:py-24">
      <p className="font-body text-on-ink-label px-5 text-[13px] tracking-[0.14em] uppercase md:px-10">
        {formats.label}
      </p>

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

      <ul className="sr-only">
        {formats.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-on-ink-label mt-8 px-5 text-base md:px-10">{formats.note}</p>
    </section>
  )
}
