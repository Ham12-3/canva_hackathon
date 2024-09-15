"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../utils/Heading";

import UserAnalytics from "@/app/components/Admin/Analytics/UserAnalytics";
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
          <UserAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
