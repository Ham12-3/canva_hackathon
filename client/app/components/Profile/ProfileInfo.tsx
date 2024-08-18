import Image from "next/image";
import { styles } from "../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();

  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery(undefined, {
    skip: !loadUser,
  });

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        if (fileReader.readyState === 2) {
          const base64String = fileReader.result as string;
          // Send base64 string to the server
          await updateAvatar({ avatar: base64String });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error) {
      console.error("Error updating avatar:", error); // Debugging
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const imageSrc = user?.avatar?.url || avatar;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative">
        <div className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="User Avatar"
              objectFit="cover"
              className="rounded-full"
              width={120}
              height={120}
            />
          ) : (
            <HiOutlineUserCircle className="w-full h-full text-gray-400" />
          )}
        </div>

        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
        />

        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-0 right-0 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="text-white" />
          </div>
        </label>
      </div>

      <div className="w-full pl-6 800px:pl-10 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-full mb-4">
              <label htmlFor="fullName" className="block pb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className={`${styles.input} w-full`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full mb-4">
              <label htmlFor="email" className="block pb-2">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                readOnly
                className={`${styles.input} w-full`}
                required
                value={user?.email}
              />
            </div>

            <input
              className="w-full h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
