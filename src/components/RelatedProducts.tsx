import { Link } from 'react-router-dom'
import Button from './Button'

type RelatedProduct = {
  slug: string
  name: string
  image: { mobile: string; tablet: string; desktop: string }
}

type Props = {
  products: RelatedProduct[]
}

export default function RelatedProducts({ products }: Props) {
  return (
    <section className="mt-24">
      <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-[1px]">You May Also Like</h2>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
        {products.map((product) => (
          <div key={product.slug} className="text-center">
            <picture className="mb-8 block overflow-hidden rounded-lg bg-[#F1F1F1]">
              <source media="(min-width:1024px)" srcSet={product.image.desktop.replace('./assets/', '../assets/')} />
              <source media="(min-width:640px)" srcSet={product.image.tablet.replace('./assets/', '../assets/')} />
              <img src={product.image.mobile.replace('./assets/', '../assets/')} alt={product.name} className="mx-auto h-48 w-auto object-contain" />
            </picture>
            <h3 className="mb-6 text-xl font-bold uppercase tracking-[1px]">{product.name}</h3>
            <Link to={`/product/${product.slug}`}>
              <Button variant="primary">See Product</Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

