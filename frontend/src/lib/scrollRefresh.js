import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Scroll animations measure the page; when the fonts arrive, text sizes change, so they must
// measure again. Several sections ask for this at the same moment. Recomputing every trigger
// is expensive on a phone (QA T-03: up to 1.3 s of blocked screen), so all requests made while
// the fonts load are merged into ONE refresh.
let pending = false

export default function refreshAfterFonts() {
  if (pending) return
  pending = true
  document.fonts.ready.then(() =>
    requestAnimationFrame(() => {
      pending = false
      ScrollTrigger.refresh()
    }),
  )
}
