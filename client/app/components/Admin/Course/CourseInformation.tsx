import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} action="">
        <div>
          <label className={`${styles.label}`} htmlFor="">
            Course Name
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN STack LMS platform with next 13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`} htmlFor="">
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Write something amazing"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) => {
              setCourseInfo({ ...courseInfo, description: e.target.value });
            }}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, price: e.target.value });
              }}
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Estimated Price (optional){" "}
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                });
              }}
              id="estimatedPrice"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="email" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            required
            name=""
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, NEXT 13 Sockeet io tailwind cdd ,LMS"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course Level
            </label>

            <input
              type="text"
              name=""
              value={courseInfo.level}
              required
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, level: e.target.value });
              }}
              id="level"
              placeholder="Beginner/Immediate/Expert"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label}`} htmlFor="">
              Demo Url
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value });
              }}
              id="demoUrl"
              placeholder="eer74fs"
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
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
