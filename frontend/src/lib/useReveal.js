import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Fade and rise: elements matching `selector` (inside `scope`) start hidden and
// glide into place the first time they scroll into view. Elements that enter at
// the same moment arrive one after another. Skipped for visitors who asked their
// device for less motion, who simply see the finished page.
export default function useReveal(scope, selector, { y = 40, stagger = 0.1, start = 'top 88%' } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const els = gsap.utils.toArray(selector)
        if (!els.length) return

        gsap.set(els, { opacity: 0, y })
        ScrollTrigger.batch(els, {
          start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger,
              ease: 'power3.out',
              overwrite: true,
            }),
        })
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      })

      return () => mm.revert()
    },
    { scope },
  )
}
