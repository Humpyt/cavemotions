import ThreeDimensionalCard from "@/components/three-dimensional-card"

const UIUXDesignClientPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">UI/UX Design for Clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ThreeDimensionalCard>
          <div className="p-6">
            <img
              src="/images/ui-ux-design.jpg"
              alt="Client Project 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Client Project 1</h3>
            <p className="text-gray-600">A brief description of the first client project.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <img
              src="/images/ui-ux-design.jpg"
              alt="Client Project 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Client Project 2</h3>
            <p className="text-gray-600">A brief description of the second client project.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <img
              src="/images/ui-ux-design.jpg"
              alt="Client Project 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Client Project 3</h3>
            <p className="text-gray-600">A brief description of the third client project.</p>
          </div>
        </ThreeDimensionalCard>
      </div>
    </div>
  )
}

export default UIUXDesignClientPage
