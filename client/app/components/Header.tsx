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
  const [isClient, setIsClient] = useState(false); // To ensure it's client-side

  // Ensure we are on the client side before attempting to fetch user data
  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  // Fetch user data only if we are on the client
  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {
    skip: !isClient, // Skip fetching on the server side
  });

  const { data: sessionData, status } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  useLogOutQuery(undefined, {
    skip: !logout,
  });

  useEffect(() => {
    if (isClient && !isLoading && !userData && sessionData) {
      socialAuth({
        email: sessionData?.user?.email,
        name: sessionData?.user?.name,
        avatar: sessionData?.user?.image,
      });
    }

    if (!sessionData && !isLoading && !userData) {
      setLogout(true);
    }
  }, [sessionData, userData, isLoading, isClient]); // Added isClient dependency

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    if (isClient) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isClient) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isClient]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
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
              {!isLoading && userData ? (
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
                <HiOutlineUserCircle
                  size={25}
                  className="hidden md:block cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                    setRoute("Login");
                  }}
                />
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
