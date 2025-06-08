// public/js/theme.js
;(function () {
  // 获取系统主题偏好
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  // 获取存储的主题或使用系统主题
  const theme = localStorage.getItem('theme') || 'system'
  const root = document.documentElement

  // 立即应用主题
  if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (theme === 'system') {
      if (e.matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  })
})()

// 监听 astro:after-swap 事件以更新主题
// Listen for the astro:after-swap event to update the theme
document.addEventListener('astro:after-swap', () => {
  const theme = localStorage.getItem('theme')
  const root = document.documentElement

  // 根据主题设置或系统偏好来添加或移除暗色类
  // Add or remove the dark class based on the theme setting or system preference
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
})
