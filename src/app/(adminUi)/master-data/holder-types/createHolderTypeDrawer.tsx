"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, TextArea } from "@/components/FormElements/Inputs";
import { useCreateShareHolderTypeMutation } from "./holderApiSlice";
import Button from "@/components/Button";
import { toast } from "react-toastify";
// import { Drawer } from "@/components/Drawer";
import { PlusIcon } from "@/assets";
import { Spinner } from "flowbite-react";
import Drawer from "../../../../components/Drawer";
import { GpToast } from "../../../../components/Toast";

const schema = yup.object({
  name: yup.string().required("Shareholder type name is required."),
  description: yup
    .string()
    .required("Shareholder type description is required."),
//   caption: yup.string().required("Shareholder type caption is required."),
//   fullText: yup.string(),
});

type TFormValues = yup.InferType<typeof schema>;

interface CreateHolderTypeDrawerProps {
  showModal: boolean;
  setOpen?: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export default function CreateHolderTypeDrawer({
  showModal,
  setOpen,
  onCreateSuccess,
}: CreateHolderTypeDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
  });

  const [createHolderType, { isLoading, isError, isSuccess, error }] = useCreateShareHolderTypeMutation();

  const onSubmit = (data: TFormValues) => {
    createHolderType(data);
  };

  useEffect(()=>{
  if(isSuccess){
    GpToast({ type: 'success', message: 'Share holder added successfully', placement: toast.POSITION.TOP_RIGHT})
    onCreateSuccess?.();
    setOpen?.(false);
    reset();
  }
  if(isError){
    toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_LEFT,
      });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess, isError])

  return (
    <Drawer
      placement="right"
      title="Add Shareholder Type"
      //   description="Shareholder Type Information"
      isOpen={showModal}
      closable={false}
      onClose={() => {}}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pb-20 flex flex-col justify-between h-full"
      >
        <fieldset disabled={isLoading}>
          <TextInput
            label="Name"
            type="text"
            required={true}
            errors={errors}
            {...register("name")}
          />
          {/* <TextInput
            label="Caption"
            required={true}
            errors={errors}
            {...register("caption")}
          /> */}
          <TextArea
            label="Description"
            required={true}
            errors={errors}
            {...register("description")}
          />
          {/* <TextArea
            label="Full Text"
            required={true}
            errors={errors}
            {...register("fullText")}
          /> */}
          <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
            <Button
              type="button"
              appButtonType="green-outline"
              disabled={isLoading}
              onClick={() => {
                setOpen?.(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              appButtonType="green-button"
              disabled={isLoading}
              id="successButton"
              type="submit"
            >
              {isLoading && (
                <Spinner color="success" className="mr-1 w-[1rem] h-[1rem]" />
              )}
              Save
            </Button>
          </div>
        </fieldset>
      </form>
    </Drawer>
  );
}
