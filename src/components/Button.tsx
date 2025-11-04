import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

export default function Button({ variant = 'primary', fullWidth, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-none text-[13px] tracking-[1px] font-bold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black cursor-pointer'
  const sizes = 'h-12 px-6'
  const width = fullWidth ? 'w-full' : ''
  const styles =
    variant === 'primary'
      ? 'bg-[#D87D4A] text-white hover:bg-[#FBAF85]'
      : variant === 'secondary'
      ? 'bg-black text-white hover:bg-[#4C4C4C]'
      : 'border border-black text-black hover:bg-black hover:text-white'

  return <button className={`${base} ${sizes} ${width} ${styles} ${className}`} {...props} />
}

