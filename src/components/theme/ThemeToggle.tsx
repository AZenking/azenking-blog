import { useEffect, useRef, useState } from 'react'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const isTransitioningRef = useRef(false)

  const setTheme = (dark: boolean) => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', dark ? '#09090b' : '#FFFFFF')
    }

    setIsDark(dark)
  }

  useEffect(() => {
    setMounted(true)

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    const initialDark = savedTheme === 'dark' || (savedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setTheme(initialDark)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === 'system') {
        setTheme(event.matches)
      }
    }

    media.addEventListener('change', onSystemChange)
    return () => media.removeEventListener('change', onSystemChange)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted || isTransitioningRef.current) return

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void>; finished: Promise<void> }
    }

    const nextDark = !document.documentElement.classList.contains('dark')
    const toggle = () => setTheme(nextDark)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || prefersReducedMotion) {
      toggle()
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    isTransitioningRef.current = true

    try {
      const root = document.documentElement
      root.style.setProperty('--theme-reveal-x', `${x}px`)
      root.style.setProperty('--theme-reveal-y', `${y}px`)
      root.style.setProperty('--theme-reveal-radius', `${radius}px`)
      root.classList.add('theme-transition-active')
      root.classList.toggle('theme-transition-to-dark', nextDark)
      root.classList.toggle('theme-transition-to-light', !nextDark)

      const transition = doc.startViewTransition(() => {
        toggle()
      })

      transition.ready
        .then(() => {
          if (nextDark) {
            document.documentElement.animate(
              {
                clipPath: [`circle(${radius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
                filter: ['brightness(1)', 'brightness(0.94)'],
              },
              {
                duration: 540,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'both',
                pseudoElement: '::view-transition-old(root)',
              }
            )
            return
          }

          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
              filter: ['brightness(1.06)', 'brightness(1)'],
            },
            {
              duration: 520,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
              pseudoElement: '::view-transition-new(root)',
            }
          )
        })
        .catch(() => {
          toggle()
        })

      transition.finished.finally(() => {
        root.classList.remove('theme-transition-active')
        root.classList.remove('theme-transition-to-dark', 'theme-transition-to-light')
        isTransitioningRef.current = false
      })
    } catch {
      document.documentElement.classList.remove('theme-transition-active', 'theme-transition-to-dark', 'theme-transition-to-light')
      isTransitioningRef.current = false
      toggle()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex size-6 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
      title="Toggle theme"
    >
      <span className={isDark ? 'icon-[tabler--moon-filled] size-5' : 'icon-[tabler--sun-filled] size-5'}></span>
    </button>
  )
}

export default ThemeToggle
