import { Link } from 'react-router-dom'

type Props = { title: string; href: string; imageSrc?: string }

export default function CategoryCard({ title, href, imageSrc }: Props) {
  return (
    <div className="relative grid place-items-center rounded-lg bg-[#F1F1F1] pt-20 pb-8 text-center">
      {imageSrc ? (
        <img src={imageSrc} alt="" className="absolute -top-12 h-32 w-32 object-contain drop-shadow-lg" />
      ) : (
        <div className="absolute -top-12 h-32 w-32 rounded-full bg-white drop-shadow-lg"></div>
      )}
      <h3 className="text-[15px] font-bold uppercase tracking-[1px]">{title}</h3>
      <Link to={href} className="mt-3 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A]">
        Shop <span aria-hidden className="text-[#D87D4A]">&gt;</span>
      </Link>
    </div>
  )
}

