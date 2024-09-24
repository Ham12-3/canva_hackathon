import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

// type Thumbnail = {
//   public_id: string;
//   url: string;
// };

type CourseInfo = {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  category: string;
  level: string;
  demoUrl: string;
  thumbnail: any; // Change to Thumbnail object
};

type Props = {
  courseInfo: CourseInfo;
  setCourseInfo: (courseInfo: CourseInfo) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("categories", {});
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories || []);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          setCourseInfo({
            ...courseInfo,
            thumbnail: {
              public_id: `mock_public_id_${file.name}`, // Replace this with actual public_id from your upload service
              url: reader.result as string,
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({
          ...courseInfo,
          thumbnail: {
            public_id: `mock_public_id_${file.name}`, // Replace this with actual public_id from your upload service
            url: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`} htmlFor="name">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN Stack LMS platform with Next.js 13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`} htmlFor="description">
            Course Description
          </label>
          <textarea
            id="description"
            cols={30}
            rows={10}
            placeholder="Write something amazing"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e) => {
              setCourseInfo({ ...courseInfo, description: e.target.value });
            }}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="price">
              Course Price
            </label>
            <input
              type="number"
              id="price"
              required
              value={courseInfo.price}
              onChange={(e) => {
                setCourseInfo({ ...courseInfo, price: e.target.value });
              }}
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`} htmlFor="estimatedPrice">
              Estimated Price (optional)
            </label>
            <input
              type="number"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e) => {
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                });
              }}
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="tags">
              Course Tags
            </label>
            <input
              type="text"
              id="tags"
              required
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="MERN, NEXT.js 13, Socket.io, Tailwind CSS, LMS"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label}`} htmlFor="category">
              Course Categories
            </label>
            <select
              id="category"
              className={`${styles.input}`}
              value={courseInfo.category}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="level">
              Course Level
            </label>
            <input
              type="text"
              id="level"
              value={courseInfo.level}
              required
              onChange={(e) => {
                setCourseInfo({ ...courseInfo, level: e.target.value });
              }}
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label}`} htmlFor="demoUrl">
              Demo Url
            </label>
            <input
              type="text"
              id="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e) => {
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value });
              }}
              placeholder="example.com/demo"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail.url ? (
              <img
                src={courseInfo.thumbnail.url}
                alt="Course Thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail or click here to browse
              </span>
            )}
          </label>
        </div>

        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
