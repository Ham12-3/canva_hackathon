"use client";

import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { ContentItem } from "./types";

// Define types for course content and other structures
type Link = {
  title: string;
  url: string;
};

type BenefitsPrerequisites = {
  title: string;
};

type Thumbnail = {
  public_id: string;
  url: string;
};

type CourseInfo = {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  category: string;
  demoUrl: string;
  thumbnail: Thumbnail; // Change this to an object
};

const CreateCourse = () => {
  const [active, setActive] = useState(0);
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  // Initialize state with correct types
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    category: "",
    demoUrl: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
  });

  const [benefits, setBenefits] = useState<BenefitsPrerequisites[]>([
    { title: "" },
  ]);
  const [prerequisites, setPrerequisites] = useState<BenefitsPrerequisites[]>([
    { title: "" },
  ]);
  const [courseContentData, setCourseContentData] = useState<ContentItem[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled section",
      videoLength: "",
      links: [{ title: "", url: "" }],
      suggestions: [],
    },
  ]);

  const [courseData, setCourseData] = useState<any>({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/live-courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      } else {
        toast.error("An error occurred while creating the course.");
      }
    }
  }, [isSuccess, error, isLoading]);

  const handleSubmit = () => {
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
        videoLength: courseContent.videoLength,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestions: courseContent.suggestions || "", // Ensure suggestions is a string
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: {
        public_id: courseInfo.thumbnail.public_id,
        url: courseInfo.thumbnail.url,
      },
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
      category: courseInfo.category,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    if (!isLoading) {
      await createCourse(courseData);
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
            isEdit={false}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
