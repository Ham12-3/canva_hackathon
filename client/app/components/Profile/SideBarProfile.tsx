"use client";

import React, { FC } from "react";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}: Props) => {
  const userAvatar = user?.avatar;

  return (
    <div className="w-full">
      {/* User Avatar */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out ${
          active === 1
            ? "dark:bg-slate-800 bg-white dark:bg-opacity-90 bg-opacity-90 dark:shadow-md shadow-lg"
            : "bg-transparent dark:bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt="User Avatar"
            width={40} // Adjust size as needed
            height={40} // Adjust size as needed
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <HiOutlineUserCircle
            size={20}
            className="hidden md:block cursor-pointer dark:text-white text-black mr-4"
          />
        )}
        <h5 className="pl-4 800px:block hidden font-Poppins text-lg font-semibold dark:text-white text-black dark:bg-slate-700 bg-gray-100 rounded-md py-1 px-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out ${
          active === 2
            ? "bg-white dark:bg-slate-800 dark:bg-opacity-90 bg-opacity-90 dark:shadow-md shadow-lg"
            : "bg-transparent dark:bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine className="mr-4" size={20} fill="#fff" />
        <h5 className="pl-4 800px:block hidden font-Poppins text-lg font-semibold dark:text-white text-black dark:bg-slate-700 bg-gray-100 rounded-md py-1 px-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out ${
          active === 3
            ? "bg-white dark:bg-slate-800 dark:bg-opacity-90 bg-opacity-90 dark:shadow-md shadow-lg"
            : "bg-transparent dark:bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          size={20}
          className={`mr-4 transition-transform duration-300 ease-in-out ${
            active === 3 ? "transform scale-110" : ""
          }`}
          fill="#fff"
        />
        <h5 className="pl-4 800px:block hidden font-Poppins text-lg font-semibold dark:text-white text-black dark:bg-slate-700 bg-gray-100 rounded-md py-1 px-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          Enrolled Courses
        </h5>
      </div>

      {/* Logout */}
      <div
        onClick={() => {
          setActive(4);
          logOutHandler();
        }}
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out ${
          active === 4
            ? "bg-white dark:bg-slate-800 dark:bg-opacity-90 bg-opacity-90 dark:shadow-md shadow-lg"
            : "bg-transparent dark:bg-transparent"
        }`}
      >
        <AiOutlineLogout
          size={20}
          className="hidden md:block cursor-pointer dark:text-white text-black mr-4"
        />
        <h5 className="pl-4 800px:block hidden font-Poppins text-lg font-semibold dark:text-white text-black dark:bg-slate-700 bg-gray-100 rounded-md py-1 px-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
