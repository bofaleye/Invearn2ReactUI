"use client"

import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface FormTextAreaProps extends 
React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
    error?: boolean;
    errorMessage?: string;
    labelClass?: string;
    label?: string;
    containerClass?: string;
}

// eslint-disable-next-line react/display-name
const FormTextArea = React.forwardRef<HTMLTextAreaElement,FormTextAreaProps>(({
    error = false, 
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

    // Effect for error changes
    React.useEffect(()=>{
        setIsError(error);
    }, [error]);

    // Classes
    let defaultLabelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
    let defaultTextAreaClasses = `block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${isError ? 'bg-red-100' : ''}`
    let errorClasses = isError ? "border-red-400" : "";
    let labelClasses = twMerge(defaultLabelClasses, labelClass);
    let textAreaClasses = twMerge(defaultTextAreaClasses, className, errorClasses);
    
    return(
        <div className={containerClass}>
            {
                label &&
                <label htmlFor={id} className={labelClasses}>
                    { label }
                </label>
            }
            <textarea 
                ref={ref}
                id={id}
                rows={4}
                { ...props }
                className={textAreaClasses}
            ></textarea>
            {
                isError &&
                <label htmlFor={id} className="text-xs text-red-400">
                    { errorMessage }
                </label>
            }
        </div>
    )
})

export default FormTextArea;