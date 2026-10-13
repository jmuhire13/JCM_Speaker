import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, useGSAP)

// The shared opening animation for inner pages. Give the page's opening section:
//   - class "gate" (hidden for a moment while it prepares; a CSS fallback reveals it anyway),
//   - ".ph-label" on the small label,
//   - ".ph-title" on the headline (it rises line by line out of a mask),
//   - ".ph-after" on everything that should fade up afterwards (intro, buttons, pictures).
// Visitors who prefer reduced motion simply see the finished page.
export default function useHeroReveal(root) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rest = gsap
          .timeline({ paused: true })
          .from('.ph-label', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
          .from(
            '.ph-after',
            { y: 40, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out' },
            0.5,
          )

        let started = false
        SplitText.create('.ph-title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            gsap.set(root.current, { visibility: 'visible' })
            if (!started) {
              started = true
              rest.play()
            }
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.1,
              ease: 'power4.out',
            })
          },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(root.current, { visibility: 'visible' })
      })

      return () => mm.revert()
    },
    { scope: root },
  )
}
