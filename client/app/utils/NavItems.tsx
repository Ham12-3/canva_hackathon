import { url } from "inspector";
import Link from "next/link";
import React from "react";
import { text } from "stream/consumers";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Courses", url: "/courses" },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`
    ${
      activeItem === index
        ? "dark:text-[#37a39a] text-[crimson]"
        : "dark:text-white text-black"
    } text-[18px] px-6 font-Poppins font-[400]
    `}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData &&
              navItemsData.map((item, index) => (
                <Link href="/" passHref>
                  <span
                    className={`
                    ${
                      activeItem === index
                        ? "dark:text-[#37a39a]text-[crimson]"
                        : "dark:text-white text-black"
                    }text-[18px] px-6 font-Poppins font-[400]
                    `}
                  ></span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
