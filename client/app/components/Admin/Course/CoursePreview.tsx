import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: () => void;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  isEdit,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5 mb-5  dark:text-white text-black">
      <div className="w-full relative">
        <CoursePlayer
          videoUrl={courseData?.demoUrl}
          title={courseData?.title}
        />

        <div className="flex items-center mt-4">
          <h1>{courseData?.price === 0 ? "Free" : `${courseData?.price}£`}</h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}£
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% Off
          </h4>
        </div>

        <div className="flex items-center mt-4">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}£
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${styles.input} 1100px:!w-[60%] 1500px:!w-[50%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>

        <ul className="mt-4">
          <li className="pb-1">Source code included</li>
          <li className="pb-1">Full lifetime access</li>
          <li className="pb-1">Certificate of completion</li>
          <li className="pb-3 800px:pb-1">Premium Support</li>
        </ul>
      </div>

      <div className="w-full mt-6">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>

          <h1 className="text-[25px] font-Poppins font-[600] mt-6">
            What you will learn from this course
          </h1>
          {courseData?.benefits.map((item: any, index: number) => (
            <div className="w-full flex items-center py-2" key={index}>
              <IoCheckmarkDoneOutline size={20} />
              <p className="pl-2">{item.title}</p>
            </div>
          ))}

          <h1 className="text-[25px] font-Poppins font-[600] mt-6">
            Prerequisites for this course
          </h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div className="w-full flex items-center py-2" key={index}>
              <IoCheckmarkDoneOutline size={20} />
              <p className="pl-2">{item.title}</p>
            </div>
          ))}

          <div className="w-full mt-6">
            <h1 className="text-[25px] font-Poppins font-[600]">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
              {courseData?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-8">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded cursor-pointer"
          onClick={() => setActive(active - 1)}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded cursor-pointer"
          onClick={handleCourseCreate}
        >
          {isEdit ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
