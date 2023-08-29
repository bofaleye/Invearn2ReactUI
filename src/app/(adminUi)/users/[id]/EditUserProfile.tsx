"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MySelect, TextInput } from "@/components/FormElements/Inputs";
import FormButton from "@/components/FormElements/FormButton";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import { newUserSchema } from "../newUserSchema";
import { IUser } from "@/models/User";
import { useUpdatUserMutation } from "../UserApiSlice";
import { useFetchUserRolesQuery } from "../userRolesApiSlice";
import { UserRole } from "@/models/UserRole";
import { toast } from "react-toastify";
import SuccessModal from "@/components/Modals/SuccessModal";

type FormData = Yup.InferType<typeof newUserSchema>;

interface EditUserprops {
  userData?: IUser | null;
  OnEditComplete: (isSuccess: boolean) => void;
}

const _EditUser: React.ForwardRefRenderFunction<
  ReusableDrawerRef,
  EditUserprops
> = (props, ref) => {
  let drawerRef = useRef<ReusableDrawerRef>(null);
  useImperativeHandle(ref, () => ({
    hideDrawer,
    showDrawer,
  }));
  const { userData } = props;
  const Roles = useFetchUserRolesQuery();
  const [roleOptions, setRoleOptions] = useState<object[]>([]);
  const [updateUser, response] = useUpdatUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newUserSchema)
    // defaultValues: (userData ?? {})
  });
  const [toggleModal, setToggleModal] = useState(false);

  const onSubmit = (data: FormData) => {
    updateUser({
      // id: userData?.id,
      ...data,
      id: "" //
    }).then((res: any) => {
      if (res.error) {
        toast.error(`There was an error during edit, try again`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      hideDrawer();
      setToggleModal(true);
      props.OnEditComplete(response?.isSuccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
    <>
      <SuccessModal
        openModal={toggleModal}
        onDoneClicked={() => setToggleModal(false)}
        message="Registrar updated Successfully"
      />
      <ReusableDrawer
        drawerId="edit-user-drawer"
        placement="right"
        drawerTitle="Edit User"
        subTitle="User Information"
        ref={drawerRef}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="First Name"
            type="text"
            {...register("firstname")}
            // name="firstname"
            errors={errors}
          />
          <TextInput
            label="Middle Name"
            type="text"
            {...register("middlename")}
            errors={errors}
          />
          <TextInput
            label="Last Name"
            type="text"
            {...register("lastname")}
            errors={errors}
          />
          <TextInput
            label="Email"
            type="emai"
            {...register("email")}
            errors={errors}
          />
          <TextInput
            label="Date of Birth"
            type="date"
            {...register("dateOfBirth")}
            errors={errors}
          />
          <MySelect
            defaultValue={userData?.gender}
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
            defaultValue={userData?.applicationRoles}
            label="User Role"
            name="role"
            options={roleOptions}
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
              disabled={response.isLoading}
            >
              {response.isLoading ? "Saving..." : "Save"}
            </FormButton>
          </div>
        </form>
      </ReusableDrawer>
    </>
  );
};

const EditUser = forwardRef<ReusableDrawerRef, EditUserprops>(_EditUser);
export default EditUser;
