"use client";

import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MyTextInput } from "@/components/FormElements/Inputs";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import AppButton from "@/components/Button";
import { DepartmentModel } from "@/models/department";
import { useUpdateDepartmentMutation } from "./departmentTypeApiSlice";
import SuccessModal from "@/components/Modals/SuccessModal";

const schema = Yup.object({
  departmentName: Yup.string().required("Department Name field empty"),
  departmentDescription: Yup.string().required("Department Description field empty"),
});
type FormData = Yup.InferType<typeof schema>;

interface EditDepartmentProps {
    department: DepartmentModel;
    onEditDone: (isSuccess: boolean)=> void;
};

const _EditDepartment: React.ForwardRefRenderFunction<ReusableDrawerRef, EditDepartmentProps> = ({department, onEditDone}, ref)=> {
  let drawerRef = useRef<ReusableDrawerRef>(null);
  useImperativeHandle(ref, ()=>({ //this additional Ref is to pass the control of the DRAWER to the parent component of AddDepartment Component
    hideDrawer,
    showDrawer,
  })) 
  
  const [ updateDepartment, response] = useUpdateDepartmentMutation();
  const [toggleModal, setToggleModal] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => updateDepartment(new DepartmentModel(data.departmentName, 
    department.organisationId, data.departmentDescription, department.id));
  
  
  useEffect(()=>{
    if(response?.isSuccess){
      hideDrawer();
      setToggleModal(!toggleModal);
      onEditDone(response?.isSuccess);
    }
  },[response])

  const hideDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.hideDrawer();
    }
  };

  const showDrawer = () =>{
    if(drawerRef.current){
      drawerRef.current.showDrawer();
    }
  }

  return (
    <>
    {toggleModal && <SuccessModal onDoneClicked={()=>setToggleModal(!toggleModal)} message="Department edited Successfully" />}
    <ReusableDrawer
      drawerId="edit-department-drawer"
      placement="right"
      drawerTitle="Edit Department"
      ref={drawerRef}
      onDrawerHide={reset}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyTextInput
          defaultValue={department?.name}
          label="Department Name"
          type="text"
          register={register}
          name="departmentName"
          errors={errors}
        />
        <MyTextInput
          defaultValue={department?.description}
          label="Department Description"
          name="departmentDescription"
          type="text"
          register={register}
          errors={errors}
        />
        
        <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
         <AppButton aria-controls="edit-department-drawer" text="Cancel" buttonClick={hideDrawer} type="button" appButtonType="green-outline" />
         
          <AppButton
            appButtonType="green-button"
            // aria-controls="create-user-drawer" 
            // data-drawer-hide="create-user-drawer"
            disabled={response?.isLoading}
            isLoading={response?.isLoading}
            id="successButton"
            type="submit"
            buttonClick={()=>{}}
            text="Edit Department"  />
           
        </div>
      </form>
    </ReusableDrawer>
    </>
  );
}

const EditDepartment = forwardRef<ReusableDrawerRef, EditDepartmentProps>(_EditDepartment);
export default EditDepartment;
