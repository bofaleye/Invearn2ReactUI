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
import Button from "@/components/Button";
import { GpToast } from "@components/Toast";
import { useFetchUserRolesQuery } from "./userRolesApiSlice";
import { useCreateUserMutation } from "./UserApiSlice";
import { toast } from "react-toastify";
import { newUserSchema } from "./newUserSchema";
import { UserRole } from "@/models/UserRole";
import SuccessModal from "@/components/Modals/SuccessModal";
import Drawer from "@/components/Drawer";

type FormData = Yup.InferType<typeof newUserSchema>;
interface INewUserProps {
  OnCreateComplete: (isSuccess: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NewUserDrawer: React.FC<INewUserProps> = ({
  open,
  setOpen,
  OnCreateComplete,
}) => {
  const Roles = useFetchUserRolesQuery();
  const [createUser, { isLoading, isError, isSuccess, error} ] = useCreateUserMutation();
  const [roleOptions, setRoleOptions] = useState<object[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newUserSchema),
  });
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      OnCreateComplete(isSuccess);
      reset();
      setOpen(false);
      GpToast({
        type: "success",
        message: "User Successfully Added",
        placement: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = (data: FormData) => {
    createUser(data).then((res: any) => {
      if (isError) {
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_LEFT,
        });
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

  return (
    <>
      <SuccessModal
        openModal={toggleModal}
        onDoneClicked={() => setToggleModal(false)}
        message="User added Successfully"
      />
      <Drawer
        placement="right"
        title="Add User"
        closable={false}
        //   description="Bank information"
        isOpen={isLoading || open}
        onClose={()=>OnCreateComplete(isSuccess)}
        // subTitle="User Information"
        // onDrawerHide={reset}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />

          <MyTextInput
            label="Username"
            type="username"
            register={register}
            name="username"
            errors={errors}
          />

          <MyTextInput
            label="Password"
            type="password"
            register={register}
            name="password"
            errors={errors}
          />
          <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
          <Button
            type="button"
            appButtonType="green-outline"
            onClick={() => {
              setOpen?.(false);
              reset();
            }}
          >Cancel</Button>

            <FormButton
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4
              w-[25%]
              focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              id="successButton"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "...Saving" : "Save"}
            </FormButton>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default NewUserDrawer;
