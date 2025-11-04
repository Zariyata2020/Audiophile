import aboutMobile from '../assets/shared/mobile/image-best-gear.jpg'
import aboutTablet from '../assets/shared/tablet/image-best-gear.jpg'
import aboutDesktop from '../assets/shared/desktop/image-best-gear.jpg'

export default function AboutSection() {
  return (
    <section className="mt-16 grid grid-cols-1 items-center gap-8 sm:gap-12 sm:grid-cols-2">
      <div className="order-2 sm:order-1">
        <h2 className="text-2xl font-bold uppercase tracking-[1px]">Bringing you the best audio gear</h2>
        <p className="mt-6 text-black/70">
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products.
        </p>
      </div>
      <picture className="order-1 sm:order-2 h-64 overflow-hidden rounded-lg">
        <source media="(min-width:1024px)" srcSet={aboutDesktop} />
        <source media="(min-width:640px)" srcSet={aboutTablet} />
        <img src={aboutMobile} alt="Bringing you the best audio gear" className="h-full w-full object-cover" />
      </picture>
    </section>
  )
}

