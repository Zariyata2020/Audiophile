import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { getProductBySlug } from '../lib/products'

export type CartItem = {
  slug: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (slug: string, quantity?: number) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CART_STORAGE_KEY = 'audiophile_cart'

// Load cart from localStorage
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as CartItem[]
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error)
  }
  return []
}

// Save cart to localStorage
function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage())

  // Save to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(items)
  }, [items])

  const addItem = (slug: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === slug)
      if (existing) {
        return prev.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { slug, quantity }]
    })
  }

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug))
  }

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug)
      return
    }
    setItems((prev) => prev.map((item) => (item.slug === slug ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      const product = getProductBySlug(item.slug)
      return sum + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

