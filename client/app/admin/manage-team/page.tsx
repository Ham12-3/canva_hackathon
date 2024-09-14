"use client";
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import React from "react";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
type Props = {};
import AllUsers from "@/app/components/Admin/Users/AllUsers";

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
          {/* Add some margin to the top of AllCourses */}{" "}
          {/* Adjust the margin as needed */}
          <AllUsers isTeam={true} />
        </div>
      </div>
    </div>
  );
};

export default page;
