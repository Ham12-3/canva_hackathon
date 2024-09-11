"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  const { data: contentData, isLoading: supportLoader } =
    useGetCourseContentQuery(id);
  console.log(contentData, "contentData");
  console.log(data, "data");
  console.log(id, "id");
  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (course: any) => course.courseId === id
      );
      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} />
        </div>
      )}
    </>
  );
};

export default page;
