const SkeletonTheme = () => {
  return (
    <div className="sm:px-4 sm:pt-4 p-2 my-4 bg-white rounded-lg shadow-custom cursor-pointer relative sm:pb-6 pb-4">
      {/* <!-- image --> */}
      <div className="sm:h-24 h-20 bg-gray-200 animate-pulse mb-2"></div>
      <div className="flex justify-between items-center flex-wrap sm:mb-6 mb-4">
        <h4 className="h-6 w-1/2 bg-gray-200 animate-pulse mr-6" />
        <div className="h-6 w-12 bg-gray-200 animate-pulse" />
      </div>
      <div className="h-6 w-3/4 bg-gray-200 animate-pulse " />
    </div>
  );
};

export default SkeletonTheme;
