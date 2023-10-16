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
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import { newUserSchema } from "../newUserSchema";
import { IUser } from "@/models/user";
import { useUpdatUserMutation } from "../UserApiSlice";
import { useFetchUserRolesQuery } from "../userRolesApiSlice";
import { UserRole } from "@/models/UserRole";
import { toast } from "react-toastify";
import SuccessModal from "@/components/Modals/SuccessModal";

type FormData = Yup.InferType<typeof newUserSchema>;

interface EditUserprops {
  userData?: IUser | null;
  OnEditComplete: (isSuccess: boolean) => void;
  isOpen: boolean;
  setOpen: ()=> void;
}

const EditUserDrawer: React.FC<EditUserprops> = ({userData, OnEditComplete, isOpen, setOpen}) => {
  const Roles = useFetchUserRolesQuery();
  const [roleOptions, setRoleOptions] = useState<object[]>([]);
  const [updateUser, response] = useUpdatUserMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newUserSchema),
     defaultValues: (userData ?? {})
  });
  const [toggleModal, setToggleModal] = useState(false);

  const onSubmit = (data: FormData) => {
    updateUser(data).then((res: any) => {
      if (res.error) {
        toast.error(`There was an error during edit, try again`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      setOpen()
      setToggleModal(true);
      OnEditComplete(response?.isSuccess);
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

  return (
    <>
      <SuccessModal
        openModal={toggleModal}
        onDoneClicked={() => setToggleModal(false)}
        message="Registrar updated Successfully"
      />
      <Drawer
        placement="right"
        title="Edit User"
        closable={false}
        isOpen={isOpen}
        onClose={()=>OnEditComplete(response?.isSuccess)}
        // ="User Information"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <TextInput
            label="Email"
            type="email"
            {...register("email")}
            // name="firstname"
            errors={errors}
          /> */}
          
          <TextInput
            label="Username"
            type="text"
            required={true}
            errors={errors}
            {...register("userName")}
          />
      

          {/* <MySelect
            defaultValue={userData?.applicationRoles}
            label="User Role"
            name="role"
            options={roleOptions}
            register={register}
            errors={errors}
          /> */}
          <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
          <Button
            type="button"
            appButtonType="green-outline"
            onClick={() => {
               setOpen();
               reset();
            }}
          >Cancel</Button>

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
      </Drawer>
    </>
  );
};

export default EditUserDrawer;
