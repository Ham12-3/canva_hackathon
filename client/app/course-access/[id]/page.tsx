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

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  const {
    data: contentData,
    isLoading: contentLoading,
    error: contentError,
  } = useGetCourseContentQuery(id);

  console.log(contentData, "contentData"); // This will now only log when contentData is defined
  console.log(data?.user?.courses?.courseId, "data");
  console.log(id, "id");

  useEffect(() => {
    if (data && !isLoading) {
      const isPurchased = data.user?.courses?.find(
        (course: any) => course.courseId === id
      );

      // Only redirect if data is loaded and there's no purchase
      if (!isPurchased || error) {
        redirect("/");
      }
    }
  }, [data, error, isLoading, id]);

  // Display loader while any data is loading
  if (isLoading || contentLoading) {
    return <Loader />;
  }

  // Handle case where contentData or user data is missing or API returned an error
  if (contentError || !contentData || !data || !data.user) {
    return <div>Error: Course content or user data not available.</div>;
  }

  return (
    <div>
      <CourseContent id={id} user={data.user} />
    </div>
  );
};

export default Page;
