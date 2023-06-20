"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MySelect, MyTextInput } from "@/components/FormElements/Inputs";
import FormButton from "@/components/FormElements/FormButton";
import ReusableDrawer from "@/components/ReusableDrawer";

const schema = Yup.object({
  firstname: Yup.string()
    .min(3, "Input must be  minimum of 3 characters")
    .required("First Name field empty"),
  lastname: Yup.string()
    .min(3, "Input must be  minimum of 3 characters")
    .required("Last Name field empty"),
  middlename: Yup.string()
    .min(3, "Input must be  minimum of 3 characters")
    .required("Middle Name field empty"),
  email: Yup.string().email("Invalid email address").required("Required"),
  dob: Yup.string().required("Date of birth field empty"),
  role: Yup.string().oneOf(["admin", "superadmin"]),
  gender: Yup.string().oneOf(["male", "female"]).required("Gender field empty"),
});
type FormData = Yup.InferType<typeof schema>;

export default function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <ReusableDrawer
      drawerId="edit-user-drawer"
      placement="right"
      drawerTitle="Edit User"
      subTitle="User Information"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyTextInput
          label="First Name"
          type="text"
          register={register}
          name="firstname"
          errors={errors}
        />
        <MyTextInput
          label="Middle Name"
          name="middlename"
          type="text"
          register={register}
          errors={errors}
        />
        <MyTextInput
          label="Last Name"
          name="lastname"
          type="text"
          register={register}
          errors={errors}
        />
        <MyTextInput
          label="Email"
          name="email"
          type="emai"
          register={register}
          errors={errors}
        />
        <MyTextInput
          label="Date of Birth"
          name="dob"
          type="date"
          register={register}
          errors={errors}
        />
        <MySelect
          label="Gender"
          name="gender"
          options={[
            {
              name: "Male",
              value: "male",
            },
            {
              name: "Female",
              value: "female",
            },
          ]}
          register={register}
          errors={errors}
        />

        <MySelect
          label="User Role"
          name="role"
          options={[
            {
              name: "Admin",
              value: "admin",
            },
            {
              name: "Super admin",
              value: "super admin",
            },
          ]}
          register={register}
          errors={errors}
        />
        <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
          <button
            data-drawer-hide="edit-user-drawer"
            aria-controls="edit-user-drawer"
            className="text-CEMCS-Blue-100 border  w-[25%] border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
          >
            Back
          </button>
          <FormButton
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 
              w-[25%]
              focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            id="successButton"
            type="submit"
          >
            Save
          </FormButton>
        </div>
      </form>
    </ReusableDrawer>
  );
}
