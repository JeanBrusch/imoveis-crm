import { HeroSection } from '../HeroSection'
import heroImage from '@assets/generated_images/Modern_apartment_building_exterior_766f1d62.png'

export default function HeroSectionExample() {
  return (
    <HeroSection
      backgroundImage={heroImage}
      onSearch={(query) => console.log('Search query:', query)}
    />
  )
}
