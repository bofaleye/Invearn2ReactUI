"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateDocumentFormatMutation } from "./documentFormatApiSlice";
import { toast } from "react-toastify";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
import Button from "@/components/Button";
import * as Yup from "yup";
import { IDocumentFormat } from "@/models/document-format";
import Drawer from "@/components/Drawer";
import { GpToast } from "../../../../components/Toast";

const schema = Yup.object({
  name: Yup.string().required("Document format name is required."),
  description: Yup.string().required("Document format description is required."),
  contentType: Yup.string().required("Document format content type is required."),
});

type TFormData = Yup.InferType<typeof schema>;

interface EditProps<T> {
  item?: T;
  onEditComplete: ()=> void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const EditDocumentDrawer =  ({item, onEditComplete, showModal, setShowModal}: EditProps<IDocumentFormat>) => {
  const [updateDocumentFormat, {isLoading, isSuccess}]  = useUpdateDocumentFormatMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: (item ? { ...item } : {}),
  });

  useEffect(()=>{
    if (isSuccess) {
        reset();
      onEditComplete();
      setShowModal(false);
      GpToast({ type: 'success', message: "Document Format edited Successfully", placement: toast.POSITION.TOP_RIGHT})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess]);

  const onSubmit = (data: TFormData) =>{
    updateDocumentFormat(data)
    .then((res: any) => {
      if (res.error) {
        toast.error(`${res.error.data.title}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  }

  return (
    <>
      <Drawer
        placement="right"
        title="Edit Document Format"
        closable={false}
        isOpen={showModal}
        // subTitle="Document Format Information"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pb-20 flex flex-col justify-between"
        >
          <TextInput
            label="Name"
            type="text"
            required={true}
            errors={errors}
            {...register("name")}
          />
          <TextInput
            label="Content Type"
            required={true}
            errors={errors}
            {...register("contentType")}
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
              onClick={()=>setShowModal(false)}
              disabled={isLoading}
              appButtonType="green-outline"
            >Cancel</Button>
            <Button
              appButtonType="green-button"
              isLoading={isLoading}
              disabled={isLoading}
              id="successButton"
              type="submit"       
            >Save</Button>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default EditDocumentDrawer;
