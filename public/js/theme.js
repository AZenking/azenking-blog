;(function () {
  const root = document.documentElement
  const STORAGE_KEY = 'theme'
  const DEFAULT_THEME = 'dark'
  const VALID_THEMES = ['dark', 'light']
  const THEME_COLORS = {
    dark: '#0d0d0d',
    light: '#fbfaf8',
  }
  let toggleHandler = null

  function getStoredTheme() {
    try {
      const value = localStorage.getItem(STORAGE_KEY)
      return VALID_THEMES.includes(value) ? value : null
    } catch (_err) {
      return null
    }
  }

  function applyTheme(theme) {
    const resolved = VALID_THEMES.includes(theme) ? theme : DEFAULT_THEME
    root.classList.remove('dark', 'light')
    root.classList.add(resolved)
    root.style.colorScheme = resolved

    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.setAttribute('content', THEME_COLORS[resolved])

    const button = document.getElementById('theme-toggle')
    if (button) {
      button.setAttribute('data-theme', resolved)
      button.setAttribute(
        'aria-label',
        resolved === 'dark' ? '切换到亮色模式' : '切换到暗色模式',
      )
      button.setAttribute(
        'title',
        resolved === 'dark' ? '切换到亮色模式' : '切换到暗色模式',
      )
    }
  }

  function toggleTheme() {
    const current = root.classList.contains('light') ? 'light' : 'dark'
    const next = current === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (_err) {
      /* localStorage 不可用时仅本次切换 */
    }
    applyTheme(next)
  }

  function bindToggle() {
    const button = document.getElementById('theme-toggle')
    if (!button) return
    if (toggleHandler) button.removeEventListener('click', toggleHandler)
    toggleHandler = toggleTheme
    button.addEventListener('click', toggleHandler)
  }

  function init() {
    applyTheme(getStoredTheme())
    bindToggle()
  }

  // 首次同步执行(head 内 inline script,避免主题闪屏)
  applyTheme(getStoredTheme())

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // Astro view transitions:DOM 替换后重新绑定按钮
  document.addEventListener('astro:after-swap', init)
})()
