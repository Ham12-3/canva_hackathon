"use client";
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
  const { user } = useSelector((state: any) => state.auth);
  const { data, status } = useSession(); // Check status
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  useLogOutQuery(undefined, {
    skip: !logout,
  });

  useEffect(() => {
    console.log("Session status:", status); // Check the status
    console.log("Session data:", data); // Check the session data

    if (data?.user && !user) {
      const { email, name, image } = data.user;

      socialAuth({
        email,
        name,
        avatar: image,
      })
        .then(() => {
          toast.success("Login successfully");
        })
        .catch(() => {
          toast.error("Login failed");
        });
    } else if (data === null && isSuccess) {
      setLogout(true);
    }
  }, [data, user, isSuccess, socialAuth, status]);

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
    <div className="w-full relative">
      <div
        className={`w-full h-[80px] z-[80] border-b transition duration-500 ${
          active || openSidebar
            ? "bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black shadow-xl dark:border-[#ffffff1c]"
            : "bg-transparent"
        } fixed top-0 left-0`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Lacodemy
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>

              {user ? (
                <Link href={"/profile"}>
                  {user.avatar ? (
                    <Image
                      src={user.avatar.url}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                      width={25}
                      height={25}
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

        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => {
                  setOpen(true);
                  setRoute("Login");
                }}
              />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © {new Date().getFullYear()} Elearning
              </p>
            </div>
          </div>
        )}
      </div>

      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
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
