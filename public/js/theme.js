;(function () {
  const root = document.documentElement

  function applyTheme() {
    root.classList.add('dark')
  }

  applyTheme()

  document.addEventListener('astro:after-swap', () => {
    applyTheme()
  })
})()
