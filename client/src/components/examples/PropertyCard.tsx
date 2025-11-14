import { PropertyCard } from '../PropertyCard'
import image1 from '@assets/generated_images/Modern_luxury_home_exterior_45e62a23.png'

export default function PropertyCardExample() {
  return (
    <div className="w-[380px]">
      <PropertyCard
        id="1"
        title="Modern Luxury Villa"
        location="Beverly Hills, CA"
        price="$2,450,000"
        images={[image1, image1, image1]}
        bedrooms={4}
        bathrooms={3}
        area={3200}
        views={156}
        onLike={(id, liked) => console.log(`Property ${id} liked: ${liked}`)}
        onClick={(id) => console.log(`Property ${id} clicked`)}
      />
    </div>
  )
}
