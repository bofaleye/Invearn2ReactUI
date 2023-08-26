"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
import {
  useCreateAssetMutation,
  useFetchRegistrarsQuery,
} from "./assetsApiSlice";
import { toast } from "react-toastify";
// import { Drawer } from "@/components/Drawer";
import { PlusIcon } from "@/assets";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SuccessModal from "@/components/Modals/SuccessModal";
import Button from "@/components/Button";
import { Spinner } from "flowbite-react";
import Drawer from "@components/Drawer";
import { GpToast } from "@components/Toast";
import DropDown from "@/components/DropDown";
import DropDownSelect from "@/components/DrowpDownSelect";
import MultiSelect from "@/components/MultiSelect";
import { AssetData } from "@/models/bank";

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
type TFormValues = Yup.InferType<typeof schema>;

interface CreateBankDrawerProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export type CreateAsset = {
  description?: string;
  isActive?: boolean;
  fullText?: string;
  tags?: string;
  caption?: string;
  name?: string;
  ticker?: string;
  marketClassification?: string;
  sector?: string;
  subSector?: string;
  natureofBusiness?: string;
  companyAddress?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  auditor?: string;
  companySecretary?: string;
  dateListed?: string;
  dateofIncorporation?: string;
  website?: string;
  boardOfDirectors?: string;
  code?: string;
  registrarId?: string;
  logoUrl?: string,
};
type Options = {
  label: string;
  value: string;
};

export function CreateBankDrawer({
  open,
  setOpen,
  onCreateSuccess,
}: CreateBankDrawerProps) {
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

  const { data, refetch, isFetching } = useFetchRegistrarsQuery();

  const [createAsset, { isLoading, isError, isSuccess, error }] =
    useCreateAssetMutation();

  
  const onSubmit = async (data: TFormValues) => {
    const payload ={
      ...data,
      registrarId: value && value?.value
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
        message: "Bank Successfully Added",
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
<div className="mt-6">
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

export default CreateBankDrawer;
