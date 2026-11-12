import { Helmet } from 'react-helmet-async'
import Accent from '../lib/Accent'
import { privacy } from '../content/privacy'

// The privacy policy: a quiet reading page. The title stays in view on the left while the
// numbered sections scroll on the right. No animation, so the text is there at once.
// All words are in content/privacy.js.
export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy policy | Jean Claude Muhire</title>
        <meta name="description" content={privacy.description} />
        <meta property="og:title" content="Privacy policy | Jean Claude Muhire" />
        <meta property="og:description" content={privacy.description} />
      </Helmet>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pt-36 pb-24 md:grid-cols-[1fr_1.4fr] md:gap-20 md:px-10 md:pt-48 md:pb-40">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="font-body text-muted text-[13px] tracking-[0.14em] uppercase">
              {privacy.label}
            </p>
            <h1 className="font-hero text-ink mt-6 text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95] text-balance uppercase">
              <Accent text={privacy.headline} word={privacy.accent} className="text-gold-deep" />
            </h1>
            <p className="text-soft mt-8 max-w-md text-lg leading-relaxed">{privacy.intro}</p>
            <p className="text-muted mt-6 text-sm">Last updated {privacy.updated}</p>
          </div>

          <div>
            <ol className="border-ink border-t-2">
              {privacy.sections.map((s, i) => (
                <li key={s.title} className="border-line grid gap-4 border-b py-8 md:grid-cols-[4rem_1fr] md:py-10">
                  <p aria-hidden="true" className="font-hero text-gold-deep text-3xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <h2 className="font-display text-ink text-2xl tracking-wide uppercase md:text-3xl">
                      {s.title}
                    </h2>
                    <div className="text-soft mt-3 max-w-2xl space-y-3 text-[17px] leading-relaxed">
                      {s.text.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <p className="text-soft mt-10 text-lg">
              {privacy.contactLabel}{' '}
              <a
                href={`mailto:${privacy.email}`}
                className="text-ink decoration-gold-deep font-medium underline underline-offset-4"
              >
                {privacy.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
