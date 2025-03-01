export default function StoriesSkeleton() {
  return (
    <div data-testid="story-skeleton" className="w-full relative">
      <div className="flex space-x-4 p-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-gray-200" />
            <div className="w-16 h-3 mt-2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}  