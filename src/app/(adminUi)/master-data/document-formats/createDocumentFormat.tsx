"use client";

import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, TextArea } from "@/components/FormElements/Inputs";
import { useCreateDocumentFormatMutation } from "./documentFormatApiSlice";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Drawer from "../../../../components/Drawer";
import { GpToast } from "../../../../components/Toast";

const schema = yup.object({
  name: yup.string().required("Document format name is required."),
  description: yup.string().required("Document format description is required."),
  contentType: yup.string().required("Document format content type is required."),
});
type TFormValues = yup.InferType<typeof schema>;

interface CreateDrawerProps {
  onCreateComplete?: () => void;
  showModal: boolean;
  setModalOpen: (showModal: boolean)=> void
}

export const CreateDocumentFormatDrawer: React.FC<CreateDrawerProps> = ({ onCreateComplete, showModal , setModalOpen}) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
  });

  const [createBank, { isLoading, isSuccess }] = useCreateDocumentFormatMutation();

  useEffect(() => {
    if (isSuccess) {
        GpToast({
            type: 'success',
            message: 'Document Format Added Successfully',
            placement: toast.POSITION.TOP_RIGHT,
        })
      reset();
      setModalOpen(false);
      onCreateComplete?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = (data: TFormValues) => {
    createBank({
      ...data,
      // applicationRoleId: "d9998801-e182-8aa0-186e-948608859953",
    }).then((res: any) => {
      if (res.error) {
        toast.error(`${res.error.data.title}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };


  return (
    <>
      <Drawer
        placement="right"
        title="Add Document Format"
        isOpen={showModal}
        closable={false}
        onClose={()=>{}}
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
              disabled={isLoading}
              type="button"
              onClick={()=>setModalOpen(false)}
              appButtonType="green-outline"
            >Cancel</Button>
            <Button
              appButtonType="green-button"
              isLoading={isLoading}
              disabled={isLoading}
              id="successButton"
              type="submit"
              onClick={undefined}
            >Save</Button>
          </div>
        </form>
      </Drawer>
    </>
  );
};
