"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateStateTypeMutation } from "./statesApiSlice";
import { toast } from "react-toastify";
import { TextInput } from "@/components/FormElements/Inputs";
import Button from "@/components/Button";
import * as yup from "yup";
import { Spinner } from "flowbite-react";
import { GpToast } from "@/components/Toast";
import Drawer from "@/components/Drawer";
import { IStates } from "@/models/states";

const schema = yup.object({
  name: yup.string().required("State name is required."),
});

type TFormData = yup.InferType<typeof schema>;

interface EditStateDrawerProps {
  showModal: boolean;
  data?: IStates | null;
  setOpen?: (open: boolean) => void;
  onEditSuccess: () => void;
}

const EditStateDrawer =  ({ data, showModal, setOpen, onEditSuccess }: EditStateDrawerProps) => {
  const [updateState, { isLoading, isSuccess }] = useUpdateStateTypeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: data ?? {},
  });

  const onSubmit = async (data: TFormData) => {
    const res = await updateState(data)
    if ("error" in res) {
      console.error(res.error);
      toast.error(`${(res.error as any).data?.title}` || "Something is not right", {
        position: toast.POSITION.TOP_LEFT,
      });
    }

    if ("data" in res) {
      onEditSuccess?.();
      setOpen?.(false);
      GpToast({
        type:'success',
        message: 'State edited successfully',
        placement: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <Drawer
      placement="right"
      title="Edit State"
      isOpen={showModal}
      closable={false}
      onClose={()=>{}}
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
          <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
            <Button
              type="button"
              appButtonType="green-outline"
              onClick={() => setOpen?.(false)}
            >Cancel</Button>
            <Button
              appButtonType="green-button"
              disabled={isLoading}
              id="successButton"
              type="submit"
            >{isLoading && <Spinner color="success" className="mr-1 w-[1rem] h-[1rem]" />}Save</Button>
          </div>
        </fieldset>
      </form>
    </Drawer>
  );
};
export default EditStateDrawer;
