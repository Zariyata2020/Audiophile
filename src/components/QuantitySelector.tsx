type Props = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <div className="flex h-12 w-32 items-center justify-between bg-[#F1F1F1]">
      <button
        onClick={onDecrease}
        className="flex h-full w-10 items-center justify-center text-black/50 hover:text-[#D87D4A]"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-bold">−</span>
      </button>
      <span className="text-[13px] font-bold">{quantity}</span>
      <button
        onClick={onIncrease}
        className="flex h-full w-10 items-center justify-center text-black/50 hover:text-[#D87D4A]"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  )
}

