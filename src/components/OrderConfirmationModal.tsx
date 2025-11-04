import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductBySlug } from '../lib/products'
import Button from './Button'

type Props = {
  open: boolean
  onClose: () => void
  orderTotal: number
  orderId?: string | null
}

export default function OrderConfirmationModal({ open, onClose, orderTotal }: Props) {
  const { items } = useCart()

  const imagePath = (path: string) => path.replace('./assets/', '../assets/')

  if (!open) return null

  const firstItem = items[0] ? getProductBySlug(items[0].slug) : null
  const otherItemsCount = items.length - 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[540px] rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Checkmark Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D87D4A]">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="mb-4 text-center text-2xl font-bold uppercase tracking-[1px]">Thank You For Your Order</h2>
        <p className="mb-6 text-center text-[15px] text-black/50">You will receive an email confirmation shortly.</p>

        {/* Order Summary */}
        <div className="mb-6 overflow-hidden rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Items */}
            <div className="bg-[#F1F1F1] p-6">
              {firstItem && (
                <div className="mb-3 flex items-center gap-4">
                  <picture className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                    <img
                      src={imagePath(firstItem.image.mobile)}
                      alt={firstItem.name}
                      className="h-full w-full object-contain"
                    />
                  </picture>
                  <div className="flex-1">
                    <p className="text-[15px] font-bold">{firstItem.name.toUpperCase().replace(' HEADPHONES', '').replace(' SPEAKER', '').replace(' EARPHONES', '')}</p>
                    <p className="text-[14px] font-bold text-black/50">${firstItem.price.toLocaleString()}</p>
                  </div>
                  <span className="text-[15px] font-bold text-black/50">x{items[0]?.quantity || 1}</span>
                </div>
              )}
              {otherItemsCount > 0 && (
                <div className="border-t border-black/10 pt-3 text-center">
                  <p className="text-[12px] font-bold text-black/50">and {otherItemsCount} other item(s)</p>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="bg-black p-6 text-white">
              <p className="mb-2 text-[15px] uppercase text-white/50">Grand Total</p>
              <p className="text-lg font-bold">${orderTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <Link to="/" onClick={onClose}>
          <Button variant="primary" fullWidth>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

