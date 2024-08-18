import Image from "next/image";

import { styles } from "../../../app/styles/style";

import React, { FC, useState } from "react";

import { AiOutlineCamera } from "react-icons/ai";

import { HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);

  const imageHandler = async (e: any) => {
    console.log("gggg");
  };

  const handleSubmit = async (e: any) => {
    console.log("submit");
  };
  const imageSrc = user?.avatar?.url || avatar;

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <div className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                className="w-full h-full rounded-full"
              />
            ) : (
              <HiOutlineUserCircle className="w-full h-full" />
            )}
          </div>

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg"
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2flex items-centerjustify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form action="" onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label htmlFor="" className="block pb-2">
                {" "}
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label htmlFor="" className="block pb-2">
                Email Address
              </label>

              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full 800px:w[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
