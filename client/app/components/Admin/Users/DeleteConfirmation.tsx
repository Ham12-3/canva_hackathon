"use client";
import React, { FC } from "react";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  setOpen: (open: boolean) => void;
  onDelete: () => void;
};

const DeleteConfirmation: FC<Props> = ({ setOpen, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    setOpen(false);
    toast.success("Item deleted successfully");
  };

  return (
    <div className="w-full dark:text-white text-black">
      <h1 className={`${styles.title}`}>
        Are you sure you want to delete this user?
      </h1>
      <div className="flex justify-end mt-4">
        <button onClick={() => setOpen(false)} className={`${styles.button}`}>
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className={`${styles.button}  ml-2 !bg-[#fff]`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
