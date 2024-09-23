import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const [logout, setLogout] = useState(false);

  const { data: sessionData, status } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading && !userData && sessionData) {
      socialAuth({
        email: sessionData?.user?.email,
        name: sessionData?.user?.name,
        avatar: sessionData?.user?.image,
      });
    }

    if (!sessionData && !isLoading && !userData) {
      setLogout(true);
    }
    if (sessionData === null) {
      if (isSuccess) {
        toast.success("Logged in successfully");
      }
    }
    if (sessionData === null) {
      setLogout(true);
    }
  }, [sessionData, userData, isLoading, isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative mb-[120px]">
      <div
        className={`w-full h-[80px] z-[80] transition duration-500 ${
          active || openSidebar
            ? "backdrop-blur-md bg-white/20 dark:bg-black/20 shadow-xl border-b border-gray-200 dark:border-[#ffffff1c]"
            : "bg-transparent"
        } fixed top-0 left-0`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Brand Name */}
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Lacodemy
              </Link>
            </div>

            {/* Navigation Items and Theme Switcher */}
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/* Mobile Menu Icon */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>

              {/* User Avatar or Icon */}
              {userData ? (
                <Link href={"/profile"}>
                  {userData.user.avatar ? (
                    <Image
                      src={userData.user.avatar.url}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden md:block cursor-pointer dark:text-white text-black"
                    />
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setOpen(true);
                    setRoute("Login");
                  }}
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300 cursor-pointer hidden md:block"
                >
                  Join Us
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar for Mobile Navigation */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {!isLoading && userData ? (
                <Link href={"/profile"}>
                  {userData.user.avatar ? (
                    <Image
                      src={userData.user.avatar.url}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full ml-[20px] object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden md:block cursor-pointer dark:text-white text-black"
                    />
                  )}
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden md:block cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                    setRoute("Login");
                  }}
                />
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © {new Date().getFullYear()} Elearning
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Authentication */}
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}

      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Header;
