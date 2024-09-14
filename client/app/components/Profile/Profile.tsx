import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const {} = useLogOutQuery(undefined, {
    skip: !logout,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut({ redirect: false }); // Prevent automatic redirection by NextAuth
    redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 85);
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);
  return (
    <div
      className={`w-full px-3 800px:px-10 flex justify-center items-center pt-24 ${
        scroll ? "mt-4" : ""
      } transition-all duration-300`}
    >
      <div className="w-[100%] 800px:w-[25%] bg-white dark:bg-slate-800 rounded-lg">
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full ml-5">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] ">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard
                  item={item}
                  key={index}
                  user={user}
                  isProfile={true}
                />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              You don't have any purchased courses
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
