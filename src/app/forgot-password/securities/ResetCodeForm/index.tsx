"use client"

import FormButton from "@/components/FormElements/FormButton";
import FormInput from "@/components/FormElements/FormInput";
import React from "react";
import { ResetCodeFormSchema, ResetCodeFormState } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

export interface ResetCodeFormProps{
    onFormSubmit?: (code: string)=> void;
    isLoading?: boolean
}

const ResetCodeForm: React.FC<ResetCodeFormProps> = ({
    onFormSubmit, 
    isLoading
})=>{

    // Variables
    let initialValues: ResetCodeFormState = {
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",
        pin5: "",
        pin6: ""
    }

    // Hooks
    const { handleSubmit, setValue, formState: { errors } } = useForm<ResetCodeFormState>({
        resolver: yupResolver(ResetCodeFormSchema)
    })

    // Refs
    const pin1ref = React.createRef<HTMLInputElement>();
    const pin2ref = React.createRef<HTMLInputElement>();
    const pin3ref = React.createRef<HTMLInputElement>();
    const pin4ref = React.createRef<HTMLInputElement>();
    const pin5ref = React.createRef<HTMLInputElement>();
    const pin6ref = React.createRef<HTMLInputElement>();

    
    // Handlers
    const backAutoFocus = (name: string)=>{
        switch (name) {
            case 'pin2':
                pin1ref.current?.focus()
                break;

            case 'pin3':
                pin2ref.current?.focus()
                break;

            case 'pin4':
                pin3ref.current?.focus()
                break;

            case 'pin5':
                pin4ref.current?.focus()
                break;

            case 'pin6':
                pin5ref.current?.focus()
                break;
        
            default:
                break;
        }
    }

    const handleSubmitForm: SubmitHandler<ResetCodeFormState> = (values)=>{
        let { pin1, pin2, pin3, pin4, pin5, pin6 } = values;
        let code = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
        onFormSubmit && onFormSubmit(code)
    }


    // Effect
    React.useEffect(()=>{
        pin1ref.current?.focus();
    },[pin1ref]);

    return(
        <div className="bg-white rounded-lg shadow lg:w-2/5 sm:w-3/5 w-full dark:bg-gray-800 md:p-14 px-6 py-10">
            
            {/** GreenPole Logo */}
            <div className="mb-8">
                <Image
                    src="/Greenpole-Logo 1.svg"
                    alt=""
                    width={178}
                    height={61}
                />
            </div>

            <div className="w-full">

                {/** Title */}
                <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
                    Enter Code
                </h2>

                <p className="my-5 text-gray-500 sm:text-base text-sm">
                    {`Don't fret! Just type in your email and we will send 
                    you a code to reset your password!`}
                </p>

                {/** Form */}
                <form className="space-y-6 lg:pb-5" onSubmit={handleSubmit(handleSubmitForm)}>

                    {/** Inputs */}
                    <div className="flex lg:space-x-7 md:space-x-4 space-x-2">
                        <FormInput
                            ref={pin1ref}
                            className="text-center sm:p-2.5 p-2 sm:w-[50px] sm:h-[50px]"
                            maxLength={1}
                            error={!!errors.pin1}
                            errorMessage=""
                            onChange={(e)=>{
                                setValue('pin1', e.target.value, { shouldValidate: true });
                                if (e.target.value !== '') {
                                    pin2ref.current?.focus();
                                }
                            }}
                        />
                        <FormInput
                            ref={pin2ref}
                            className="text-center sm:p-2.5 p-2 sm:w-[50px] sm:h-[50px]"
                            maxLength={1}
                            error={!!errors.pin2}
                            errorMessage=""
                            onChange={(e)=>{
                                setValue('pin2', e.target.value, { shouldValidate: true });
                                pin3ref.current?.focus();

                                if (e.target.value === '') {
                                    backAutoFocus('pin2')
                                }
                            }}
                        />
                        <FormInput
                            ref={pin3ref}
                            className="text-center sm:p-2.5 p-2 sm:w-[50px] sm:h-[50px]"
                            maxLength={1}
                            error={!!errors.pin3}
                            errorMessage=""
                            onChange={(e)=>{
                                setValue('pin3', e.target.value, { shouldValidate: true });
                                pin4ref.current?.focus();

                                if (e.target.value === '') {
                                    backAutoFocus('pin3')
                                }
                            }}
                        />
                        <FormInput
                            ref={pin4ref}
                            className="text-center sm:p-2.5 p-2 sm:w-[50px] sm:h-[50px]"
                            maxLength={1}
                            error={!!errors.pin4}
                            errorMessage=""
                            onChange={(e)=>{
                                setValue('pin4', e.target.value, { shouldValidate: true });
                                pin5ref.current?.focus();

                                if (e.target.value === '') {
                                    backAutoFocus('pin4')
                                }
                            }}
                        />
                        <FormInput
                            ref={pin5ref}
                            className="text-center sm:p-2.5 p-2 sm:w-[50px] sm:h-[50px]"
                            maxLength={1}
                            error={!!errors.pin5}
                            errorMessage=""
                            onChange={(e)=>{
                                setValue('pin5', e.target.value, { shouldValidate: true });
                                pin6ref.current?.focus();

                                if (e.target.value === '') {
                                    backAutoFocus('pin5')
                                }
                            }}
                        />
                        <FormInput
                            ref={pin6ref}
                            className="text-center sm:p-2.5 p-2 sm:w-[50px] sm:h-[50px]"
                            maxLength={1}
                            error={!!errors.pin6}
                            errorMessage=""
                            onChange={(e)=>{
                                setValue('pin6', e.target.value, { shouldValidate: true });
                                if (e.target.value === '') {
                                    backAutoFocus('pin6')
                                }
                                // pin2ref.current?.focus();
                            }}
                        />
                    </div>


                    <FormButton className="bg-brand-200"
                        // onClick={()=> props.handleSubmit()}
                        loading={isLoading}
                    >
                        Recover Password
                    </FormButton>
                </form>
            </div>
        </div>
    )
}

export default ResetCodeForm;