import { AdminPropertyTable } from '../AdminPropertyTable'
import image1 from '@assets/generated_images/Modern_luxury_home_exterior_45e62a23.png'
import image2 from '@assets/generated_images/Luxury_living_room_interior_f0ec0c2a.png'

export default function AdminPropertyTableExample() {
  const mockProperties = [
    {
      id: '1',
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: '$2,450,000',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      views: 156,
      thumbnail: image1
    },
    {
      id: '2',
      title: 'Downtown Penthouse',
      location: 'Manhattan, NY',
      price: '$3,200,000',
      bedrooms: 3,
      bathrooms: 2,
      area: 2400,
      views: 234,
      thumbnail: image2
    }
  ]

  return (
    <div className="p-6">
      <AdminPropertyTable
        properties={mockProperties}
        onEdit={(id) => console.log('Edit property:', id)}
        onDelete={(id) => console.log('Delete property:', id)}
        onPreview={(id) => console.log('Preview property:', id)}
      />
    </div>
  )
}
