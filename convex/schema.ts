import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  orders: defineTable({
    // Customer details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    
    // Shipping details
    shippingAddress: v.string(),
    shippingZip: v.string(),
    shippingCity: v.string(),
    shippingCountry: v.string(),
    
    // Payment details
    paymentMethod: v.string(), // 'e-money' or 'cash'
    eMoneyNumber: v.optional(v.string()),
    eMoneyPIN: v.optional(v.string()),
    
    // Order items
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    
    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    grandTotal: v.number(),
    
    // Order status
    status: v.string(), // 'confirmed', 'pending', 'shipped', 'delivered'
    
    // Timestamps
    createdAt: v.string(),
  })
    .index('by_email', ['customerEmail'])
    .index('by_status', ['status'])
    .index('by_created', ['createdAt']),
})

