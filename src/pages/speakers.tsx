import { Link } from 'react-router-dom'
import Button from '../components/Button'
import zx9m from '../assets/product-zx9-speaker/mobile/image-product.jpg'
import zx9t from '../assets/product-zx9-speaker/tablet/image-product.jpg'
import zx9d from '../assets/product-zx9-speaker/desktop/image-product.jpg'
import zx7m from '../assets/product-zx7-speaker/mobile/image-product.jpg'
import zx7t from '../assets/product-zx7-speaker/tablet/image-product.jpg'
import zx7d from '../assets/product-zx7-speaker/desktop/image-product.jpg'

export default function SpeakersPage() {
  return (
    <div className="pb-16">
      <header className="bg-black py-10 text-center text-white">
        <h1 className="text-2xl font-bold tracking-[1px] uppercase">Speakers</h1>
      </header>

      <section className="mx-auto mt-10 max-w-[1110px] px-4 sm:px-6 lg:px-8">
        {/* ZX9 */}
        <article className="grid gap-6 sm:grid-cols-2 sm:items-center">
          <picture className="rounded-lg bg-[#F1F1F1] p-6">
            <source media="(min-width:1024px)" srcSet={zx9d} />
            <source media="(min-width:640px)" srcSet={zx9t} />
            <img src={zx9m} alt="ZX9 Speaker" className="mx-auto h-56 w-auto object-contain" />
          </picture>
          <div className="text-center sm:text-left">
            <p className="text-[#D87D4A] tracking-[8px] uppercase">New product</p>
            <h2 className="mt-4 text-3xl font-bold uppercase">ZX9 Speaker</h2>
            <p className="mt-4 text-black/70">Upgrade your sound system with the ZX9 active speaker...</p>
            <Link to="/product/zx9-speaker">
              <Button className="mt-6">See Product</Button>
            </Link>
          </div>
        </article>

        {/* ZX7 */}
        <article className="mt-24 grid gap-6 sm:grid-cols-2 sm:items-center">
          <picture className="rounded-lg bg-[#F1F1F1] p-6 sm:order-2">
            <source media="(min-width:1024px)" srcSet={zx7d} />
            <source media="(min-width:640px)" srcSet={zx7t} />
            <img src={zx7m} alt="ZX7 Speaker" className="mx-auto h-56 w-auto object-contain" />
          </picture>
          <div className="text-center sm:text-left sm:order-1">
            <h2 className="mt-4 text-3xl font-bold uppercase">ZX7 Speaker</h2>
            <p className="mt-4 text-black/70">Stream high quality sound wirelessly with minimal loss.</p>
            <Link to="/product/zx7-speaker">
              <Button className="mt-6">See Product</Button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}

