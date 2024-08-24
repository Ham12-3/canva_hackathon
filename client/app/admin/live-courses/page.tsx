"use client";
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import React from "react";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import AllCourses from "@/app/components/Admin/Course/AllCourses";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning  - Admin"
          description="Elearning is a platofrm for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
