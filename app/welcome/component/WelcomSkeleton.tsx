import React from "react";

const WelcomeSkeleton: React.FC = () => {
  return (
    <div className="mt-[100px]">
      <div className="grid grid-cols-2 h-[550px] lg:px-32 md:px-16 px-8 animate-pulse">
        <div className="flex flex-col gap-3 min-w-[330px]">
          <div className="h-10 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-full w-80 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-full w-[150px] mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-full w-[150px] mb-4"></div>
        </div>
        <div className="lg:flex justify-end hidden">
          <div className="w-[504px] h-[540px] bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="bg-[#F9F9F9] pt-[90px] pb-28 relative animate-pulse">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-gray-200 rounded-full"></div>
        <div className="absolute bottom-0 w-[400px] h-[400px] bg-gray-200 rounded-full"></div>
        <div className="lg:px-32 md:px-16 px-12">
          <div className="flex flex-col gap-4">
            <div className="h-10 bg-gray-200 rounded-full w-[60%] mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-full w-[700px] mb-4"></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-[80px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative mt-24">
                <div className="w-[100%] h-[217px] bg-gray-200 rounded-t-2xl mt-1 mb-4"></div>
                <div className="bg-white min-w-[270px] h-[334px] rounded-xl p-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-[90px] lg:px-32 md:px-16 px-8 pb-28 animate-pulse">
        <div className="grid lg:grid-cols-[auto_500px] grid-cols-auto gap-16">
          <div className="flex gap-4 flex-wrap">
            <div className="w-[80%] h-[200px] bg-gray-200 rounded-3xl"></div>
            <div className="w-[80%] h-[200px] bg-gray-200 rounded-3xl"></div>
            <div className="w-[80%] h-[200px] bg-gray-200 rounded-3xl"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-10 bg-gray-200 rounded-full w-[60%] mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-full w-[700px] mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-full w-[150px] mb-4"></div>
          </div>
        </div>
      </div>
      <div className="lg:px-32 md:px-16 px-8 pb-16 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-full w-[40%] mb-8"></div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center pt-4 pb-4 border shadow-md">
              <div className="w-[100px] h-[100px] bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-full w-[60%] mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-full w-[80%] mb-2"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:px-32 md:px-16 px-12 py-12 bg-[#ECF4FF] animate-pulse">
        <div className="h-10 bg-gray-200 rounded-full w-[40%] mb-8"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative bg-white rounded-lg p-4">
              <div className="w-[50px] h-[50px] bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-full w-[80%] mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-full w-[100%] mb-4"></div>
              <div className="flex gap-2 items-center mt-4">
                <div className="w-[30px] h-[30px] bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded-full w-[50%]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSkeleton;

