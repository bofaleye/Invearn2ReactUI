"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MySelect, MyTextInput } from "@/components/FormElements/Inputs";
import * as Yup from "yup";
import FormButton from "@/components/FormElements/FormButton";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import { useFetchUserRolesQuery } from "./userRolesApiSlice";
import { useCreateUserMutation } from "./[id]/createUserApiSlice";
import { toast } from "react-toastify";
import { newUserSchema } from "./newUserSchema";
import { UserRole } from "@/models/UserRole";

type FormData = Yup.InferType<typeof newUserSchema>;

const _NewUser: React.ForwardRefRenderFunction<ReusableDrawerRef> = (
  props,
  ref
) => {
  const Roles = useFetchUserRolesQuery();
  const [createUser, response] = useCreateUserMutation();
  const [roleOptions, setRoleOptions] = useState<object[]>([]);
  let drawerRef = useRef<ReusableDrawerRef>(null); // DrawerRef can be used to control the drawer by the parent component

  useImperativeHandle(ref, () => ({
    //this additional Ref is to pass the control of the DRAWER to the parent component of AddDepartment Component
    hideDrawer,
    showDrawer,
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newUserSchema),
  });

  const onSubmit = (data: FormData) => {
    const newUserData = {
      organisationId: "a17c8801-b7da-1029-fdaa-c8028a7078e3",
      ApplicationRoleId: data.role,
      ...data,
    };

    createUser(newUserData).then((res: any) => {
      if (response.isError) {
        toast.error(`${response.error}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else {
        toast.success(`User created successfully`, {
          position: toast.POSITION.TOP_LEFT,
        });
        reset();
      }
    });
  };

  useEffect(() => {
    let options: object[] = [];
    if (Roles.data) {
      Roles.data.map((item: UserRole) =>
        options.push({
          name: item.name,
          value: item.id,
        })
      );
    }
    setRoleOptions(options);
  }, [Roles.data]);

  useEffect(() => {
    if (response?.isSuccess) {
      hideDrawer();
    }
  }, [response]);

  const hideDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.hideDrawer();
    }
  };

  const showDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.showDrawer();
    }
  };

  return (
    <ReusableDrawer
      drawerId="create-user-drawer"
      placement="right"
      drawerTitle="Add User"
      subTitle="User Information"
      ref={drawerRef}
      onDrawerHide={reset}
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
          name="dateOfBirth"
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
          options={roleOptions}
          register={register}
          errors={errors}
        />
        <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
          <button
            data-drawer-hide="create-user-drawer"
            aria-controls="create-user-drawer"
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
            disabled={response.isLoading}
          >
            {response.isLoading ? "...Saving" : "Save"}
          </FormButton>
        </div>
      </form>
    </ReusableDrawer>
  );
};
const NewUser = forwardRef<ReusableDrawerRef>(_NewUser);

export default NewUser;
