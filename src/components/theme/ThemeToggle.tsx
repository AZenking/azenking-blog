import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'motion/react'
import { useStore } from '@nanostores/react'
import { themeStore } from '~/stores/theme'

const iconVariants = {
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
  },
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: 180,
  },
}

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const theme = useStore(themeStore)
  const controlsSun = useAnimation()
  const controlsMoon = useAnimation()
  const controlsSystem = useAnimation()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system'
    themeStore.set(savedTheme || 'system')
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (theme === 'system') {
      controlsSun.start('hidden')
      controlsSystem.start('visible')
      controlsMoon.start('hidden')
    } else {
      controlsSun.start(theme === 'light' ? 'visible' : 'hidden')
      controlsMoon.start(theme === 'dark' ? 'visible' : 'hidden')
      controlsSystem.start('hidden')
    }

    localStorage.setItem('theme', theme)
    applyTheme(theme)
  }, [theme, mounted, controlsSun, controlsMoon, controlsSystem])

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement
    const isViewTransitionSwitch = (window as Window & { __theme_view_transition__?: boolean }).__theme_view_transition__ === true

    // 非 View Transition 切换时，禁用常规过渡防闪烁
    if (!isViewTransitionSwitch) {
      root.classList.add('disable-transition')
    }

    const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.classList.toggle('dark', isDark)

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#09090b' : '#FFFFFF')
    }

    if (!isViewTransitionSwitch) {
      setTimeout(() => {
        root.classList.remove('disable-transition')
      }, 300)
    }
  }

  const resolveIsDark = (targetTheme: 'light' | 'dark' | 'system') => {
    if (targetTheme === 'dark') return true
    if (targetTheme === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as Document & {
      startViewTransition?: (callback: () => void | Promise<void>) => { ready: Promise<void> }
    }
    const isCurrentDark = document.documentElement.classList.contains('dark')
    const nextTheme: 'light' | 'dark' = isCurrentDark ? 'light' : 'dark'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || prefersReducedMotion) {
      themeStore.set(nextTheme)
      return
    }

    const x = event.clientX || window.innerWidth / 2
    const y = event.clientY || window.innerHeight / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const isNextDark = resolveIsDark(nextTheme)

    try {
      const transition = doc.startViewTransition(async () => {
        ;(window as Window & { __theme_view_transition__?: boolean }).__theme_view_transition__ = true
        themeStore.set(nextTheme)
        applyTheme(nextTheme)
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve())
        })
      })

      transition.ready
        .then(() => {
          const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]

          document.documentElement.animate(
            { clipPath: isNextDark ? [...clipPath].reverse() : clipPath },
            {
              duration: 400,
              easing: 'ease-out',
              pseudoElement: isNextDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
            }
          )
        })
        .catch(() => {
          themeStore.set(nextTheme)
        })
        .finally(() => {
          ;(window as Window & { __theme_view_transition__?: boolean }).__theme_view_transition__ = false
        })
    } catch {
      ;(window as Window & { __theme_view_transition__?: boolean }).__theme_view_transition__ = false
      themeStore.set(nextTheme)
    }
  }

  return (
    <button onClick={handleClick} className="relative size-5 flex items-center justify-center cursor-pointer" aria-label="切换主题">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="relative size-5 flex items-center justify-center">
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsSun}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <span className="icon-[tabler--sun-filled] size-5"></span>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsSystem}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <span className="icon-[tabler--device-desktop-question] size-5"></span>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsMoon}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <span className="icon-[tabler--moon-filled] size-5"></span>
        </motion.div>
      </motion.div>
    </button>
  )
}

export default ThemeToggle
