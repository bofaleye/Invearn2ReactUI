"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateShareHolderTypeMutation } from "./holderApiSlice";
import { toast } from "react-toastify";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
import Button from "@/components/Button";
import * as yup from "yup";
import { IShareHolderType } from "@/models/shareholder-type";
// import { Drawer } from "@/components/Drawer";
import { Spinner } from "flowbite-react";
import { GpToast } from "@/components/Toast";
import Drawer from "@/components/Drawer";

const schema = yup.object({
  name: yup.string().required("Shareholder type name is required."),
  description: yup.string().required("Shareholder type description is required."),
//   caption: yup.string().required("Shareholder type caption is required."),
//   fullText: yup.string(),
});

type TFormData = yup.InferType<typeof schema>;

interface EditHolderTypeDrawerProps {
  showModal: boolean;
  data?: IShareHolderType | null;
  setOpen?: (open: boolean) => void;
  onEditSuccess: () => void;
}

const EditHolderTypeDrawer =  ({ data, showModal, setOpen, onEditSuccess }: EditHolderTypeDrawerProps) => {
  const [updateDocumentFormat, { isLoading, isSuccess }] = useUpdateShareHolderTypeMutation();

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
    const res = await updateDocumentFormat(data)
    if ("error" in res) {
      console.error(res.error);
      toast.error(`${(res.error as any).data.title}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }

    if ("data" in res) {
      onEditSuccess?.();
      setOpen?.(false);
      GpToast({
        type:'success',
        message: 'Share-holder type edited successfully',
        placement: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <Drawer
      placement="right"
      title="Edit Shareholder Type"
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
export default EditHolderTypeDrawer;
