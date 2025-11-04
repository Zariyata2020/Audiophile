import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api'
import type { Order } from '../../types/order'

// Initialize Convex client - set VITE_CONVEX_URL in your .env file
// You can get this URL after running `npx convex dev`
const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
  console.warn('VITE_CONVEX_URL not set. Convex features will be disabled.')
}

const convex = convexUrl ? new ConvexHttpClient(convexUrl) : null

export async function saveOrderToBackend(order: Order): Promise<string> {
  try {
    if (!convex) {
      // Fallback: return a mock ID if Convex is not configured
      console.warn('Convex not configured, using mock order ID')
      return `mock-${Date.now()}`
    }

    // Convert Order type to Convex mutation format
    const orderId = await convex.mutation(api.orders.createOrder, {
      customer: order.customer,
      shipping: order.shipping,
      paymentMethod: (order as any).paymentMethod || 'cash',
      eMoneyNumber: (order as any).eMoneyNumber,
      eMoneyPIN: (order as any).eMoneyPIN,
      items: order.items,
      totals: order.totals,
    })

    return orderId
  } catch (error) {
    console.error('Error saving order to Convex:', error)
    // Fallback to mock ID if Convex fails
    return `fallback-${Date.now()}`
  }
}

export async function getOrderFromBackend(orderId: string): Promise<Order | null> {
  try {
    if (!convex) {
      return null
    }

    const order = await convex.query(api.orders.getOrder, { orderId: orderId as any })
    if (!order) return null
    
    // Ensure status is properly typed to match Order type
    return {
      ...order,
      status: (order.status === 'confirmed' || order.status === 'pending' ? order.status : 'confirmed') as 'confirmed' | 'pending'
    }
  } catch (error) {
    console.error('Error fetching order from Convex:', error)
    return null
  }
}

export async function sendOrderEmail(params: {
  to: string
  orderId: string
  customerName: string
  items: Array<{ name: string; price: number; quantity: number }>
  totals: { subtotal: number; shipping: number; tax: number; grandTotal: number }
  shipping: { address: string; zip: string; city: string; country: string }
  orderUrl: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!convex) {
      console.warn('Convex not configured, email not sent')
      return { success: false, error: 'Email service not configured' }
    }

    const result = await convex.action(api.email.sendOrderConfirmation, params)
    return result
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
