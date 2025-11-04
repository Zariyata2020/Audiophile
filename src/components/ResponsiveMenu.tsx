import { Link } from 'react-router-dom'

type Props = { open: boolean; onClose: () => void }

export default function ResponsiveMenu({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
      className="fixed inset-0 z-50 bg-black/40 transition-opacity"
      onClick={onClose}
    >
      <div
        className="absolute left-0 top-0 h-full w-full max-w-[309px] bg-white p-8 shadow-lg transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="mb-16 flex items-center justify-between">
          <h2 id="menu-title" className="sr-only">Navigation Menu</h2>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="ml-auto p-2"
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="grid gap-4">
          <Link
            to="/"
            className="py-3 text-lg font-bold uppercase tracking-[2px] text-black hover:text-[#D87D4A] transition-colors"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/headphones"
            className="py-3 text-lg font-bold uppercase tracking-[2px] text-black hover:text-[#D87D4A] transition-colors"
            onClick={onClose}
          >
            Headphones
          </Link>
          <Link
            to="/speakers"
            className="py-3 text-lg font-bold uppercase tracking-[2px] text-black hover:text-[#D87D4A] transition-colors"
            onClick={onClose}
          >
            Speakers
          </Link>
          <Link
            to="/earphones"
            className="py-3 text-lg font-bold uppercase tracking-[2px] text-black hover:text-[#D87D4A] transition-colors"
            onClick={onClose}
          >
            Earphones
          </Link>
        </nav>
      </div>
    </div>
  )
}

