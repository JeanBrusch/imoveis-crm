import { AdminPropertyForm } from '../AdminPropertyForm'

export default function AdminPropertyFormExample() {
  return (
    <div className="max-w-3xl p-6">
      <AdminPropertyForm
        onSubmit={(data, images) => {
          console.log('Property submitted:', data)
          console.log('Images:', images.length)
        }}
        onCancel={() => console.log('Form cancelled')}
      />
    </div>
  )
}
