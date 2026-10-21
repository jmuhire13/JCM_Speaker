import { useRef } from 'react'
import Button from './Button'
import useReveal from '../lib/useReveal'
import { closing, site } from '../content/site'

// The closing invitation. Every page ends with this same call to action.
export default function Invitation() {
  const root = useRef(null)
  useReveal(root, '.inv-reveal', { y: 40, stagger: 0.14 })

  return (
    <section ref={root} className="bg-green-deep">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-44">
        <h2 className="inv-reveal font-hero text-cream max-w-5xl text-balance text-[clamp(3rem,9vw,9rem)] leading-[0.95] uppercase">
          {closing.heading}
        </h2>
        <p className="inv-reveal text-on-green mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
          {closing.text}
        </p>
        <div className="inv-reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Button to={site.inviteTo} variant="cream">
            {site.inviteLabel}
          </Button>
          {/* Appears once the one-page summary PDF exists (set closing.summaryUrl) */}
          {closing.summaryUrl && (
            <a
              href={closing.summaryUrl}
              className="text-cream decoration-gold text-[15px] font-medium underline underline-offset-4"
            >
              {closing.summaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
