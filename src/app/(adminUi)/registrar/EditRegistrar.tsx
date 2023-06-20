"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MyPhoneNumberInput, MySelect, MyTextInput } from "@/components/FormElements/Inputs";
import ReusableDrawer, { ReusableDrawerRef } from "@/components/ReusableDrawer";
import { useFetchCountryStatesQuery, useUpdateRegistrarMutation } from "./registrarApiSlice";
import SuccessModal from "@/components/Modals/SuccessModal";
import AppButton from "@/components/Button";
import { CountryStateModel, IRegistrarsTableData } from "@/models/registrar";

const schema = Yup.object({
  name: Yup.string().required("Registrar Name is Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  address: Yup.string(),
  currency: Yup.string().required("Required"),
  stateId: Yup.string(),
  country: Yup.string(),
  phone: Yup.string()
});
type FormData = Yup.InferType<typeof schema>;

interface EditRegistrarProps {
  registrar: IRegistrarsTableData;
  OnEditComplete: (isSuccess: boolean)=> void
}

const _EditRegistrar: React.ForwardRefRenderFunction<ReusableDrawerRef, EditRegistrarProps> =(props, ref) => {
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const {registrar, OnEditComplete} = props;

  const handlePhoneNumberChange = (value: any) => {
    setValue('phone', value);
  };
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(()=> {
    const fields = ['id', 'name', 'email', 'address', 'currency', 'stateId', 'country', 'phone'];
    fields.forEach((field: any) => {
      if(registrar && registrar[field])
        setValue(field, registrar[field])
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[registrar]);
  const [updateRegistrar, response]  = useUpdateRegistrarMutation();
  const { isLoading, isError, isSuccess } = response;

  useEffect(()=>{ 
    if(response?.isSuccess){
      hideDrawer();
      setToggleModal(true);
      OnEditComplete(response?.isSuccess);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[response]);

  
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

  const onSubmit = (data: FormData) =>{
    updateRegistrar(data);
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
      {toggleModal && (
        <SuccessModal
          onDoneClicked={() => setToggleModal(!toggleModal)}
          message="Registrar edited Successfully"
        />
      )}
      <ReusableDrawer
        drawerId="edit-registrar-drawer"
        placement="right"
        drawerTitle="Edit Registrar"
        subTitle="Registrar Information"
        ref={drawerRef}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pb-20 flex flex-col justify-between h-full"
        >
          <MyTextInput
            label="Name"
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
          
          <MyPhoneNumberInput
            value={registrar?.phone}
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

const EditRegistrar = forwardRef<ReusableDrawerRef, EditRegistrarProps>(_EditRegistrar);
export default EditRegistrar;
