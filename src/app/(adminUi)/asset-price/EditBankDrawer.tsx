"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  
  useUpdateAssetPriceMutation } from "./assetsApiSlice";
import { toast } from "react-toastify";
import {  IAssetPrice, } from "@/models/bank";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
// import { Drawer } from "@/components/Drawer";
import * as Yup from "yup";
import Button from "@components/Button";
import Drawer from "@components/Drawer";
import { GpToast } from "@components/Toast";


const schema = Yup.object({
  price: Yup.number().required("Asset Price is required."),
  description: Yup.string().required("Asset Description is required."),
});

type TFormData = Yup.InferType<typeof schema>;
type Options = {
  label: string;
  value: string;
};


interface EditAssetPriceDrawerProps {
  open: boolean;
  assetPrice?: IAssetPrice | null;
  setOpen ?: (open: boolean) => void;
  onEditSuccess: () => void;
  className?: string;
}

export default function EditAssetDrawer({assetPrice, open, className, setOpen, onEditSuccess}: EditAssetPriceDrawerProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: (assetPrice ?? {})
  });


  console.log("asset", errors )

  const [updateAssetPrice, { isLoading, isError, isSuccess }]  = useUpdateAssetPriceMutation();
 

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
    updateAssetPrice(data)
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
      title="Edit Asset"
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
          label="Price"
          type="text"
          required={true}
          errors={errors}
          {...register("price")}
        />
        

        <TextArea
          label="Description"
          required={true}
          errors={errors}
          {...register("description")}
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
