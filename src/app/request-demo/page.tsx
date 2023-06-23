"use client"

import FormInput from "@/components/FormElements/FormInput";
import LandingPageLayout from "@/components/LandingPage/LandingPageLayout";
import { NextPage } from "next";
import { Sora } from "next/font/google";
import Image from "next/image";
import { RequestDemoFormSchema, RequestDemoFormState } from "./securities/RequestDemoForm/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import FormButton from "@/components/FormElements/FormButton";
import FormTextArea from "@/components/FormElements/FormTextArea";
import { toast } from "react-toastify";
import { useRequestDemoMutation } from "./requestDemoApiSlice";

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});
  

const RequestDemoPage: NextPage<any> = ()=>{

    // State
    const [hasConsent, setHasConsent] = React.useState<boolean>(false);

    // RTK Queries
    const [requestDemo, response] = useRequestDemoMutation();

    // Variables
    let initialValues: RequestDemoFormState = {
        name: '',
        email: '',
        message: '',
        organisation: "",
        designation: ""
    }

    // Hooks
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<RequestDemoFormState>({
        resolver: yupResolver(RequestDemoFormSchema),
        defaultValues: initialValues
    })


    // Handlers
    const onFormSubmit: SubmitHandler<RequestDemoFormState> = async (state)=>{
        requestDemo(state).then((res)=>{
            reset()
            toast.success("Message sent successfully !", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch((e)=>{
            toast.error("An error occured while sending your request", {
                position: toast.POSITION.TOP_CENTER
            });
        })

    }

    const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
       setHasConsent(e.currentTarget.checked);
    };

    return(
        <LandingPageLayout>
            <section className="sm:p-11 p-8 bg-[#E4F2E4] flex-1 flex flex-col justify-center">

                {/** Grid */}
                <div className="grid lg:grid-cols-2 grid-cols-1 h-full">
                    
                    {/** Hero Text and Form */}
                    <div className="flex flex-col justify-center">
                        <h1
                            className={`text-brand-200 text-semibold lg:text-5xl sm:text-4xl text-3xl ${sora.className}`}
                        >
                            Experience the Future 
                        </h1>
                        <span className={`text-black text-semibold lg:text-5xl sm:text-4xl text-3xl ${sora.className}`}> 
                            Request a Live Demo.
                        </span>
                        <p className="lg:text-lg text-gray-900 font-medium mt-8">
                            Greenpole enables capital market operators to 
                            efficiently and effectively handle data, establish connections, 
                            and deliver exceptional shareholders’ experiences.
                        </p>
                        
                        {/** Form */}
                        <form className="space-y-6 mt-16" onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="flex sm:flex-row flex-col sm:space-x-8 sm:space-y-0 space-y-6">
                                <FormInput
                                    id="demo-name"
                                    containerClass="w-full"
                                    label="Name*"
                                    placeholder="Bonnie Green"
                                    error={!!errors.name}
                                    errorMessage={errors.name?.message}
                                    {...register('name')}
                                />
                                <FormInput
                                    id="demo-email"
                                    containerClass="w-full"
                                    label="Email*"
                                    placeholder='name@example.com'
                                    error={!!errors.email}
                                    errorMessage={errors.email?.message}
                                    {...register('email')}
                                />
                            </div>
                            <div className="flex sm:flex-row flex-col sm:space-x-8 sm:space-y-0 space-y-6">
                                <FormInput
                                    id="demo-organisation"
                                    containerClass="w-full"
                                    label="Organization*"
                                    placeholder='Company XYZ Ltd.'
                                    error={!!errors.organisation}
                                    errorMessage={errors.organisation?.message}
                                    {...register('organisation')}
                                />
                                <FormInput
                                    id="demo-designation"
                                    containerClass="w-full"
                                    label="Designation*"
                                    placeholder='Lead marketer...'
                                    error={!!errors.organisation}
                                    errorMessage={errors.organisation?.message}
                                    {...register('designation')}
                                />
                            </div>
                            <FormTextArea
                                id="demo-message"
                                label="Message*"
                                placeholder='Enter Message'
                                error={!!errors.message}
                                errorMessage={errors.message?.message}
                                onChange={(e)=>{
                                    setValue('message', e.target.value, { shouldValidate: true });
                                }}
                            />

                            {/** Consent checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="remember-checkbox"
                                    type="checkbox"
                                    value=""
                                    checked={hasConsent}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />

                                <label
                                    htmlFor="remember-checkbox"
                                    className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                                >
                                    I consent to the terms and conditions stated in the Privacy Policy *
                                </label>
                            </div>

                            <FormButton className={`w-auto ${hasConsent ? 'bg-brand-200' : 'bg-gray-200 text-gray-500'}`}
                                // onClick={()=> props.handleSubmit()}
                                loading={response.isLoading}
                                disabled={!hasConsent}
                            >
                                Submit
                            </FormButton>
        
                        </form>
                        
                    </div>
                    
                    {/** Hero Image */}
                    <div className="flex flex-col justify-center">
                        <div className="lg:h-[750px] h-[550px] hidden lg:block relative">
                            <Image
                                src="/images/landing/requestDemoHero.png"
                                fill
                                className="w-full h-full top-0 left-0 object-cover"
                                alt="Greenpole"
                            />
                        </div>
                    </div>

                </div>
            </section>
        </LandingPageLayout>
    )
}

export default RequestDemoPage;