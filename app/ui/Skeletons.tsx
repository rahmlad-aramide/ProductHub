export const SkeletonCard = () => {
    return (
      <div className="animate-pulse cursor-pointer bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05),0px_-20px_40px_0px_rgba(0,0,0,0.05)] backdrop-blur-md rounded-lg p-5 gap-4 flex flex-col justify-between">
        {/* Image skeleton */}
        <div className="bg-gray-200 h-48 w-full rounded-t-md"></div>
  
        {/* Title skeleton */}
        <div className="border-t pt-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
  
        {/* Buttons skeleton */}
        <div className="mt-2 flex justify-between">
          <div className="h-8 bg-gray-200 rounded-[32px] w-20"></div>
          <div className="h-8 bg-gray-200 rounded-[32px] w-20"></div>
        </div>
      </div>
    );
  };

 export const SkeletonFilter = () => {
    return (
      <div className="animate-pulse flex flex-col lg:flex-row mb-6 justify-between items-center border-y py-3 px-3">
        <div className="flex items-center flex-row-reverse md:flex-row justify-between lg:justify-center gap-4 w-full lg:w-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0">
            <div className="h-6 bg-gray-200 rounded w-20 mr-2 mb-2 md:mb-0"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
  
          <div className="flex flex-col md:flex-row items-center space-y-2 lg:space-y-0 gap-2">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0">
              <div className="h-6 bg-gray-200 rounded w-24 mr-0 lg:mr-4"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-20 lg:ml-4"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded-[32px] w-24 md:w-28 my-2 lg:my-0 self-end"></div>
      </div>
    );
  };
  