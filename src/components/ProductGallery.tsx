type GalleryImages = {
  first: { mobile: string; tablet: string; desktop: string }
  second: { mobile: string; tablet: string; desktop: string }
  third: { mobile: string; tablet: string; desktop: string }
}

type Props = {
  gallery: GalleryImages
  productName: string
}

export default function ProductGallery({ gallery, productName }: Props) {
  const getImagePath = (path: string) => path.replace('./assets/', '../assets/')
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <picture className="overflow-hidden rounded-lg">
        <source media="(min-width:1024px)" srcSet={getImagePath(gallery.first.desktop)} />
        <source media="(min-width:640px)" srcSet={getImagePath(gallery.first.tablet)} />
        <img src={getImagePath(gallery.first.mobile)} alt={`${productName} gallery 1`} className="h-full w-full object-cover" />
      </picture>
      <picture className="overflow-hidden rounded-lg">
        <source media="(min-width:1024px)" srcSet={getImagePath(gallery.second.desktop)} />
        <source media="(min-width:640px)" srcSet={getImagePath(gallery.second.tablet)} />
        <img src={getImagePath(gallery.second.mobile)} alt={`${productName} gallery 2`} className="h-full w-full object-cover" />
      </picture>
      <picture className="overflow-hidden rounded-lg sm:col-span-2">
        <source media="(min-width:1024px)" srcSet={getImagePath(gallery.third.desktop)} />
        <source media="(min-width:640px)" srcSet={getImagePath(gallery.third.tablet)} />
        <img src={getImagePath(gallery.third.mobile)} alt={`${productName} gallery 3`} className="h-full w-full object-cover" />
      </picture>
    </div>
  )
}

