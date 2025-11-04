// Email sending is now handled through Convex actions
import { sendOrderEmail } from '../convex'

export async function sendOrderConfirmationEmail(params: {
  to: string
  orderId: string
  customerName: string
  items: Array<{ name: string; price: number; quantity: number }>
  totals: { subtotal: number; shipping: number; tax: number; grandTotal: number }
  shipping: { address: string; zip: string; city: string; country: string }
  orderUrl: string
}): Promise<{ success: boolean; error?: string }> {
  return await sendOrderEmail(params)
}

