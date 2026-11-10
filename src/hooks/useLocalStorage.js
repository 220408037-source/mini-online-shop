
import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key)

      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue
    } catch {
      return initialValue
    }
  })

  const updateValue = (newValue) => {
    setValue((previousValue) => {
      const nextValue =
        typeof newValue === 'function'
          ? newValue(previousValue)
          : newValue

      try {
        localStorage.setItem(key, JSON.stringify(nextValue))
      } catch (error) {
        console.error('Could not save to localStorage:', error)
      }

      return nextValue
    })
  }

  return [value, updateValue]
}

export default useLocalStorage
