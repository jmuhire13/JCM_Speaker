import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import { darkOpenings } from './lib/darkOpenings'
import Footer from './components/Footer'
import Home from './pages/Home'

// Speed: Home is in the first download because most visitors land there. Every other page is
// fetched only when someone opens it, so the first load stays small.
const Speaking = lazy(() => import('./pages/Speaking'))
const MyStory = lazy(() => import('./pages/MyStory'))
const BeyondTheStage = lazy(() => import('./pages/BeyondTheStage'))
const TrustedBy = lazy(() => import('./pages/TrustedBy'))
const Connect = lazy(() => import('./pages/Connect'))
const Privacy = lazy(() => import('./pages/Privacy'))
const ComingSoon = lazy(() => import('./pages/ComingSoon'))

gsap.registerPlugin(ScrollTrigger)

// Go back to the top whenever the page changes.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Shown for a moment while a page's code is arriving. It fills the screen so the footer does not
// jump up, and it is dark on pages with a dark opening so the light navbar text stays readable.
function PageFallback() {
  const { pathname } = useLocation()
  return <div className={`min-h-svh ${darkOpenings.includes(pathname) ? 'bg-ink' : 'bg-cream'}`} />
}

function App() {
  // Smooth scrolling, driven by GSAP's clock so scroll animations stay in sync.
  // Skipped for visitors who asked their device to reduce motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/my-story" element={<MyStory />} />
        <Route path="/beyond-the-stage" element={<BeyondTheStage />} />
        <Route path="/trusted-by" element={<TrustedBy />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
