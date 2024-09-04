import React, { useState, FC, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditLayoutMutation,
  useAddLayoutMutation,
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

  const [
    editLayout,
    { isLoading: isEditing, isSuccess: isEditSuccess, error: editError },
  ] = useEditLayoutMutation();
  const [
    addLayout,
    { isLoading: isAdding, isSuccess: isAddSuccess, error: addError },
  ] = useAddLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
      setImage(data?.layout?.banner?.image?.url || "");
    }
  }, [data]);

  useEffect(() => {
    if (isEditSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    } else if (isAddSuccess) {
      refetch();
      toast.success("Hero added successfully");
    }
    if (editError) {
      if ("data" in editError) {
        const errorData = editError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isEditSuccess, isAddSuccess, editError, addError, refetch]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (data && data.layout?.banner) {
      // Edit existing hero
      await editLayout({
        type: "Banner",
        image,
        title,
        subTitle,
      });
    } else {
      // Add new hero
      await addLayout({
        type: "Banner",
        image,
        title,
        subTitle,
        faq: [],
        categories: [],
      });
    }
  };

  return (
    <div className="flex flex-col p-6 lg:p-8">
      {/* Left Section - Larger Circular Image with Edit Option */}
      <div className="relative mb-6 lg:mb-8">
        <img
          src={image || "/placeholder-image.png"} // Placeholder image if no image is set
          alt="Hero"
          className="w-full h-64 object-cover rounded-lg"
          onError={(event) => {
            console.error("Image error:", event);
            // Handle potential image loading errors here
          }}
        />
        <label
          className="absolute bottom-2 right-2 bg-gray-200 dark:bg-gray-700 p-3 rounded-full cursor-pointer flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
          <AiOutlineCamera className="text-gray-600 dark:text-gray-300" />
          <input type="file" className="hidden" onChange={handleUpdate} />
        </label>
      </div>

      {/* Right Section - Larger Content Editing */}
      <div className="flex flex-col">
        {/* Hero Title Input */}
        <input
          type="text"
          className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Hero Description Input */}
        <textarea
          className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 resize-none bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none"
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
          onClick={handleSave}
          disabled={isEditing || isAdding}
        >
          {isEditing || isAdding ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditHero;
