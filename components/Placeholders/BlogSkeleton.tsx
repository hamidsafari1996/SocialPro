export default function BlogSkeleton() {
    return (
      <article data-testid="skeleton" className="w-full mx-auto bg-white p-4 rounded-md animate-pulse mt-4">
            <div className="flex items-center  gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-gray-200 rounded-md mb-2" />
                <div className="w-52 h-4 bg-gray-200 rounded" />
              </div>
            </div>
        <div className="relative aspect-[16/9] mb-6 bg-gray-200 rounded-lg" />
  
        <div className="text-left">
          <div className="w-24 h-6 bg-gray-200 rounded-md mb-4" />
  
          <header className="mb-8">
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4" />
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-4 bg-gray-200 rounded" />
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-16 h-4 bg-gray-200 rounded" />
            </div>
          </header>
  
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </article>
    )
  }  