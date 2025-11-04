import { Link } from 'react-router-dom'
import Button from '../components/Button'

import prod1m from '../assets/product-xx99-mark-two-headphones/mobile/image-product.jpg'
import prod1t from '../assets/product-xx99-mark-two-headphones/tablet/image-product.jpg'
import prod1d from '../assets/product-xx99-mark-two-headphones/desktop/image-product.jpg'

import prod2m from '../assets/product-xx99-mark-one-headphones/mobile/image-product.jpg'
import prod2t from '../assets/product-xx99-mark-one-headphones/tablet/image-product.jpg'
import prod2d from '../assets/product-xx99-mark-one-headphones/desktop/image-product.jpg'

import prod3m from '../assets/product-xx59-headphones/mobile/image-product.jpg'
import prod3t from '../assets/product-xx59-headphones/tablet/image-product.jpg'
import prod3d from '../assets/product-xx59-headphones/desktop/image-product.jpg'

export default function HeadphonesPage() {
  return (
    <div className="pb-16">
      <header className="bg-black py-10 text-center text-white">
        <h1 className="text-2xl font-bold tracking-[1px] uppercase">Headphones</h1>
      </header>

      <section className="mx-auto mt-10 max-w-[1110px] px-4 sm:px-6 lg:px-8">
        {/* XX99 Mark II */}
        <article className="grid gap-6 sm:grid-cols-2 sm:items-center">
          <picture className="rounded-lg bg-[#F1F1F1] p-6">
            <source media="(min-width:1024px)" srcSet={prod1d} />
            <source media="(min-width:640px)" srcSet={prod1t} />
            <img src={prod1m} alt="XX99 Mark II Headphones" className="mx-auto h-56 w-auto object-contain" />
          </picture>
          <div className="text-center sm:text-left">
            <p className="text-[#D87D4A] tracking-[8px] uppercase">New product</p>
            <h2 className="mt-4 text-3xl font-bold uppercase">XX99 Mark II Headphones</h2>
            <p className="mt-4 text-black/70">The new XX99 Mark II headphones is the pinnacle of pristine audio...</p>
            <Link to="/product/xx99-mark-two-headphones">
              <Button className="mt-6">See Product</Button>
            </Link>
          </div>
        </article>

        {/* XX99 Mark I */}
        <article className="mt-24 grid gap-6 sm:grid-cols-2 sm:items-center">
          <picture className="rounded-lg bg-[#F1F1F1] p-6 sm:order-2">
            <source media="(min-width:1024px)" srcSet={prod2d} />
            <source media="(min-width:640px)" srcSet={prod2t} />
            <img src={prod2m} alt="XX99 Mark I Headphones" className="mx-auto h-56 w-auto object-contain" />
          </picture>
          <div className="text-center sm:text-left sm:order-1">
            <h2 className="mt-4 text-3xl font-bold uppercase">XX99 Mark I Headphones</h2>
            <p className="mt-4 text-black/70">As the gold standard for headphones, the classic XX99 Mark I...</p>
            <Link to="/product/xx99-mark-one-headphones">
              <Button className="mt-6">See Product</Button>
            </Link>
          </div>
        </article>

        {/* XX59 */}
        <article className="mt-24 grid gap-6 sm:grid-cols-2 sm:items-center">
          <picture className="rounded-lg bg-[#F1F1F1] p-6">
            <source media="(min-width:1024px)" srcSet={prod3d} />
            <source media="(min-width:640px)" srcSet={prod3t} />
            <img src={prod3m} alt="XX59 Headphones" className="mx-auto h-56 w-auto object-contain" />
          </picture>
          <div className="text-center sm:text-left">
            <h2 className="mt-4 text-3xl font-bold uppercase">XX59 Headphones</h2>
            <p className="mt-4 text-black/70">Enjoy your audio all day with improved comfort and durability.</p>
            <Link to="/product/xx59-headphones">
              <Button className="mt-6">See Product</Button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}

