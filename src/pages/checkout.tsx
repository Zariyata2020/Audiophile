import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'
import { getProductBySlug } from '../lib/products'
import OrderConfirmationModal from '../components/OrderConfirmationModal'
import { saveOrderToBackend } from '../lib/convex'
import { sendOrderConfirmationEmail } from '../lib/email'
import type { Order } from '../types/order'

const schema = z
  .object({
    name: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(6, 'Invalid phone'),
    address: z.string().min(1, 'Required'),
    zip: z.string().min(3, 'Invalid ZIP'),
    city: z.string().min(1, 'Required'),
    country: z.string().min(1, 'Required'),
    paymentMethod: z.enum(['e-money', 'cash']),
    eMoneyNumber: z.string().optional(),
    eMoneyPIN: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === 'e-money') {
        return !!(data.eMoneyNumber && data.eMoneyNumber.length >= 9 && data.eMoneyPIN && data.eMoneyPIN.length >= 4)
      }
      return true
    },
    {
      message: 'e-Money number must be at least 9 digits and PIN at least 4 digits',
      path: ['eMoneyNumber'],
    }
  )
  .refine(
    (data) => {
      if (data.paymentMethod === 'e-money') {
        return !!(data.eMoneyNumber && data.eMoneyNumber.length >= 9 && data.eMoneyPIN && data.eMoneyPIN.length >= 4)
      }
      return true
    },
    {
      message: 'e-Money PIN must be at least 4 digits',
      path: ['eMoneyPIN'],
    }
  )

