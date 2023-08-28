"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
import {
  useCreateAssetPriceMutation
} from "./assetsApiSlice";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@/components/Button";
import { Spinner } from "flowbite-react";
import Drawer from "@components/Drawer";
import { GpToast } from "@components/Toast";
import MultiSelect from "@/components/MultiSelect";
import { AssetData } from "@/models/bank";
import { useFetchAssetsQuery } from "../assets/assetsApiSlice";

const schema = Yup.object({
  price: Yup.number().required("Asset Price is required."),
  description: Yup.string().required("Asset Description is required."),
  timestamp: Yup.date().required("Asset timeStamp is required.")
});
type TFormValues = Yup.InferType<typeof schema>;

interface CreateAssetPriceDrawerProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export type CreateAssetPrice = {
  description?: string;
  isActive?: boolean;
  fullText?: string;
  tags?: string;
  caption?: string;
  name?: string;
  price?: string;
  assetId: string;
  timestamp?: Date;
};
type Options = {
  label: string;
  value: string;
};

export function CreateAssetPriceDrawer({
  open,
  setOpen,
  onCreateSuccess,
}: CreateAssetPriceDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
  });
  const [value, setValue] = useState<Options>();
  const onChange = (option: any) => {
    setValue(option);
  };

  const { data  } = useFetchAssetsQuery();

  const [createAsset, { isLoading, isError, isSuccess, error }] =
  useCreateAssetPriceMutation();

  
  const onSubmit = async (data: TFormValues) => {
    const payload ={
      ...data,
      assetId: value && value?.value
    }
    
    const res = await createAsset(payload);

    if (isError) {
      console.error(error);
      toast.error(`${(error as any).data.title}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }

    if ((res as any)?.data) {
      setOpen?.(false);
      GpToast({
        type: "success",
        message: "Asset Price Successfully Added",
        placement: toast.POSITION.TOP_RIGHT,
      });
      onCreateSuccess();
      reset();
    }
  };

  const mapOptions = () => {
    let options = [];
    options = (data as any)?.items?.map((val: AssetData) => {
      const value = val.id;
      const label = val.name;

      return { label, value };
    });
    return options;
  };

  return (
    <Drawer
      placement="right"
      title="Add New Asset"
      closable={false}
      isOpen={isLoading || open}
      onClose={onCreateSuccess}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-5 flex flex-col h-full"
      >
         <div className="">
        <MultiSelect
          options={mapOptions()}
          isMulti={false}
          label="Asset"
          placeholder="Select asset"
          value={value}
          onChange={(x: any) => onChange(x)}
          required
        />
        </div>
        <TextInput
          label="Price"
          type="number"
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
        
        <TextInput
          label="Time Stamp"
          type="date"
          errors={errors}
          {...register("timestamp")}
        />

    
        
  
        <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
          <Button
            type="button"
            appButtonType="green-outline"
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
            type="submit"
          >
            {isLoading && (
              <Spinner color="success" className="mr-1 w-[1rem] h-[1rem]" />
            )}
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

export default CreateAssetPriceDrawer;
