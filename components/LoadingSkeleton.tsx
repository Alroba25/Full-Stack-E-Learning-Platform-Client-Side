import Navbar from "./Navbar";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
      
      <Navbar />
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 md:py-20 z-10 flex flex-col gap-8">
        {/* Header Skeleton */}
        <div className="w-full flex justify-between items-end mb-8">
          <div className="space-y-4 w-1/2">
            <div className="h-10 bg-white/5 animate-pulse rounded-xl w-3/4"></div>
            <div className="h-4 bg-white/5 animate-pulse rounded-lg w-1/2"></div>
          </div>
          <div className="h-12 w-32 bg-white/5 animate-pulse rounded-xl"></div>
        </div>

        {/* Content Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col gap-4 animate-pulse">
              <div className="w-full h-40 bg-white/5 rounded-2xl"></div>
              <div className="h-6 bg-white/10 rounded-lg w-3/4"></div>
              <div className="h-4 bg-white/5 rounded-lg w-full"></div>
              <div className="h-4 bg-white/5 rounded-lg w-5/6"></div>
              <div className="mt-4 flex justify-between items-center">
                <div className="h-8 w-24 bg-white/5 rounded-lg"></div>
                <div className="h-8 w-8 bg-white/5 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
