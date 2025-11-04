import { Link } from 'react-router-dom'
import Button from './Button'
import zx9Mobile from '../assets/home/mobile/image-speaker-zx9.png'
import zx9Tablet from '../assets/home/tablet/image-speaker-zx9.png'
import zx9Desktop from '../assets/home/desktop/image-speaker-zx9.png'
import zx7Mobile from '../assets/home/mobile/image-speaker-zx7.jpg'
import zx7Tablet from '../assets/home/tablet/image-speaker-zx7.jpg'
import zx7Desktop from '../assets/home/desktop/image-speaker-zx7.jpg'
import yx1Mobile from '../assets/home/mobile/image-earphones-yx1.jpg'
import yx1Tablet from '../assets/home/tablet/image-earphones-yx1.jpg'
import yx1Desktop from '../assets/home/desktop/image-earphones-yx1.jpg'

type Props = {
  variant: 'zx9' | 'zx7' | 'yx1'
}

export default function ProductHighlight({ variant }: Props) {
  if (variant === 'zx9') {
    return (
      <section className="relative overflow-hidden rounded-lg bg-[#D87D4A] px-6 py-16 text-white lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
        {/* Three concentric circles */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute left-1/2 top-1/2 h-[558px] w-[558px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30"></div>
          <div className="absolute left-1/2 top-1/2 h-[472px] w-[472px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20"></div>
          <div className="absolute left-1/2 top-1/2 h-[386px] w-[386px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10"></div>
        </div>
        <picture className="relative mx-auto mb-8 block h-40 w-40 sm:h-52 sm:w-52 lg:mb-0 lg:z-10">
          <source media="(min-width:1024px)" srcSet={zx9Desktop} />
          <source media="(min-width:640px)" srcSet={zx9Tablet} />
          <img src={zx9Mobile} alt="ZX9 Speaker" className="h-full w-full object-contain" />
        </picture>
        <div className="relative text-center sm:text-left lg:z-10">
          <h2 className="text-4xl font-bold uppercase leading-tight tracking-[1.3px]">ZX9 Speaker</h2>
          <p className="mx-auto mt-4 max-w-[320px] text-white/90 sm:mx-0">
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>
          <Link to="/product/zx9-speaker">
            <Button className="mt-6" variant="secondary">See Product</Button>
          </Link>
        </div>
      </section>
    )
  }

  if (variant === 'zx7') {
    return (
      <section className="relative overflow-hidden rounded-lg bg-[#F1F1F1] px-6 py-16 md:flex md:flex-row md:items-center md:gap-8">
        <picture className="pointer-events-none absolute inset-0 -z-10 select-none">
          <source media="(min-width:1024px)" srcSet={zx7Desktop} />
          <source media="(min-width:640px)" srcSet={zx7Tablet} />
          <img src={zx7Mobile} alt="" className="h-full w-full object-cover opacity-40" />
        </picture>
        <div className="relative md:flex-1 md:max-w-md">
          <h2 className="text-2xl font-bold uppercase tracking-[1px]">ZX7 Speaker</h2>
          <Link to="/product/zx7-speaker">
            <Button className="mt-6" variant="ghost">See Product</Button>
          </Link>
        </div>
        <picture className="relative hidden md:block md:flex-1">
          <source media="(min-width:1024px)" srcSet={zx7Desktop} />
          <source media="(min-width:640px)" srcSet={zx7Tablet} />
          <img src={zx7Mobile} alt="ZX7 Speaker" className="h-auto w-full max-w-md object-contain" />
        </picture>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <picture className="h-52 overflow-hidden rounded-lg">
        <source media="(min-width:1024px)" srcSet={yx1Desktop} />
        <source media="(min-width:640px)" srcSet={yx1Tablet} />
        <img src={yx1Mobile} alt="YX1 Earphones" className="h-full w-full object-cover" />
      </picture>
      <div className="rounded-lg bg-[#EFEFEF] px-6 py-12">
        <h2 className="text-2xl font-bold uppercase tracking-[1px]">YX1 Earphones</h2>
        <Link to="/product/yx1-earphones">
          <Button className="mt-6" variant="ghost">See Product</Button>
        </Link>
      </div>
    </section>
  )
}

