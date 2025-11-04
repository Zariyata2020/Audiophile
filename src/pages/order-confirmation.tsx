import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getOrderFromBackend } from '../lib/convex'
import type { Order } from '../types/order'

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams()
  const orderIdFromUrl = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        // Try to get order from URL first
        if (orderIdFromUrl) {
          const fetchedOrder = await getOrderFromBackend(orderIdFromUrl)
          if (fetchedOrder) {
            setOrder(fetchedOrder)
            setLoading(false)
            return
          }
        }

        // Fallback to localStorage
        try {
          const raw = localStorage.getItem('lastOrder')
          if (raw) {
            const parsedOrder = JSON.parse(raw) as Order
            setOrder(parsedOrder)
          } else {
            setError('Order not found')
          }
        } catch {
          setError('Failed to load order')
        }
      } catch (err) {
        console.error('Error loading order:', err)
        setError('Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderIdFromUrl])

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-[1px]">Loading order...</h1>
      </section>
    )
  }

  if (error || !order) {
    return (
      <section className="py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold uppercase tracking-[1px]">Order Not Found</h1>
        <p className="mb-6 text-black/70">{error || 'Unable to load order details'}</p>
        <Link to="/" className="text-[#D87D4A] hover:underline">
          Return to Home
        </Link>
      </section>
    )
  }

  return (
    <section className="py-10">
      <h1 className="text-2xl font-bold uppercase tracking-[1px]">Thank you for your order</h1>
      <p className="mt-4 text-black/70">
        We have emailed your order confirmation to <strong>{order.customer.email}</strong>, and will update you when it ships.
      </p>

      {order && (
        <div className="mt-8 grid gap-6 rounded-lg bg-[#F1F1F1] p-6">
          <div>
            <h2 className="font-bold">Order ID</h2>
            <p className="text-sm text-black/70">{order.id}</p>
          </div>

          <div>
            <h3 className="font-bold">Items</h3>
            <ul className="mt-2 divide-y">
              {order.items.map((it) => (
                <li key={it.id} className="flex items-center justify-between py-2 text-sm">
                  <span>{it.name} x{it.quantity}</span>
                  <span>${it.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${order.totals.subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${order.totals.shipping.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${order.totals.tax.toLocaleString()}</span></div>
            <div className="mt-2 flex justify-between font-bold"><span>Grand Total</span><span>${order.totals.grandTotal.toLocaleString()}</span></div>
          </div>

          <div className="grid gap-1 text-sm">
            <h3 className="font-bold">Customer</h3>
            <p>{order.customer.name}</p>
            <p className="text-black/70">{order.customer.email}</p>
            <p className="text-black/70">{order.customer.phone}</p>
          </div>

          <div className="grid gap-1 text-sm">
            <h3 className="font-bold">Shipping</h3>
            <p>{order.shipping.address}</p>
            <p className="text-black/70">{order.shipping.city}, {order.shipping.zip}, {order.shipping.country}</p>
          </div>
        </div>
      )}

      <Link to="/" className="mt-8 inline-block underline">View your order</Link>
    </section>
  )
}

