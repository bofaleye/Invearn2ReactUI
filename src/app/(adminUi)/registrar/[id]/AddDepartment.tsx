"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MyTextInput } from "@/components/FormElements/Inputs";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import AppButton from "@/components/Button";
import { useCreateDepartmentMutation } from "./departmentTypeApiSlice";
import { DepartmentModel } from "@/models/department";
import SuccessModal from "@/components/Modals/SuccessModal";

const schema = Yup.object({
  departmentName: Yup.string().required("Department Name field empty"),
  departmentDescription: Yup.string().required(
    "Department Description field empty"
  ),
});
type FormData = Yup.InferType<typeof schema>;

interface AddDepartmentProps {
  organisationId: string;
  OnAddComplete: (isSuccess: boolean) => void;
}

const _AddDepartment: React.ForwardRefRenderFunction<
  ReusableDrawerRef,
  AddDepartmentProps
> = (props, ref) => {
  const { organisationId, OnAddComplete } = props;
  let drawerRef = useRef<ReusableDrawerRef>(null); // DrawerRef can be used to control the drawer by the parent component

  useImperativeHandle(ref, () => ({
    //this additional Ref is to pass the control of the DRAWER to the parent component of AddDepartment Component
    hideDrawer,
    showDrawer,
  }));

  const [toggleModal, setToggleModal] = useState(false);
  const [createDepartment, response] = useCreateDepartmentMutation();
  const { isLoading, isError, isSuccess } = response;

  useEffect(() => {
    if (response?.isSuccess) {
      hideDrawer();
      setToggleModal(true);
      OnAddComplete(response?.isSuccess);
    }
  }, [response]);

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    createDepartment(
      new DepartmentModel(
        data.departmentName,
        organisationId,
        data.departmentDescription
      )
    );
    reset();
    // hideDrawer();
  };
  const hideDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.hideDrawer();
    }
  };

  const showDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.showDrawer();
    }
  };

  return (
    <>
      <SuccessModal
        openModal={toggleModal}
        onDoneClicked={() => setToggleModal(false)}
        message="Department added Successfully"
      />
      <ReusableDrawer
        drawerTitle="Add Department"
        drawerId="add-department-drawer"
        placement="right"
        subTitle=""
        ref={drawerRef}
        onDrawerHide={reset}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyTextInput
            label="Department Name"
            type="text"
            register={register}
            name="departmentName"
            errors={formError}
          />
          <MyTextInput
            label="Department Description"
            name="departmentDescription"
            type="text"
            register={register}
            errors={formError}
          />

          <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
            <AppButton
              aria-controls="add-department-drawer"
              // data-drawer-hide="add-department-drawer"
              text="Cancel"
              buttonClick={hideDrawer}
              type="button"
              appButtonType="green-outline"
            />
            <AppButton
              appButtonType="green-button"
              isLoading={isLoading}
              disabled={isLoading}
              id="successButton"
              type="submit"
              buttonClick={() => {}}
              text="Add Department"
            />
          </div>
        </form>
      </ReusableDrawer>
    </>
  );
};

const AddDepartment = forwardRef<ReusableDrawerRef, AddDepartmentProps>(
  _AddDepartment
);
export default AddDepartment;
