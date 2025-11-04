import { Link } from 'react-router-dom'
import Button from '../components/Button'
import CategoryCard from '../components/CategoryCard'
import ProductHighlight from '../components/ProductHighlight'
import AboutSection from '../components/AboutSection'
import heroMobile from '../assets/home/mobile/image-header.jpg'
import heroTablet from '../assets/home/desktop/image-hero.jpg'
import heroDesktop from '../assets/home/desktop/image-hero.jpg'
import catHeadphones from '../assets/home/mobile/image-header.jpg'
import catSpeakers from '../assets/home/mobile/image-speaker-zx9.png'
import catEarphones from '../assets/home/mobile/image-earphones-yx1.jpg'

export default function HomePage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative -mx-4 mb-10 overflow-hidden bg-black min-h-[600px] py-32 text-white sm:-mx-6 sm:py-24 md:h-[730px] md:py-0 lg:-mx-8 lg:flex lg:h-[730px] lg:flex-row lg:items-center lg:gap-8">
        <picture className="pointer-events-none absolute inset-0 select-none">
          <source media="(min-width:1024px)" srcSet={heroDesktop} />
          <source media="(min-width:640px)" srcSet={heroTablet} />
          <img src={heroMobile} alt="" className="h-full w-full object-cover object-center lg:object-[80%_center]" />
        </picture>
        <div className="relative mx-auto w-full px-4 text-center sm:px-6 md:flex md:flex-row md:items-center md:gap-8 lg:px-8 lg:mx-auto lg:max-w-[1440px] lg:text-left">
          <div className="md:flex-1 md:max-w-md lg:text-left">
            <p className="text-white/50 tracking-[10px] uppercase">New product</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold uppercase leading-tight sm:text-5xl md:text-6xl lg:mx-0">XX99 Mark II Headphones</h1>
            <p className="mt-6 max-w-lg text-white/75 mx-auto md:mx-0 lg:mx-0">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <Link to="/product/xx99-mark-two-headphones">
              <Button className="mt-8" variant="primary">See Product</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-20 grid grid-cols-1 gap-20 sm:gap-6 sm:grid-cols-3" id="headphones">
        <CategoryCard title="Headphones" href="/headphones" imageSrc={catHeadphones} />
        <CategoryCard title="Speakers" href="/speakers" imageSrc={catSpeakers} />
        <CategoryCard title="Earphones" href="/earphones" imageSrc={catEarphones} />
      </section>

      {/* Featured */}
      <div className="mt-16 grid gap-6">
        <ProductHighlight variant="zx9" />
        <ProductHighlight variant="zx7" />
        <ProductHighlight variant="yx1" />
      </div>

      {/* About */}
      <AboutSection />
    </div>
  )
}

