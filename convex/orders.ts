import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createOrder = mutation({
  args: {
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      zip: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.string(),
    eMoneyNumber: v.optional(v.string()),
    eMoneyPIN: v.optional(v.string()),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      grandTotal: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert('orders', {
      customerName: args.customer.name,
      customerEmail: args.customer.email,
      customerPhone: args.customer.phone,
      shippingAddress: args.shipping.address,
      shippingZip: args.shipping.zip,
      shippingCity: args.shipping.city,
      shippingCountry: args.shipping.country,
      paymentMethod: args.paymentMethod,
      eMoneyNumber: args.eMoneyNumber,
      eMoneyPIN: args.eMoneyPIN,
      items: args.items,
      subtotal: args.totals.subtotal,
      shipping: args.totals.shipping,
      tax: args.totals.tax,
      grandTotal: args.totals.grandTotal,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    })

    return orderId
  },
})

export const getOrder = query({
  args: { orderId: v.id('orders') },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId)
    if (!order) return null

    // Convert to Order type format
    return {
      id: order._id,
      customer: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
      },
      shipping: {
        address: order.shippingAddress,
        zip: order.shippingZip,
        city: order.shippingCity,
        country: order.shippingCountry,
      },
      items: order.items,
      totals: {
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        grandTotal: order.grandTotal,
      },
      status: order.status as 'confirmed' | 'pending',
      createdAt: order.createdAt,
    }
  },
})

export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query('orders')
      .withIndex('by_email', (q) => q.eq('customerEmail', args.email))
      .order('desc')
      .collect()

    return orders.map((order) => ({
      id: order._id,
      customer: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
      },
      shipping: {
        address: order.shippingAddress,
        zip: order.shippingZip,
        city: order.shippingCity,
        country: order.shippingCountry,
      },
      items: order.items,
      totals: {
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        grandTotal: order.grandTotal,
      },
      status: order.status,
      createdAt: order.createdAt,
    }))
  },
})
