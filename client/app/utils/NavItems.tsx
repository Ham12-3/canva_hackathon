import Link from "next/link";
import React from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Courses", url: "/courses" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href="/" passHref>
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                Elearning
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-start space-y-4 pl-6">
            {navItemsData.map((item, index) => (
              <Link href={item.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } text-[18px] font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
