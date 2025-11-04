import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getProductBySlug } from '../../lib/products'
import { useCart } from '../../context/CartContext'
import Button from '../../components/Button'
import QuantitySelector from '../../components/QuantitySelector'
import ProductGallery from '../../components/ProductGallery'
import RelatedProducts from '../../components/RelatedProducts'
import CategoryCard from '../../components/CategoryCard'
import AboutSection from '../../components/AboutSection'
import catHeadphones from '../../assets/shared/desktop/image-category-thumbnail-headphones.png'
import catSpeakers from '../../assets/shared/desktop/image-category-thumbnail-speakers.png'
import catEarphones from '../../assets/shared/desktop/image-category-thumbnail-earphones.png'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = slug ? getProductBySlug(slug) : null

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <Link to="/" className="text-[#D87D4A] hover:underline">
          Go back home
        </Link>
      </div>
    )
  }

  const imagePath = (path: string) => {
    // Convert ./assets/ to relative path from pages/product/
    return path.replace('./assets/', '../../assets/')
  }

  return (
    <div className="pb-16">
      {/* Go Back Link */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="mt-4 text-black/50 hover:text-[#D87D4A]">
          Go Back
        </button>
      </div>

      {/* Product Hero Section */}
      <section className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-12 lg:gap-32">
          {/* Product Image */}
          <picture className="overflow-hidden rounded-lg bg-[#F1F1F1] p-8 sm:p-12">
            <source media="(min-width:1024px)" srcSet={imagePath(product.image.desktop)} />
            <source media="(min-width:640px)" srcSet={imagePath(product.image.tablet)} />
            <img src={imagePath(product.image.mobile)} alt={product.name} className="mx-auto h-auto w-full max-w-md object-contain" />
          </picture>

          {/* Product Details */}
          <div className="text-center sm:text-left">
            {product.new && <p className="text-[14px] uppercase tracking-[10px] text-[#D87D4A]">New Product</p>}
            <h1 className="mt-4 text-[28px] font-bold uppercase leading-tight tracking-[1px] sm:text-[40px] lg:text-[56px]">{product.name}</h1>
            <p className="mt-6 text-[15px] leading-[25px] text-black/70">{product.description}</p>
            <p className="mt-6 text-[18px] font-bold tracking-[1px]">${product.price.toLocaleString()}</p>

            {/* Quantity and Add to Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => {
                  if (product) {
                    addItem(product.slug, quantity)
                  }
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features and In The Box */}
      <section className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 sm:grid-cols-2 sm:gap-24 lg:gap-32">
          {/* Features */}
          <div className="sm:max-w-[635px]">
            <h2 className="mb-6 text-[24px] font-bold uppercase tracking-[1px]">Features</h2>
            <div className="space-y-6 text-[15px] leading-[25px] text-black/70">
              {product.features.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* In The Box */}
          <div className="sm:max-w-[300px]">
            <h2 className="mb-6 text-[24px] font-bold uppercase tracking-[1px]">In The Box</h2>
            <ul className="space-y-2">
              {product.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[15px] font-bold text-[#D87D4A]">{item.quantity}x</span>
                  <span className="text-[15px] leading-[25px] text-black/70">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="mx-auto mt-16 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <ProductGallery gallery={product.gallery} productName={product.name} />
      </section>

      {/* Related Products */}
      <section className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <RelatedProducts products={product.others} />
      </section>

      {/* Category Navigation */}
      <section className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <CategoryCard title="Headphones" href="/headphones" imageSrc={catHeadphones} />
          <CategoryCard title="Speakers" href="/speakers" imageSrc={catSpeakers} />
          <CategoryCard title="Earphones" href="/earphones" imageSrc={catEarphones} />
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <AboutSection />
      </section>
    </div>
  )
}

