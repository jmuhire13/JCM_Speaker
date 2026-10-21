import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { closing } from '../content/site'
import { directContact, nextSteps } from '../content/connect'
import SocialLinks from './SocialLinks'

// Three plain steps, then the direct email (and the summary download once it exists).
export default function NextSteps() {
  const root = useRef(null)
  useReveal(root, '.ns-reveal', { y: 44, stagger: 0.12 })

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <h2 className="ns-reveal font-hero text-ink text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] uppercase">
          {nextSteps.heading}
        </h2>

        <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {nextSteps.items.map((step) => (
            <li key={step.number} className="ns-reveal border-ink border-t-2 pt-6">
              <p className="font-hero [-webkit-text-stroke:2px_#1f1a1d] text-7xl leading-none text-transparent">
                {step.number}
              </p>
              <h3 className="font-display text-ink mt-4 text-3xl tracking-wide uppercase md:text-4xl">
                {step.title}
              </h3>
              <p className="text-soft mt-3 text-lg leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="ns-reveal border-line-strong mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t pt-8">
          <p className="font-body text-muted text-[13px] tracking-[0.14em] uppercase">
            {directContact.label}
          </p>
          <a
            href={`mailto:${directContact.email}`}
            className="font-display text-ink decoration-gold-deep text-3xl underline underline-offset-4 md:text-4xl"
          >
            {directContact.email}
          </a>
          {/* Appears once the one-page summary PDF exists (set closing.summaryUrl) */}
          {closing.summaryUrl && (
            <a
              href={closing.summaryUrl}
              className="text-ink decoration-gold-deep text-[15px] font-medium underline underline-offset-4"
            >
              {closing.summaryLabel}
            </a>
          )}
          <SocialLinks className="text-ink hover:bg-ink hover:text-cream border-ink/30" />
        </div>
      </div>
    </section>
  )
}
