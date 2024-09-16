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

type Thumbnail = {
  public_id: string;
  url: string;
};

type CourseInfo = {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  category: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: Thumbnail; // Now it's a Thumbnail object
};

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [active, setActive] = useState(0);
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data } = useGetAllInfoCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    category: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: { public_id: "", url: "" }, // Initialize as object
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
        thumbnail: {
          public_id: editCourseData.thumbnail?.public_id || "",
          url: editCourseData.thumbnail?.url || "",
        }, // Handle as object
        category: editCourseData.category || "",
      });
      setBenefits(editCourseData.benefits || []);
      setPrerequisites(editCourseData.prerequisites || []);
      setCourseContentData(editCourseData.courseData || []);
    }
  }, [editCourseData, data]);

  const handleSubmit = async () => {
    // If thumbnail is a string (from older data), treat it accordingly
    let thumbnailData;

    if (typeof courseInfo.thumbnail === "string") {
      thumbnailData = {
        url: courseInfo.thumbnail, // Handle as a string
        public_id: "", // Assume no public_id if it's just a string
      };
    } else {
      thumbnailData = {
        url: courseInfo.thumbnail.url, // Access the URL from the object
        public_id: courseInfo.thumbnail.public_id || "",
      };
    }

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
      thumbnail: thumbnailData, // Correctly handle both cases
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };

    setCourseData(data);
  };

  console.log("Course Data:", courseData);
  console.log("Edit Course Data:", editCourseData?._id);

  const handleCourseCreate = async () => {
    if (!editCourseData?._id) {
      toast.error("Course ID is missing");
      return;
    }

    try {
      const result = await editCourse({
        id: editCourseData?._id,
        data: courseData,
      }).unwrap();
      if (result) {
        toast.success("Course is been updated successfully");
        setTimeout(() => {
          redirect("/admin/live-courses");
        }, 1000); // Delay the redirect slightly to ensure everything is processed
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
