import { ref, watchEffect } from 'vue'

const isLight = ref(localStorage.getItem('theme') === 'light')

watchEffect(() => {
  const root = document.documentElement
  if (isLight.value) {
    root.classList.add('light')
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    root.classList.remove('light')
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
})

export function useTheme() {
  return {
    isLight,
    toggleTheme: () => { isLight.value = !isLight.value }
  }
}