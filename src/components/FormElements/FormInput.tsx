"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

export interface FormInputProps extends 
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    error?: boolean;
    success?: boolean;
    errorMessage?: string;
    labelClass?: string;
    label?: string;
    containerClass?: string;
}

// eslint-disable-next-line react/display-name
const FormInput = React.forwardRef<HTMLInputElement,FormInputProps>(({
    error = false, 
    success = false,
    errorMessage = 'This field is required', 
    className, 
    id,
    labelClass, 
    label,
    containerClass,
    ...props
},ref)=>{

    // State
    const [isError, setIsError] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

    // Effect for error changes
    React.useEffect(() => {
      setIsError(error);
    }, [error]);

    React.useEffect(()=>{
        setIsSuccess(success);
    }, [success]);

    // Classes
    let defaultLabelClasses =
      "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
    let defaultInputClasses = `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
      isError ? "bg-red-100" : ""
    }`;
    let errorClasses = isError ? "border-red-400" : "";
    let successClasses = isSuccess ? "border-brand-200" : "";
    let labelClasses = twMerge(defaultLabelClasses, labelClass);
    let inputClasses = twMerge(defaultInputClasses, className, errorClasses, successClasses);
    
    return(
        <div className={containerClass}>
            {
                label &&
                <label htmlFor={id} className={labelClasses}>
                    { label }
                </label>
            }
            <input 
                ref={ref}
                id={id}
                { ...props }
                className={inputClasses}
            />
            {
                isError &&
                <label htmlFor={id} className="text-xs text-red-400">
                    { errorMessage }
                </label>
            }
        </div>
    )
})

export default FormInput;
