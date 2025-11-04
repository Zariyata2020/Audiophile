import { Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages'
import HeadphonesPage from './pages/headphones'
import SpeakersPage from './pages/speakers'
import EarphonesPage from './pages/earphones'
import ProductDetailPage from './pages/product/[slug]'
import CheckoutPage from './pages/checkout'
import OrderConfirmationPage from './pages/order-confirmation'

function App() {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-white text-neutral-900">
        <Navbar />
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/headphones" element={<HeadphonesPage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/earphones" element={<EarphonesPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