type FormValues = z.infer<typeof schema>

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FormValues>({ 
    resolver: zodResolver(schema), 
    mode: 'onBlur',
    defaultValues: {
      paymentMethod: 'e-money',
      eMoneyNumber: '',
      eMoneyPIN: '',
    }
  })
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const paymentMethod = watch('paymentMethod') || 'e-money'
  const subtotal = getTotalPrice()
  const shipping = 50
  const vat = Math.round(subtotal * 0.2)
  const grandTotal = subtotal + shipping + vat

  const imagePath = (path: string) => path.replace('./assets/', '../assets/')

  const onSubmit = async (values: FormValues) => {
    setIsSubmittingOrder(true)
    setSubmitError(null)

    try {
      // Validate cart is not empty
      if (items.length === 0) {
        throw new Error('Your cart is empty')
      }

      // Validate quantities
      const invalidItems = items.filter((item) => item.quantity <= 0)
      if (invalidItems.length > 0) {
        throw new Error('Invalid item quantities')
      }

      const orderItems = items.map((item) => {
        const product = getProductBySlug(item.slug)
        if (!product) {
          throw new Error(`Product not found: ${item.slug}`)
        }
        return {
          id: item.slug,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        }
      })

      // Create order object
      const orderData: any = {
        customer: { name: values.name, email: values.email, phone: values.phone },
        shipping: { address: values.address, zip: values.zip, city: values.city, country: values.country },
        paymentMethod: values.paymentMethod,
        items: orderItems,
        totals: { subtotal, shipping, tax: vat, grandTotal },
      }

      // Add e-Money details if applicable
      if (values.paymentMethod === 'e-money') {
        orderData.eMoneyNumber = values.eMoneyNumber
        orderData.eMoneyPIN = values.eMoneyPIN
      }

      // Save order to Convex
      const savedOrderId = await saveOrderToBackend(orderData as Order)

      // Create order for local storage and confirmation
      const order: Order = {
        id: savedOrderId,
        customer: orderData.customer,
        shipping: orderData.shipping,
        items: orderItems,
        totals: orderData.totals,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage as backup
      localStorage.setItem('lastOrder', JSON.stringify(order))

      // Send confirmation email
      const orderUrl = `${window.location.origin}/order-confirmation?orderId=${savedOrderId}`
      
      try {
        await sendOrderConfirmationEmail({
          to: values.email,
          orderId: savedOrderId,
          customerName: values.name,
          items: orderItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totals: orderData.totals,
          shipping: orderData.shipping,
          orderUrl,
        })
      } catch (emailError) {
        // Log email error but don't fail the order
        console.error('Failed to send email:', emailError)
      }

      setOrderId(savedOrderId)
      setOrderTotal(grandTotal)
      setShowConfirmation(true)
      clearCart()
    } catch (error) {
      console.error('Order submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to process order. Please try again.')
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  const field = (id: keyof FormValues, label: string, type = 'text', extra?: any) => (
    <div>
      <label htmlFor={id} className="block text-[12px] font-bold uppercase tracking-[1px]">{label}</label>
      <input
        id={id}
        type={type}
        className={`mt-2 w-full rounded-md border px-4 py-3 text-[14px] font-bold outline-none transition-colors focus:ring-2 focus:ring-[#D87D4A] ${errors[id] ? 'border-red-500' : 'border-[#CFCFCF]'}`}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        {...register(id, extra)}
      />
      {errors[id] && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[12px] text-red-600">{errors[id]?.message as string}</p>
      )}
    </div>
  )

  // Always render something visible
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] w-full py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold uppercase tracking-[1px]">Your cart is empty</h1>
        <p className="mb-6 text-black/70">Add some products to your cart to proceed to checkout.</p>
        <Button onClick={() => navigate('/')} variant="primary">
          Go Shopping
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="w-full min-h-screen pb-16 pt-8">
        <button onClick={() => navigate(-1)} className="mb-6 text-black/50 hover:text-[#D87D4A] transition-colors">
          Go Back
        </button>

        <h1 className="mb-10 text-2xl font-bold uppercase tracking-[1px] sm:text-[32px]">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-32">
          {/* Checkout Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Billing Details */}
            <fieldset className="space-y-6">
              <legend className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-[#D87D4A]">Billing Details</legend>
              <div className="grid gap-6 sm:grid-cols-2">
                {field('name', 'Name')}
                {field('email', 'Email Address', 'email')}
              </div>
              {field('phone', 'Phone Number', 'tel')}
            </fieldset>

            {/* Shipping Info */}
            <fieldset className="space-y-6">
              <legend className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-[#D87D4A]">Shipping Info</legend>
              {field('address', 'Your Address')}
              <div className="grid gap-6 sm:grid-cols-3">
                {field('zip', 'ZIP Code')}
                {field('city', 'City')}
                {field('country', 'Country')}
              </div>
            </fieldset>

            {/* Payment Details */}
            <fieldset className="space-y-6">
              <legend className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-[#D87D4A]">Payment Details</legend>
              <div>
                <label className="mb-4 block text-[12px] font-bold uppercase tracking-[1px]">Payment Method</label>
                <div className="space-y-4">
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      paymentMethod === 'e-money' ? 'border-[#D87D4A]' : 'border-[#CFCFCF] hover:border-[#D87D4A]'
                    }`}
                  >
                    <input
                      type="radio"
                      value="e-money"
                      {...register('paymentMethod')}
                      className="h-5 w-5 accent-[#D87D4A]"
                    />
                    <span className="text-[14px] font-bold">e-Money</span>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      paymentMethod === 'cash' ? 'border-[#D87D4A]' : 'border-[#CFCFCF] hover:border-[#D87D4A]'
                    }`}
                  >
                    <input
                      type="radio"
                      value="cash"
                      {...register('paymentMethod')}
                      className="h-5 w-5 accent-[#D87D4A]"
                    />
                    <span className="text-[14px] font-bold">Cash on Delivery</span>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="mt-2 text-[12px] text-red-600">{errors.paymentMethod.message}</p>
                )}
              </div>

              {paymentMethod === 'e-money' && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {field('eMoneyNumber', 'e-Money Number', 'text', { pattern: '^[0-9]{9,}$' })}
                  {field('eMoneyPIN', 'e-Money PIN', 'text', { pattern: '^[0-9]{4,}$' })}
                </div>
              )}
            </fieldset>
          </form>

          {/* Summary */}
          <div className="h-fit rounded-lg bg-white p-6 lg:sticky lg:top-24">
            <h2 className="mb-6 text-lg font-bold uppercase tracking-[1px]">Summary</h2>
            <div className="mb-6 space-y-4">
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
                    <span className="text-[15px] font-bold text-black/50">x{item.quantity}</span>
                  </div>
                )
              })}
            </div>

            <div className="space-y-2 border-t pt-6">
              <div className="flex justify-between text-[15px] uppercase">
                <span className="text-black/50">Total</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[15px] uppercase">
                <span className="text-black/50">Shipping</span>
                <span className="font-bold">${shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[15px] uppercase">
                <span className="text-black/50">VAT (Included)</span>
                <span className="font-bold">${vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4 text-[18px]">
                <span className="text-black/50">Grand Total</span>
                <span className="font-bold text-[#D87D4A]">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {submitError && (
              <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600" role="alert">
                <p className="text-sm font-medium">{submitError}</p>
              </div>
            )}
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || isSubmittingOrder}
              variant="primary"
              fullWidth
              className="mt-6"
            >
              {isSubmitting || isSubmittingOrder ? 'Processing…' : 'Continue & Pay'}
            </Button>
          </div>
        </div>
      </div>

      <OrderConfirmationModal 
        open={showConfirmation} 
        onClose={() => {
          setShowConfirmation(false)
          if (orderId) {
            navigate(`/order-confirmation?orderId=${orderId}`)
          }
        }} 
        orderTotal={orderTotal}
        orderId={orderId}
      />
    </>
  )
}

