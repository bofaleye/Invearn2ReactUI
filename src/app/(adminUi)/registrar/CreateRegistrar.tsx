"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MyPhoneNumberInput, MySelect, MyTextInput } from "@/components/FormElements/Inputs";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import { useCreateRegistrarMutation, useFetchCountryStatesQuery } from "./registrarApiSlice";
import SuccessModal from "@/components/Modals/SuccessModal";
import AppButton from "@/components/Button";
import { CountryStateModel } from "@/models/registrar";
import { toast } from "react-toastify";

const schema = Yup.object({
  name: Yup.string().required("Registrar Name is Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  address: Yup.string(),
  currency: Yup.string().required("Required"),
  adminEmail: Yup.string().email("Invalid email address").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  stateId: Yup.string(),
  country: Yup.string(),
  phone: Yup.string()
});
type FormData = Yup.InferType<typeof schema>;

interface CreateRegistrarProps {
  OnCreateComplete: (isSuccess: boolean)=> void
}

const _CreateRegistrar: React.ForwardRefRenderFunction<ReusableDrawerRef, CreateRegistrarProps> =(props, ref) => {
  let drawerRef = useRef<ReusableDrawerRef>(null);
  useImperativeHandle(ref, ()=>({
    hideDrawer,
    showDrawer,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [stateOptions, setStateOptions] = useState<object[]>([]);
  const StatesResults = useFetchCountryStatesQuery();

  useEffect(() => {
    let options: object[] = []
    if(StatesResults.data){
      StatesResults.data.map((item: CountryStateModel) =>
      options.push({
          name: item.name,
          value: item.id
        })
      );
    }
    setStateOptions(options);
  },[StatesResults])

  const {OnCreateComplete} = props;

  const handlePhoneNumberChange = (value: any) => {
    setValue('phone', value);
  };
  const [toggleModal, setToggleModal] = useState(false);
  const [createRegistrar, response]  = useCreateRegistrarMutation();
  const { isLoading, isError, isSuccess } = response;

  useEffect(()=>{ 
    if(response?.isSuccess){
      reset();
      hideDrawer();
      setToggleModal(true);
      OnCreateComplete(response?.isSuccess);
    }
  },[response])

  const onSubmit = (data: FormData) =>{
    createRegistrar({...data, applicationRoleId: "d9998801-e182-8aa0-186e-948608859953"})
    .then((res: any) => {
      if (res.error) {
        toast.error(`${res.error.data.title}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  }
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
      <SuccessModal
        openModal={toggleModal}
        onDoneClicked={() => setToggleModal(false)}
        message="Registrar added Successfully"
      />
      <ReusableDrawer
        drawerId="create-registrar-drawer"
        placement="right"
        drawerTitle="Add Registrar"
        subTitle="Registrar Information"
        ref={drawerRef}
        onDrawerHide={reset}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pb-20 flex flex-col justify-between h-full"
        >
          <MyTextInput
            label="Registrar Name"
            type="text"
            required={true}
            register={register}
            name="name"
            errors={errors}
          />
          <MyTextInput
            label="Email"
            name="email"
            required={true}
            type="emai"
            register={register}
            errors={errors}
          />
          <MyTextInput
            label="First Name"
            type="text"
            required={true}
            register={register}
            name="firstName"
            errors={errors}
          />
          <MyTextInput
            label="Last Name"
            type="text"
            required={true}
            register={register}
            name="lastName"
            errors={errors}
          />
          <MyTextInput
            label="Admin Email"
            name="adminEmail"
            required={true}
            type="emai"
            register={register}
            errors={errors}
          />
          <MySelect
            label="Admin Gender"
            name="gender"
            required={true}
            options={[
              {
                name: "Male",
                value: "Male",
              },
              {
                name: "Female",
                value: "Female",
              },
            ]}
            register={register}
            errors={errors}
          />
          <MyTextInput
            label="Admin Date of Birth"
            name="dateOfBirth"
            type="date"
            required={true}
            register={register}
            errors={errors}
          />
          <MyPhoneNumberInput
            label="Phone"
            placeholder="Enter phone number"
            name="phone"
            errors={errors}
            handleChange={handlePhoneNumberChange}
          />

          <MyTextInput
            label="Address of Registar"
            name="address"
            type="address"
            register={register}
            errors={errors}
          />
          <MySelect
            label="Currency"
            name="currency"
            required={true}
            options={[
              {
                name: "Naira",
                value: "Naira",
              },
            ]}
            register={register}
            errors={errors}
          />
          <MySelect
            label="Country"
            name="country"
            options={[
              {
                name: "Nigeria",
                value: "nigeria",
              }
            ]}
            register={register}
            errors={errors}
          />
          <MySelect
            label="State"
            name="stateId"
            options={stateOptions}
            register={register}
            errors={errors}
          />
          <div className="flex col-span-6 sm:col-full space-x-4 mt-4 justify-end">
            <AppButton
              type="button"
              text="Cancel"
              buttonClick={hideDrawer}
              appButtonType="green-outline"
            />
            <AppButton
              text={"Save"}
              appButtonType="green-button"
              isLoading={isLoading}
              disabled={isLoading}
              id="successButton"
              type="submit" 
              buttonClick={undefined}            
            />
          </div>
        </form>
      </ReusableDrawer>
    </>
  );
};

const CreateRegistrar = forwardRef<ReusableDrawerRef, CreateRegistrarProps>(_CreateRegistrar);
export default CreateRegistrar;
