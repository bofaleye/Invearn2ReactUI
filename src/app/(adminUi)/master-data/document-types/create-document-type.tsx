"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon } from "@/assets";
import { Spinner } from "flowbite-react";
import Drawer from "@/components/Drawer";
import { GpToast } from "@/components/Toast";
import { TextInput, TextArea } from "@/components/FormElements/Inputs";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select } from 'antd'

import { useCreateDocumentTypeMutation } from "./api-slice";
import MultiSelect, { ItemProps } from "./multiselect";
import { useFetchDocumentFormatsQuery } from "../document-formats/documentFormatApiSlice";

const schema = yup.object({
  name: yup.string().required("Document type name is required."),
  description: yup.string().required("Document type description is required."),
  uploadSize: yup
    .number()
    .required("Document upload size is required")
    .max(5, "Number should not be greater than 5"),
  directory: yup.string().required("Document part required"),
//   documentFormats: yup.array().required("You must select at least one document formats"),
});

type TFormValues = yup.InferType<typeof schema>;

interface CreateDocumentTypeProps {
  showModal: boolean;
  setOpen?: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export default function CreateDocumentTypeDrawer({
  showModal,
  setOpen,
  onCreateSuccess,
}: CreateDocumentTypeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
  });
  const { data, refetch, isFetching } = useFetchDocumentFormatsQuery();
  const [docError, setError ] = useState("")
  const [ documentFormatIds, setSelectedFormats] = useState(['']);
  const [formatOptions, setFormatOptions] = useState<ItemProps[]>([]);
  const [createDocType, { isLoading, isError, isSuccess, error }] =
    useCreateDocumentTypeMutation();
   
 useEffect(()=>{
   if(data){
    setFormatOptions(data?.map((item) =>{ return{ label: item.contentType, value: item.id} }))
   }
 },[data])
  const onSubmit = (data: TFormValues) => {
    if(documentFormatIds.length>=1) {
        let obj = {...data, documentFormatIds }
        createDocType(obj);
    }else { setError("You must select at least one document formats")}
  };
 

  useEffect(() => {
    if (isSuccess) {
      GpToast({
        type: "success",
        message: "Share holder added successfully",
        placement: toast.POSITION.TOP_RIGHT,
      });
      onCreateSuccess?.();
      setOpen?.(false);
      reset();
    }
    if (isError) {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <Drawer
      placement="right"
      title="Add Document Type"
      //   description="Shareholder Type Information"
      isOpen={showModal}
      closable={false}
      onClose={() => {}}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pb-20 flex flex-col justify-between h-full">
        <fieldset disabled={isLoading}>
          <TextInput
            label="Name"
            type="text"
            required={true}
            errors={errors}
            {...register("name")}
          />        
          <TextInput
            label="Description"
            required={true}
            errors={errors}
            {...register("description")}
          />
          <TextInput
            label="Upload size"
            required={true}
            errors={errors}
            {...register("uploadSize")}
          />
          <TextInput
            label="Directory"
            required={true}
            errors={errors}
            {...register("directory")}
          />
          <MultiSelect 
            //  onChange={(newValue: string[])=>setSelectedFormats(newValue)}
            // value={documentFormats}
            label="Document Formats"
            errors={docError}
            required
             options={formatOptions}
            // {...register('documentFormats')}
            onChange={(newValue: string[])=>{setError(""); console.log(newValue) ;setSelectedFormats(newValue)}}
            name="documentFormats"
              />
              {/* <Select mode="multiple" required
             options={formatOptions}
            {...register('documentFormats')}
            onChange={(newValue)=>{console.log(newValue)}} /> */}
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
