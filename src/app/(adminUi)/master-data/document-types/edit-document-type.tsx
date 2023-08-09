"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { TextArea, TextInput } from "@/components/FormElements/Inputs";
import Button from "@/components/Button";
import * as yup from "yup";
import { IDocumentFormat } from "@/models/document-format";
import Drawer from "@/components/Drawer";
import { GpToast } from "@/components/Toast";
import { useUpdateDocumentTypeMutation } from "./api-slice";
import MultiSelect, { ItemProps } from "./multiselect";
import { useFetchDocumentFormatsQuery } from "../document-formats/documentFormatApiSlice";
import { IDocumentType, SubmitIDocumentType } from "@/models/document-type";

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

type TFormData = yup.InferType<typeof schema>;

interface EditProps<T> {
  item?: T;
  onEditComplete: () => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const EditDocumentTypeDrawer = ({
  item,
  onEditComplete,
  showModal,
  setShowModal,
}: EditProps<IDocumentType>) => {
  const [updateDocumentFormat, { isLoading, isSuccess }] =
    useUpdateDocumentTypeMutation();
  const { data, refetch, isFetching } = useFetchDocumentFormatsQuery();
  const [documentFormatIds, setSelectedFormats] = useState([""]);
  const [docError, setError] = useState("");
  const [formatOptions, setFormatOptions] = useState<ItemProps[]>([]);

  useEffect(() => {
    if (data) {
      setFormatOptions(
        data?.map((item) => {
          return { label: item.contentType, value: item.id };
        })
      );
    }
  }, [data]);
  useEffect(() => {
    let docIds: string[] = [];
    item?.documentFormats.map((doc) => docIds.push(doc.id));
    setSelectedFormats(docIds as any);
  }, [item]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: item ? { ...item } : {},
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onEditComplete();
      setShowModal(false);
      GpToast({
        type: "success",
        message: "Document type edited Successfully",
        placement: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = (data: TFormData) => {
    if (documentFormatIds.length >= 1) {
      let obj = {
        ...data,
        documentFormats: documentFormatIds,
      } as SubmitIDocumentType;
      updateDocumentFormat(obj).then((res: any) => {
        if (res.error) {
          toast.error(`${res.error.data.title}`, {
            position: toast.POSITION.TOP_LEFT,
          });
        }
      });
    } else {
      setError("You must select at least one document formats");
    }
  };

  return (
    <>
      <Drawer
        placement="right"
        title="Edit Document Type"
        closable={false}
        isOpen={showModal}
        onClose={() => {}}
        // subTitle="Document Format Information"
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
              defaultValue={documentFormatIds}
              label="Document Formats"
              errors={docError}
              required
              options={formatOptions}
              // {...register('documentFormats')}
              onChange={(newValue: string[]) => {
                setError("");
                setSelectedFormats(newValue);
              }}
              name="documentFormats"
            />

            <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
              <Button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isLoading}
                appButtonType="green-outline"
              >
                Cancel
              </Button>
              <Button
                appButtonType="green-button"
                isLoading={isLoading}
                disabled={isLoading}
                id="successButton"
                type="submit"
              >
                Save
              </Button>
            </div>
          </fieldset>
        </form>
      </Drawer>
    </>
  );
};

export default EditDocumentTypeDrawer;
