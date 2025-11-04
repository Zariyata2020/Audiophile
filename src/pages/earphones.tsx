import { Link } from 'react-router-dom'
import Button from '../components/Button'
import yx1m from '../assets/product-yx1-earphones/mobile/image-product.jpg'
import yx1t from '../assets/product-yx1-earphones/tablet/image-product.jpg'
import yx1d from '../assets/product-yx1-earphones/desktop/image-product.jpg'

export default function EarphonesPage() {
  return (
    <div className="pb-16">
      <header className="bg-black py-10 text-center text-white">
        <h1 className="text-2xl font-bold tracking-[1px] uppercase">Earphones</h1>
      </header>

      <section className="mx-auto mt-10 max-w-[1110px] px-4 sm:px-6 lg:px-8">
        <article className="grid gap-6 sm:grid-cols-2 sm:items-center">
          <picture className="rounded-lg bg-[#F1F1F1] p-6">
            <source media="(min-width:1024px)" srcSet={yx1d} />
            <source media="(min-width:640px)" srcSet={yx1t} />
            <img src={yx1m} alt="YX1 Earphones" className="mx-auto h-56 w-auto object-contain" />
          </picture>
          <div className="text-center sm:text-left">
            <p className="text-[#D87D4A] tracking-[8px] uppercase">New product</p>
            <h2 className="mt-4 text-3xl font-bold uppercase">YX1 Wireless Earphones</h2>
            <p className="mt-4 text-black/70">Tailor your listening experience with bespoke dynamic drivers...</p>
            <Link to="/product/yx1-earphones">
              <Button className="mt-6">See Product</Button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}

