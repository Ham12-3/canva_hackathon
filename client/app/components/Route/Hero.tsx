import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-around py-16 lg:py-20 bg-black text-white font-Josefin">
      {/* Left Section - Circular Image */}
      <div className=" relative w-[600px] flex items-center justify-center h-[60vh] lg:h-[80vh]">
        <div className="relative w-[550px] h-[550px] rounded-full overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] hero_animation ml-4">
          <Image
            src="/assets/banner-img.png" // Replace with your hero image path
            alt="Hero Image"
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="relative z-10 flex flex-col items-start text-left w-[600px]  px-2 mr-4">
        {/* Hero Title */}
        <h1 className="text-4xl lg:text-5xl font-bold font-Josefin mb-6 leading-tight lg:leading-snug">
          Improve Your Online Learning Experience <br /> Better Instantly
        </h1>

        {/* Hero Description */}
        <p className="text-lg text-gray-400 mb-8">
          We have 40k+ Online courses & 500k+ Online registered students. Find
          your desired Courses from them.
        </p>

        {/* Search Input */}
        <div className="relative w-full max-w-lg mb-8">
          <input
            type="text"
            placeholder="Search Courses..."
            className="w-full py-4 pl-6 pr-12 rounded-l-full rounded-r-none border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none"
          />
          <button className="absolute inset-y-0 right-0 flex items-center justify-center w-14 bg-blue-600 rounded-tr-[10px] rounded-br-[10px] hover:bg-blue-700 focus:outline-none">
            <BiSearch className="text-white" size={24} />
          </button>
        </div>

        {/* User Trust Indicator */}
        <div className="flex items-center mb-8 space-x-4">
          <div className="flex -space-x-2">
            <Image
              src="/assets/client-1.jpg" // Replace with your thumbnail path
              alt="Client 1"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-700"
            />
            <Image
              src="/assets/client-2.jpg" // Replace with your thumbnail path
              alt="Client 2"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-700"
            />
            <Image
              src="/assets/client-3.jpg" // Replace with your thumbnail path
              alt="Client 3"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-700"
            />
          </div>
          <p className="text-white text-sm">
            500K+ People already trusted us.{" "}
            <Link href="/explore" passHref>
              <span className="text-green-500 underline">View Courses</span>
            </Link>
          </p>
        </div>

        {/* Call to Action Button */}
        <Link href="/explore" passHref>
          <span className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300 cursor-pointer">
            Explore Now
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
