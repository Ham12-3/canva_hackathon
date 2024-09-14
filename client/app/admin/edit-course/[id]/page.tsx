"use client";
import React from "react";
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../utils/Heading";
import CreateCourse from "../../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHero from "@/app/components/Admin/DashboardHero";
type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="Elearnign is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <div className="z-20">
            <DashboardHero isDashboard={false} />
          </div>
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
