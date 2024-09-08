"use client";
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";

import React from "react";

const Page = ({ params }: any) => {
  return (
    <div className="mt-[100px] mb-[200px]">
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
