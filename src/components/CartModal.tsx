import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductBySlug } from '../lib/products'
import QuantitySelector from './QuantitySelector'
import Button from './Button'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CartModal({ open, onClose }: Props) {
  const { items, updateQuantity, clearCart, getTotalPrice } = useCart()

  const imagePath = (path: string) => path.replace('./assets/', '../assets/')

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 bg-black/40 transition-opacity"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-16 h-auto max-h-[calc(100vh-4rem)] w-full max-w-[377px] rounded-lg bg-white p-6 shadow-lg sm:top-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          {/* Cart Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 id="cart-title" className="text-lg font-bold uppercase tracking-[1px]">Cart ({items.length})</h2>
            {items.length > 0 && (
              <button onClick={clearCart} className="text-[15px] text-black/50 underline hover:text-black">
                Remove all
              </button>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-black/50">Your cart is empty</p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  const product = getProductBySlug(item.slug)
                  if (!product) return null

                  return (
                    <div key={item.slug} className="flex items-center gap-4">
                      <picture className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#F1F1F1]">
                        <img
                          src={imagePath(product.image.mobile)}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </picture>
                      <div className="flex-1">
                        <p className="text-[15px] font-bold">{product.name.toUpperCase().replace(' HEADPHONES', '').replace(' SPEAKER', '').replace(' EARPHONES', '')}</p>
                        <p className="text-[14px] font-bold text-black/50">${product.price.toLocaleString()}</p>
                      </div>
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.slug, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.slug, item.quantity - 1)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Total and Checkout */}
          {items.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[15px] uppercase text-black/50">Total</span>
                <span className="text-lg font-bold">${getTotalPrice().toLocaleString()}</span>
              </div>
              <Link to="/checkout" onClick={onClose}>
                <Button variant="primary" fullWidth>
                  Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

