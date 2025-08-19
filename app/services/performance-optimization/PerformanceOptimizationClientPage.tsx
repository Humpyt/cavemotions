"use client"

import ThreeDimensionalCard from "@/components/three-dimensional-card"

const PerformanceOptimizationClientPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Performance Optimization</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ThreeDimensionalCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Image Optimization</h3>
            <p className="text-gray-600">Optimize images for faster loading times.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Code Splitting</h3>
            <p className="text-gray-600">Implement code splitting to reduce initial load size.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Caching Strategies</h3>
            <p className="text-gray-600">Utilize caching to improve response times.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Lazy Loading</h3>
            <p className="text-gray-600">Load resources only when they are needed.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Debouncing and Throttling</h3>
            <p className="text-gray-600">Improve performance by limiting function execution.</p>
          </div>
        </ThreeDimensionalCard>
        <ThreeDimensionalCard>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Memoization</h3>
            <p className="text-gray-600">Optimize expensive function calls by caching results.</p>
          </div>
        </ThreeDimensionalCard>
      </div>
    </div>
  )
}

export default PerformanceOptimizationClientPage
