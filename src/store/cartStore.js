
import { create } from 'zustand'

const STORAGE_KEY = 'mini-shop-cart'

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

export const useCartStore = create((set) => ({
  items: loadCart(),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === product.id
      )

      const items = existingItem
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...product, quantity: 1 }]

      return { items }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
    })),

  clear: () => set({ items: [] }),
}))

// Persist cart changes using Zustand subscription
useCartStore.subscribe((state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
})
