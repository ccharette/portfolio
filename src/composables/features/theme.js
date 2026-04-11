import { ref } from 'vue'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.__INITIAL_THEME__) {
    return window.__INITIAL_THEME__ === 'dark'
  }

  return document.documentElement.classList.contains('dark')
}

const isDark = ref(getInitialTheme())

export const useTheme = () => {
  function toggleTheme() {
    isDark.value = !isDark.value

    const root = document.documentElement
    const body = document.body
    const app = document.getElementById('app')

    if (isDark.value) {
      root.classList.add('dark')
      body.classList.add('dark')
      app?.classList.add('dark')

      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      body.classList.remove('dark')
      app?.classList.remove('dark')

      localStorage.setItem('theme', 'light')
    }
  }

  return {
    isDark,
    toggleTheme,
  }
}
