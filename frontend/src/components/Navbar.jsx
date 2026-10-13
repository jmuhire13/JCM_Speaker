import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'
import Button from './Button'
import { navLinks, site } from '../content/site'

const linkBase =
  'font-body text-[15px] font-medium border-b-2 pb-1 transition-colors'

// Pages whose opening is dark: until you scroll, the bar switches to light text.
const darkOpenings = ['/speaking', '/trusted-by', '/beyond-the-stage']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onDark = !scrolled && darkOpenings.includes(pathname)
  const panel = useRef(null)
  const tl = useRef(null)
  const closeBtn = useRef(null)

  // Cream bar with a thin line once the page has moved a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile panel: slides in, then the links rise one after another.
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          panel.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.9, ease: 'power4.inOut' },
        )
        .from(
          '.menu-item',
          { y: 40, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' },
          0.45,
        )
    },
    { scope: panel },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      tl.current.timeScale(1).play()
      window.__lenis?.stop()
      closeBtn.current?.focus()
    } else {
      tl.current.timeScale(1.4).reverse()
      window.__lenis?.start()
    }
  }, [open])

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-cream/95 border-line border-b backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <Link
          to="/"
          className={`font-display text-3xl tracking-wide transition-colors ${
            onDark ? 'text-cream' : 'text-ink'
          }`}
        >
          {site.name}
        </Link>

        <nav aria-label="Main menu" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? `border-ember ${onDark ? 'text-cream' : 'text-ink'}`
                    : onDark
                      ? 'text-on-ink hover:border-cream hover:text-cream border-transparent'
                      : 'text-soft hover:border-ink hover:text-ink border-transparent'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button to={site.inviteTo} variant={onDark ? 'cream' : 'ink'} className="!py-3 !text-sm">
            {site.inviteLabel}
          </Button>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={`md:hidden ${onDark ? 'text-cream' : 'text-ink'}`}
        >
          <Menu className="size-8" />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        ref={panel}
        inert={!open}
        className="bg-ink text-cream fixed inset-0 z-50 md:hidden"
      >
        <button
          ref={closeBtn}
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-5"
        >
          <X className="size-8" />
        </button>
        <nav
          aria-label="Mobile menu"
          className="flex h-full flex-col justify-center gap-5 px-6"
        >
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="menu-item font-display text-[clamp(2.5rem,12vw,4rem)] leading-none uppercase"
            >
              {l.label}
            </NavLink>
          ))}
          <div className="menu-item mt-6">
            <Button to={site.inviteTo} variant="cream" onClick={() => setOpen(false)}>
              {site.inviteLabel}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
