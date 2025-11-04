export type OrderItem = { id: string; name: string; price: number; quantity: number }

export type OrderTotals = { subtotal: number; shipping: number; tax: number; grandTotal: number }

export type Order = {
  id: string
  customer: { name: string; email: string; phone: string }
  shipping: { address: string; zip: string; city: string; country: string }
  items: OrderItem[]
  totals: OrderTotals
  status: 'confirmed' | 'pending'
  createdAt: string
}

