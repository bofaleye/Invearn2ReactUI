"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/FormElements/Inputs";
import { useCreateBankMutation } from "./bankApiSlice";
import { toast } from "react-toastify";
// import { Drawer } from "@/components/Drawer";
import { PlusIcon } from "@/assets";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SuccessModal from "@/components/Modals/SuccessModal";
import Button from "@/components/Button";
import { Spinner } from "flowbite-react";
import Drawer from "../../../../components/Drawer";
import { GpToast } from "../../../../components/Toast";

const schema = Yup.object({
  name: Yup.string().required("Bank Name is required."),
  code: Yup.string().required("Bank Code is required."),
  sortCode: Yup.string().required("Bank Sort Code is required."),
});
type TFormValues = Yup.InferType<typeof schema>;

interface CreateBankDrawerProps {
  open: boolean;
  setOpen ?: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export function CreateBankDrawer({open, setOpen, onCreateSuccess}: CreateBankDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
  });

  const [createBank, { isLoading, isError, isSuccess, error }] = useCreateBankMutation();

  const onSubmit = async (data: TFormValues) => {
    const res = await createBank(data);

    if (isError) {
      console.error(error)
       toast.error(`${(error as any).data.title}`, {
          position: toast.POSITION.TOP_LEFT,
        });
    }

    if ((res as any)?.data) {
      setOpen?.(false);
      GpToast({
        type: "success",
        message: "Bank Successfully Added",
        placement: toast.POSITION.TOP_RIGHT,
      });
      onCreateSuccess();
      reset();
    }
  };

  return (
    <Drawer
      placement="right"
      title="Add New Bank"
      closable={false}
    //   description="Bank information"
      isOpen={isLoading || open}
      onClose={onCreateSuccess}
      >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-5 flex flex-col h-full"
      >
        <TextInput
          label="Name"
          type="text"
          required={true}
          errors={errors}
          {...register("name")}
        />
        <TextInput
          label="Code"
          required={true}
          errors={errors}
          {...register("code")}
          />
        <TextInput
          label="Sort Code"
          type="text"
          required={true}
          errors={errors}
          {...register("sortCode")}
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
          <Button
            appButtonType="green-button"
            disabled={isLoading}
            type="submit"
          >{isLoading && <Spinner color="success" className="mr-1 w-[1rem] h-[1rem]" />}Save</Button>
        </div>
      </form>
    </Drawer>
  );
};

export default CreateBankDrawer;
