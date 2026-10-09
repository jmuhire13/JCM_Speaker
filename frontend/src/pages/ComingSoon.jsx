import { Helmet } from 'react-helmet-async'

// Holding page for pages we have not built yet. We build one page at a time,
// and each is approved before the next begins.
export default function ComingSoon() {
  return (
    <main className="mx-auto grid min-h-svh max-w-[1400px] place-content-center px-5 text-center">
      <Helmet>
        <title>Coming soon | Jean Claude Muhire</title>
      </Helmet>
      <h1 className="font-hero text-ink text-[clamp(2.5rem,8vw,6rem)] uppercase">
        Coming soon
      </h1>
      <p className="text-soft mt-4">This page is next in line.</p>
    </main>
  )
}
