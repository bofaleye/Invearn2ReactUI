"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateBankMutation } from "./assetsApiSlice";
import { toast } from "react-toastify";
import { IBank } from "@/models/bank";
import { TextInput } from "@/components/FormElements/Inputs";
// import { Drawer } from "@/components/Drawer";
import * as Yup from "yup";
import Button from "@components/Button";
import Drawer from "@components/Drawer";
import { GpToast } from "@components/Toast";

const schema = Yup.object({
  name: Yup.string().required("Bank Name is required."),
  code: Yup.string().required("Bank Code is required."),
  sortCode: Yup.string().required("Bank Sort Code is required."),
});

type TFormData = Yup.InferType<typeof schema>;

interface EditBankDrawerProps {
  open: boolean;
  bank?: IBank | null;
  setOpen ?: (open: boolean) => void;
  onEditSuccess: () => void;
  className?: string;
}

export default function EditBankDrawer({bank, open, className, setOpen, onEditSuccess}: EditBankDrawerProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: (bank ?? {})
  });

  const [updateBank, { isLoading, isError, isSuccess }]  = useUpdateBankMutation();

  useEffect(()=>{
    if(isSuccess){
        GpToast({
            type: "success",
            message: "Bank Successfully Edited",
            placement: toast.POSITION.TOP_RIGHT,
          });

      onEditSuccess?.();
      setOpen?.(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess])

  const onSubmit = (data: TFormData) =>{
    updateBank(data)
    .then((res: any) => {
      if (res.error) {
        toast.error(`${res.error.data.title}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  }

  return (
    <Drawer
      title="Edit Bank"
      placement={'right'}
    //   description="Bank Information"
      isOpen={isLoading || open}
      closable={false}
      onClose={()=>{}}
    //   trigger={<span className={className}>{trigger}</span>}
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
              onClick={() => setOpen?.(false)}
              appButtonType="green-outline"
            >Cancel</Button>
            <Button
              appButtonType="green-button"
              isLoading={isLoading}
              id="successButton"
              type="submit" 
              onClick={undefined}            
            >Save</Button>
          </div>
        </fieldset>
      </form>
    </Drawer>
  );
};
