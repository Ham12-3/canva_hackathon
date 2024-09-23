import React, { FC } from "react";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

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
  const userAvatar = user?.avatar?.url;

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 bg-white dark:bg-slate-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-md ">
      {/* User Avatar */}
      <div
        className={`w-full flex items-center cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out ${
          active === 1
            ? "bg-gray-200 dark:bg-slate-700 shadow-lg"
            : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt="User Avatar"
            width={40} // Avatar size
            height={40} // Avatar size
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <HiOutlineUserCircle
            size={40}
            className="text-black dark:text-white mr-4"
          />
        )}
        <h5 className="pl-4 font-Poppins text-lg font-semibold text-black dark:text-white">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out mt-6 ${
          active === 2
            ? "bg-gray-200 dark:bg-slate-700 shadow-lg"
            : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          className="text-black dark:text-white mr-4"
          size={20}
        />
        <h5 className="pl-4 font-Poppins text-lg font-semibold text-black dark:text-white">
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out mt-6 ${
          active === 3
            ? "bg-gray-200 dark:bg-slate-700 shadow-lg"
            : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          size={20}
          className={`mr-4 text-black dark:text-white transition-transform duration-300 ease-in-out ${
            active === 3 ? "transform scale-110" : ""
          }`}
        />
        <h5 className="pl-4 font-Poppins text-lg font-semibold text-black dark:text-white">
          Enrolled Courses
        </h5>
      </div>

      {/* Admin Dashboard  */}

      {user?.role === "admin" && (
        <Link
          className={`w-full flex items-center cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out mt-6 ${
            active === 6
              ? "bg-gray-200 dark:bg-slate-700 shadow-lg"
              : "bg-transparent"
          }`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className={`mr-4 text-black dark:text-white transition-transform duration-300 ease-in-out ${
              active === 3 ? "transform scale-110" : ""
            }`}
          />
          <h5 className="pl-4 font-Poppins text-lg font-semibold text-black dark:text-white">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/* Logout */}
      <div
        onClick={() => {
          setActive(4);
          logOutHandler();
        }}
        className={`w-full flex items-center cursor-pointer rounded-md shadow-sm transition-all duration-300 ease-in-out mt-6 ${
          active === 4
            ? "bg-gray-200 dark:bg-slate-700 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <AiOutlineLogout
          size={20}
          className="text-black dark:text-white mr-4"
        />
        <h5 className="pl-4 font-Poppins text-lg font-semibold text-black dark:text-white">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
