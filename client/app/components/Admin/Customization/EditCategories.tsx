import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [editLayout, { isSuccess: layoutSuccess, error, reset }] =
    useEditLayoutMutation();
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Load the categories data when it becomes available
  useEffect(() => {
    if (data && data.layout?.categories) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      toast.success("Categories updated successfully");
      refetch(); // Refetch to update the UI with the latest data
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (index: number, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((cat, i) =>
        i === index ? { ...cat, title: value } : cat
      )
    );
    setHasChanges(true);
  };

  const newCategoriesHandler = () => {
    setCategories((prevCategory) => [...prevCategory, { title: "" }]);
    setHasChanges(true);
  };

  const areCategoriesUnchanged = (
    oldCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(oldCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((cat) => cat.title.trim() === "");
  };

  const handleEdit = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      try {
        await editLayout({
          type: "Categories",
          categories,
        }).unwrap();

        toast.success("Categories updated successfully");
        setHasChanges(false); // Reset change tracking
      } catch (err) {
        console.error("Failed to save categories:", err);
        toast.error("Failed to update categories. Please try again.");
      }
    } else {
      toast.error(
        "Please ensure all categories have titles and changes are made."
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories.map((item, index) => (
            <div key={index} className="p-3">
              <div className="flex items-center w-full justify-center">
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) => handleCategoriesAdd(index, e.target.value)}
                  placeholder="Enter category title"
                />
                <AiOutlineDelete
                  className="dark:text-white text-black text-[18px] cursor-pointer"
                  onClick={() => {
                    setCategories((prevCategory) =>
                      prevCategory.filter((_, i) => i !== index)
                    );
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>
          ))}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black ${
              hasChanges && !isAnyCategoryTitleEmpty(categories)
                ? "cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed bg-[#cccccc34]"
            } !rounded absolute bottom-12 right-12`}
            onClick={
              hasChanges && !isAnyCategoryTitleEmpty(categories)
                ? handleEdit
                : () => toast.error("Please make changes before saving.")
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
