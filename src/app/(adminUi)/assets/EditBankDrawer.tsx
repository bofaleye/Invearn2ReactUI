"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchRegistrarsQuery, useUpdateAssetMutation } from "./assetsApiSlice";
import { toast } from "react-toastify";
import { AssetData, IBank } from "@/models/bank";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
// import { Drawer } from "@/components/Drawer";
import * as Yup from "yup";
import Button from "@components/Button";
import Drawer from "@components/Drawer";
import { GpToast } from "@components/Toast";
import MultiSelect from "@/components/MultiSelect";

const schema = Yup.object({
  name: Yup.string().required("Asset Name is required."),
  code: Yup.string().required("Asset Code is required."),
  description: Yup.string().required("Asset Description is required."),
  logoUrl: Yup.string().required("Asset Logo Url is required."),
  sector: Yup.string().optional(),
  subSector: Yup.string().optional(),
  telephone: Yup.string().optional(),
  marketClassification: Yup.string().optional(),
  natureofBusiness: Yup.string().optional(),
  companyAddress: Yup.string().optional(),
  email: Yup.string().optional(),
  companySecretary: Yup.string().optional(),
  website: Yup.string().optional(),
  ticker: Yup.string().optional(),
  auditor: Yup.string().optional(),
  boardOfDirectors:Yup.string().optional(),
  fax: Yup.string().optional(),
  dateListed: Yup.date().optional(),
  dateofIncorporation:Yup.date().optional(),

});

type TFormData = Yup.InferType<typeof schema>;
type Options = {
  label: string;
  value: string;
};


interface EditAssetDrawerProps {
  open: boolean;
  asset?: AssetData | null;
  setOpen ?: (open: boolean) => void;
  onEditSuccess: () => void;
  className?: string;
}

export default function EditAssetDrawer({asset, open, className, setOpen, onEditSuccess}: EditAssetDrawerProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: (asset ?? {})
  });


  console.log("asset", errors )

  const [updateBank, { isLoading, isError, isSuccess }]  = useUpdateAssetMutation();
  const [value, setValue] = useState<Options>();
  const onChange = (option: any) => {
    setValue(option);
  };

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
    const payload ={
      ...data,
      registrarId: value && value?.value
    }
    updateBank(payload)
    .then((res: any) => {
      if (res.error) {
        toast.error(`${res.error.data.title}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  }

    const { data, refetch, isFetching } = useFetchRegistrarsQuery();

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

        <TextArea
          label="Description"
          required={true}
          errors={errors}
          {...register("description")}
        />
        <TextInput
          label="Logo Url"
          required={true}
          errors={errors}
          {...register("logoUrl")}
        />
        <div className="mt-12">
        <MultiSelect
          options={mapOptions()}
          isMulti={false}
          label="Registrar Id"
          placeholder="Select"
          value={value}
          onChange={(x: any) => onChange(x)}
          required
        />
        </div>
        

        <TextInput
          label="Sector"
          type="text"
          errors={errors}
          {...register("sector")}
        />
        <TextInput
          label="Sub Sector"
          errors={errors}
          {...register("subSector")}
        />
         <TextInput
          label="Market Classification?"
          type="text"
         
          errors={errors}
          {...register("marketClassification")}
        />
        <TextInput
          label="Nature of Business"
          errors={errors}
          {...register("natureofBusiness")}
        />
        <TextInput
          label="Email"
          type="email"
          errors={errors}
          {...register("email")}
        />
         <TextInput
          label="Telephone"
          type="text"
          errors={errors}
          {...register("telephone")}
        />
        <TextInput
          label="Company Address"
          type="text"
          errors={errors}
          {...register("companyAddress")}
        />
        <TextInput
          label="Board of Director"
          type="text"
          errors={errors}
          {...register("boardOfDirectors")}
        />
         <TextInput
          label="Website"
          type="text"
          errors={errors}
          {...register("website")}
        />
        <TextInput
          label="Ticker"
          type="text"
          errors={errors}
          {...register("ticker")}
        />
        <TextInput
          label="Fax"
          type="text"
          errors={errors}
          {...register("fax")}
        />
        <TextInput
          label="Auditor"
          type="text"
          errors={errors}
          {...register("auditor")}
        />
         <TextInput
          label="companySecretary"
          type="text"
          errors={errors}
          {...register("companySecretary")}
        />
        <TextInput
          label="Date Listed"
          type="date"
          errors={errors}
          {...register("dateListed")}
        />
         <TextInput
          label="Date of Incorporation"
          type="date"
          errors={errors}
          {...register("dateofIncorporation")}
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
