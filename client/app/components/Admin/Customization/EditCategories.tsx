import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useAddLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("categories", {
    refetchOnMountOrArgChange: true,
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [editLayout, { isSuccess: editSuccess, error: editError, reset }] =
    useEditLayoutMutation();
  const [addLayout, { isSuccess: addSuccess, error: addError }] =
    useAddLayoutMutation();
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Load the categories data when it becomes available
  useEffect(() => {
    if (data && data.layout?.categories) {
      setCategories(data.layout.categories);
    }

    // Add a new empty category if none exist
    if (
      data &&
      (!data.layout?.categories || data.layout.categories.length === 0)
    ) {
      newCategoryHandler(); // Automatically add a new category if none are present
    }

    if (editSuccess || addSuccess) {
      refetch(); // Refetch to update the UI with the latest
      toast.success("Categories updated successfully");
      setHasChanges(false);
      reset();
    }
    if (editError || addError) {
      const error = editError || addError;
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, editSuccess, addSuccess, editError, addError, refetch, reset]);

  // Toggle category active state (if needed)
  const toggleCategory = (id: any) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat._id === id ? { ...cat, active: !cat.active } : cat
      )
    );
    setHasChanges(true);
  };

  // Handle changes to category name
  const handleCategoryChange = (id: any, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat._id === id ? { ...cat, title: value } : cat
      )
    );
    setHasChanges(true);
  };

  // Add a new category
  const newCategoryHandler = () => {
    setCategories([
      ...categories,
      {
        _id: Date.now().toString(), // Unique identifier
        title: "", // Category title
        active: true, // Active state
      },
    ]);
    setHasChanges(true);
  };

  // Check if any category title is empty
  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((cat) => cat.title.trim() === "");
  };

  // Handle saving the categories
  const handleEdit = async () => {
    if (hasChanges && !isAnyCategoryEmpty(categories)) {
      if (
        data &&
        data.layout?.categories &&
        data.layout.categories.length > 0
      ) {
        // Update existing categories
        await editLayout({
          type: "categories",
          categories: categories,
        })
          .unwrap()
          .then(() => {
            toast.success("Categories updated successfully");
            setHasChanges(false);
            reset();
          })
          .catch((err) => {
            console.error("Failed to save categories:", err);
            toast.error("Failed to update categories. Please try again.");
          });
      } else {
        // Add new categories
        await addLayout({
          type: "categories",
          categories: categories,
          image: "", // If you have other required fields, include them here
          title: "",
          subTitle: "",
        })
          .unwrap()
          .then(() => {
            toast.success("Categories added successfully");
            setHasChanges(false);
            reset();
          })
          .catch((err) => {
            console.error("Failed to add categories:", err);
            toast.error("Failed to add categories. Please try again.");
          });
      }
    } else {
      toast.error("Please fill out all category names before saving.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {categories.map((cat: any) => (
                <div
                  key={cat._id}
                  className={`${
                    cat._id !== categories[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleCategory(cat._id)}
                    >
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={cat.title} // Category title
                        onChange={(e) =>
                          handleCategoryChange(cat._id, e.target.value)
                        }
                        placeholder="Add your category name..."
                      />
                      <span className="ml-6 flex-shrink-0">
                        {cat.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {cat.active && (
                    <dd className="mt-2 pr-12">
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setCategories((prevCategories) =>
                              prevCategories.filter(
                                (item) => item._id !== cat._id
                              )
                            );
                            setHasChanges(true);
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoryHandler}
            />
          </div>

          <button
            className={`${styles.button}
            !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black ${
              hasChanges && !isAnyCategoryEmpty(categories)
                ? "cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed bg-[#cccccc34]"
            } !rounded absolute bottom-12 right-12`}
            onClick={handleEdit}
            disabled={!hasChanges || isAnyCategoryEmpty(categories)}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditCategories;
