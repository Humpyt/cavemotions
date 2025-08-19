"use client"

import ThreeDimensionalCard from "@/components/three-dimensional-card"

const PerformanceOptimizationClientPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Performance Optimization</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ThreeDimensionalCard title="Image Optimization" description="Optimize images for faster loading times." />
        <ThreeDimensionalCard
          title="Code Splitting"
          description="Implement code splitting to reduce initial load size."
        />
        <ThreeDimensionalCard title="Caching Strategies" description="Utilize caching to improve response times." />
        <ThreeDimensionalCard title="Lazy Loading" description="Load resources only when they are needed." />
        <ThreeDimensionalCard
          title="Debouncing and Throttling"
          description="Improve performance by limiting function execution."
        />
        <ThreeDimensionalCard title="Memoization" description="Optimize expensive function calls by caching results." />
      </div>
    </div>
  )
}

export default PerformanceOptimizationClientPage
