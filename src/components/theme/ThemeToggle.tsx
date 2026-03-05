import { useEffect, useRef, useState } from 'react'

type FillMode = 'none' | 'forwards' | 'backwards' | 'both' | 'auto'

const chooseFill = (): FillMode => {
  const uach = (navigator as Navigator & { userAgentData?: { brands?: { brand: string; version: string }[] } }).userAgentData
  if (uach?.brands?.length) {
    const isChromiumBrand = uach.brands.some((b) => /Chrom(e|ium)/i.test(b.brand))
    return isChromiumBrand ? 'both' : 'none'
  }
  return 'none'
}

const viewTransitionFill = chooseFill()

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

    const x = event.clientX || window.innerWidth / 2
    const y = event.clientY || window.innerHeight / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    isTransitioningRef.current = true

    try {
      const transition = doc.startViewTransition(() => {
        toggle()
      })

      transition.ready
        .then(() => {
          const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
          document.documentElement.animate(
            { clipPath: nextDark ? [...clipPath].reverse() : clipPath },
            {
              duration: 480,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: viewTransitionFill,
              pseudoElement: nextDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
            }
          )
        })
        .catch(() => {
          toggle()
        })

      transition.finished.finally(() => {
        isTransitioningRef.current = false
      })
    } catch {
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
