import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className={`w-[90%] 800px:w-[80%] m-auto`}>
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-[#000] font-[700] 800px:leading-[40px]">
        Expand Your Career{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Opportunity
        </span>
        <br />
        With Our Courses
      </h1>
    </div>
  );
};

export default Courses;
