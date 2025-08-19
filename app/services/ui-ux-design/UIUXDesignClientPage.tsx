import ThreeDimensionalCard from "@/components/three-dimensional-card"

const UIUXDesignClientPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">UI/UX Design for Clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ThreeDimensionalCard
          title="Client Project 1"
          description="A brief description of the first client project."
          imageUrl="/images/ui-ux-design.jpg" // Replace with actual image URL
        />
        <ThreeDimensionalCard
          title="Client Project 2"
          description="A brief description of the second client project."
          imageUrl="/images/ui-ux-design.jpg" // Replace with actual image URL
        />
        <ThreeDimensionalCard
          title="Client Project 3"
          description="A brief description of the third client project."
          imageUrl="/images/ui-ux-design.jpg" // Replace with actual image URL
        />
      </div>
    </div>
  )
}

export default UIUXDesignClientPage
