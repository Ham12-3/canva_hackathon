"use client";

import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);

  const [avatar, setAvatar] = useState(null);

  const [active, setActive] = useState(1);

  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();

    redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`mt-[150px] w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-800 bg-opacity-90 dark:bg-opacity-90 border dark:border-[#ffffff1d] border-[#e0e0e0]
          rounded-lg shadow-lg dark:shadow-md mt-[80px] transition-all duration-300 ease-in-out ${
            scroll ? "sticky top-[120px]" : "sticky top-[30px]"
          }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
    </div>
  );
};

export default Profile;
