import React, { useState, FC, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState(
    "Improve Your Online Learning Experience Better Instantly"
  );
  const [subTitle, setSubTitle] = useState(
    "We have 40k+ Online courses & 500k+ Online registered students. Find your desired Courses from them."
  );
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    // Implement the logic to handle the edit action
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around py-10 lg:py-14 text-black dark:text-white font-Josefin mt-20">
      {/* Left Section - Larger Circular Image with Edit Option */}
      <div className="relative w-[500px] lg:w-[500px] flex items-center justify-center h-[60vh] lg:h-[60vh] mb-10 lg:mb-0">
        <div className="relative w-[450px] h-[450px] rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400 dark:from-[#0f172a] dark:to-[#1e293b] hero_animation ml-4">
          <img
            src={image || "/assets/banner-img.png"} // Use uploaded image or default
            alt="Hero Image"
            className="object-cover w-full h-full"
            onError={(event) => {
              console.error("Image error:", event);
              // Handle potential image loading errors here
            }}
          />

          {/* <
            className="absolute bottom-2 right-2 bg-gray-200 dark:bg-gray-700 p-3 rounded-full cursor-pointer flex items-center justify-center"
            style={{ zIndex: 10 }}
          > */}
        </div>
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleUpdate}
          className="hidden"
        />
        <label
          htmlFor="banner"
          className="absolute    p-3 rounded-full cursor-pointer flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
          <AiOutlineCamera className="text-black dark:text-white" size={80} />
        </label>
      </div>

      {/* Right Section - Larger Content Editing */}
      <div className="relative z-10 flex flex-col items-start text-left w-[600px] lg:w-[550px] px-2">
        {/* Hero Title Input */}
        <textarea
          className="dark:text-white text-black text-3xl lg:text-4xl font-bold font-Josefin mb-6 leading-tight lg:leading-snug resize-none bg-transparent w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        />

        {/* Hero Description Input */}
        <textarea
          className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 resize-none bg-transparent w-full"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          rows={3}
        />

        {/* Save Button - Larger */}
        <button
          className={`px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300 ${
            title !== data?.layout?.banner?.title ||
            subTitle !== data?.layout?.banner?.subTitle ||
            image !== data?.layout?.banner?.image?.url
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={
            title !== data?.layout?.banner?.title ||
            subTitle !== data?.layout?.banner?.subTitle ||
            image !== data?.layout?.banner?.image?.url
              ? handleEdit
              : undefined
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditHero;
