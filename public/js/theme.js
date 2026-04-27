;(function () {
  const STORAGE_KEY = 'theme'

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const root = document.documentElement

  function applyTheme() {
    root.classList.add('dark')
  }

  applyTheme()

  prefersDark.addEventListener('change', () => {
    if (localStorage.getItem(STORAGE_KEY) === 'system') {
      applyTheme()
    }
  })

  document.addEventListener('astro:after-swap', () => {
    applyTheme()
  })
})()
