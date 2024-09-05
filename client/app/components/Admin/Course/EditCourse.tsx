"use client";

import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CoursePreview from "./CoursePreview";
import CourseContent from "./CourseContent";
import {
  useEditCourseMutation,
  useGetAllInfoCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [active, setActive] = useState(0);
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data, refetch } = useGetAllInfoCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    category: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestions: "",
    },
  ]);
  console.log(data);
  const [courseData, setCourseData] = useState({});

  // Safe access to data and courses
  const editCourseData = data?.courses?.find((i: any) => i._id === id);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name || "",
        description: editCourseData.description || "",
        price: editCourseData.price || "",
        estimatedPrice: editCourseData.estimatedPrice || "",
        tags: editCourseData.tags || "",
        level: editCourseData.level || "",
        demoUrl: editCourseData.demoUrl || "",
        thumbnail: editCourseData.thumbnail.url || "",
        category: editCourseData.category || "",
      });
      setBenefits(editCourseData.benefits || []);
      setPrerequisites(editCourseData.prerequisites || []);
      setCourseContentData(editCourseData.courseContent || []);
    }
  }, [editCourseData, data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/all-courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestions: courseContent.suggestions,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      category: courseInfo.category,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    if (!editCourseData?._id) {
      toast.error("Course ID is missing");
      return;
    }
    try {
      const result = await editCourse({
        id: editCourseData._id,
        data: courseData,
      }).unwrap();
      if (result) {
        toast.success("Course updated successfully");
        redirect("/admin/all-courses");
      }
    } catch (err) {
      toast.error("An error occurred while updating the course");
      console.error("Edit Course Error:", err);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setActive={setActive}
            active={active}
            setPrerequisites={setPrerequisites}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
