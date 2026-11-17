// The endless moving bands (photo walls, logo rows, ghost years, formats line, footer band) keep
// the phone busy even when they are far off screen. This pauses each one while it is out of
// view and restarts it when it comes back (QA T-02). The bands look exactly the same to the
// visitor; it only saves work. The pause button (MotionToggle) still stops them everywhere.
// CSS: `.is-offscreen` in index.css.
const BANDS = '.marquee-track, .drift-up, .drift-down, .slide-left-slow, .slide-right-slow'

export default function startOffscreenPause() {
  if (typeof IntersectionObserver === 'undefined') return () => {}
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)),
    { rootMargin: '200px 0px' }, // start a little before a band scrolls into view
  )
  const watched = new WeakSet()
  const scan = () => {
    document.querySelectorAll(BANDS).forEach((el) => {
      if (watched.has(el)) return
      watched.add(el)
      io.observe(el)
    })
  }
  // Pages load in pieces, so look for new bands whenever the page content changes.
  let queued = false
  const mo = new MutationObserver(() => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      scan()
    })
  })
  scan()
  mo.observe(document.body, { childList: true, subtree: true })
  return () => {
    io.disconnect()
    mo.disconnect()
  }
}
