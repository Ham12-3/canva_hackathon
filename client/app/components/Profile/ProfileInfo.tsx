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
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [localAvatar, setLocalAvatar] = useState(user?.avatar?.url || avatar); // Local state for avatar

  const [updateAvatar, { isSuccess: avatarSuccess, error: avatarError }] =
    useUpdateAvatarMutation();

  const [editProfile, { isSuccess: profileSuccess, error: profileError }] =
    useEditProfileMutation();

  const { refetch: refetchUser } = useLoadUserQuery(undefined, {
    skip: true, // Skip initial query until manually called
  });

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        if (fileReader.readyState === 2) {
          try {
            const base64String = fileReader.result as string;
            await updateAvatar({ avatar: base64String });
            setLocalAvatar(base64String); // Update local avatar state immediately
          } catch (error) {
            toast.error("Failed to update avatar.");
          }
        }
      };
      fileReader.onerror = () => {
        toast.error("Error reading file.");
      };
      fileReader.readAsDataURL(file);
    } else {
      toast.error("No file selected.");
    }
  };
  useEffect(() => {
    if (avatarSuccess) {
      console.log("Avatar updated successfully");
    }
    if (profileSuccess) {
      console.log("Profile updated successfully");
    }
    if (avatarError) {
      console.error("Error updating avatar:", avatarError);
    }
    if (profileError) {
      console.error("Error updating profile:", profileError);
    }
  }, [avatarSuccess, profileSuccess, avatarError, profileError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      try {
        await editProfile({ name });

        refetchUser(); // Ensure user data is refetched after update
      } catch (error) {
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative">
        <div className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full overflow-hidden">
          {localAvatar ? (
            <Image
              src={localAvatar}
              alt="User Avatar"
              className="rounded-full"
              width={120}
              height={120}
              style={{ objectFit: "cover" }} // Replace objectFit with style prop
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
              <label
                htmlFor="fullName"
                className="block pb-2 dark:text-white text-black"
              >
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
              <label
                htmlFor="email"
                className="block pb-2 dark:text-white text-black"
              >
                Email Address
              </label>
              <input
                id="email"
                type="text"
                readOnly
                className={`${styles.input} w-full`}
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
