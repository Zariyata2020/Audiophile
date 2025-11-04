import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#101010] text-white">
      <div className="mx-auto max-w-[1110px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-1 w-24 bg-[#D87D4A]"></div>
        <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <Link to="/" className="text-xl font-extrabold tracking-[2px] uppercase">Audiophile</Link>
          <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8 text-[13px] tracking-[2px] uppercase">
            <Link to="/" className="hover:text-[#D87D4A]">Home</Link>
            <Link to="/headphones" className="hover:text-[#D87D4A]">Headphones</Link>
            <Link to="/speakers" className="hover:text-[#D87D4A]">Speakers</Link>
            <Link to="/earphones" className="hover:text-[#D87D4A]">Earphones</Link>
          </nav>
        </div>
        <p className="mt-8 text-center sm:text-left text-white/70">
          Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
        </p>
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-white/50">Copyright 2025. All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <a aria-label="Facebook" href="#" className="hover:text-[#D87D4A]">FB</a>
            <a aria-label="Twitter" href="#" className="hover:text-[#D87D4A]">TW</a>
            <a aria-label="Instagram" href="#" className="hover:text-[#D87D4A]">IG</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

