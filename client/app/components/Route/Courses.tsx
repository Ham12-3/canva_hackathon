import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="relative flex flex-col items-center justify-center py-16 lg:py-20 bg-white dark:bg-black text-black dark:text-white">
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-[#000] font-[700] 800px:leading-[40px]">
          Expand Your Career{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Opportunity
          </span>
          <br />
          With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
