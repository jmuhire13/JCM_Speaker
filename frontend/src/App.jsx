import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Speaking from './pages/Speaking'
import MyStory from './pages/MyStory'
import BeyondTheStage from './pages/BeyondTheStage'
import TrustedBy from './pages/TrustedBy'
import ComingSoon from './pages/ComingSoon'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/my-story" element={<MyStory />} />
        <Route path="/beyond-the-stage" element={<BeyondTheStage />} />
        <Route path="/trusted-by" element={<TrustedBy />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
