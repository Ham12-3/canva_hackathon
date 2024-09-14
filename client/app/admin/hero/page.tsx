"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import EditHero from "../../components/Admin/Customization/EditHero";
import DashboardHero from "@/app/components/Admin/DashboardHero";

type Props = {};

const page = (props: Props) => {
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
          <div className="mt-20 z-5">
            <EditHero />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
