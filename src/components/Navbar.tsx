import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ResponsiveMenu from './ResponsiveMenu'
import CartModal from './CartModal'
import { useCart } from '../context/CartContext'
import cartIcon from '../assets/carts.svg'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const { getTotalItems } = useCart()

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/headphones', label: 'HEADPHONES' },
    { path: '/speakers', label: 'SPEAKERS' },
    { path: '/earphones', label: 'EARPHONES' },
  ]

  return (
    <header className="w-full bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center border-b border-white/10 lg:border-b lg:justify-between">
          <div className="flex items-center gap-4">
            <button aria-label="Open menu" className="p-2 -ml-2 lg:hidden" onClick={() => setMenuOpen(true)}>
              <span className="block h-0.5 w-6 bg-white"></span>
              <span className="mt-1.5 block h-0.5 w-6 bg-white"></span>
              <span className="mt-1.5 block h-0.5 w-6 bg-white"></span>
            </button>

            <Link to="/" className="text-xl font-extrabold tracking-[2px] lowercase">
              audiophile
            </Link>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-bold uppercase tracking-[2px] transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#D87D4A]'
                    : 'text-white hover:text-[#D87D4A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button aria-label="Cart" className="relative p-2 -mr-2 ml-auto lg:ml-0" onClick={() => setCartOpen(true)}>
            <img src={cartIcon} alt="Cart" className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D87D4A] text-[10px] font-bold text-white">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
      <ResponsiveMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}

