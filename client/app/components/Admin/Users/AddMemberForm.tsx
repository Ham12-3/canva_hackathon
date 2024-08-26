"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "@/app/styles/style";
import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

// Define validation schema using Yup
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter an email"),
  role: Yup.string().required("Please select a role"),
});

type Props = {
  setOpen: (open: boolean) => void;
};

const AddMemberForm: FC<Props> = ({ setOpen }) => {
  const [updateUserRole] = useUpdateUserRoleMutation();
  const formik = useFormik({
    initialValues: { email: "", role: "user" },
    validationSchema: schema,
    onSubmit: async (values) => {
      await updateUserRole(values);
      setOpen(false);
      toast.success("Member added successfully");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full dark:text-white text-black">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className={`${styles.label}`}>
            Enter the email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="user@example.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-5">
          <label htmlFor="role" className={`${styles.label}`}>
            Select a role
          </label>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            id="role"
            className={`${errors.role && touched.role && "border-red-500"} ${
              styles.input
            }`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && touched.role && (
            <span className="text-red-500 pt-2 block">{errors.role}</span>
          )}
        </div>

        <div className="w-full mt-5">
          <input
            type="submit"
            value="Add Member"
            className={`${styles.button}`}
          />
        </div>
      </form>
    </div>
  );
};

export default AddMemberForm;
