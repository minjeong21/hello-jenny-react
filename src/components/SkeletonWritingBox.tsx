const SkeletonWritingBox = () => {
  return (
    <div className="p-4 sm:p-0">
      {/* <!-- card --> */}
      <div className="bg-white sm:p-6 mt-2 p-3 sm:flex rounded-lg shadow-custom">
        {/* <!-- image --> */}
        <div className="h-60 w-64 bg-gray-200 rounded-lg animate-pulse hidden sm:block"></div>
        {/* Tags */}
        <div className="sm:px-5 sm:py-2 flex-1">
          <div className="flex sm:mb-4 ">
            <div className="h-6 w-16 rounded-sm bg-gray-200 animate-pulse mr-3"></div>
            <div className="h-6 w-16 rounded-sm bg-gray-200 animate-pulse mr-3"></div>
          </div>
          {/* Situation */}
          <div className="mt-6 sm:mt-10 h-5 w-36 rounded-sm bg-gray-200 animate-pulse mb-2"></div>
          {/* title */}
          <div className="h-8 w-80 rounded-sm bg-gray-200 animate-pulse mb-6"></div>
          {/* Input */}
          <div className="h-10 w-full rounded-sm bg-gray-200 animate-pulse mb-4"></div>
          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <div className="h-8 w-20 rounded-sm bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-20 rounded-sm bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-12 rounded-sm bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonWritingBox;
