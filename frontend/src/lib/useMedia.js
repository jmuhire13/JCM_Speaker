import { useSyncExternalStore } from 'react'

// Returns true while the browser matches a media query, and updates live.
// Example: useMedia('(min-width: 768px)') is true on tablets and larger.
export default function useMedia(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
