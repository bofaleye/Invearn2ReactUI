"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { CgSpinner } from "react-icons/cg";

export interface FormButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

// eslint-disable-next-line react/display-name
const FormButton = React.forwardRef<HTMLButtonElement,FormButtonProps>(({
    loading,
    children,
    className,
    ...props
},ref)=>{

    // Classes
   let defaultClasses = "py-3 px-5 w-full text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-300 bg-primary-500 inline-flex items-center justify-center";
   let buttonClasses = twMerge(defaultClasses, className);
    
    return(
        <button 
            className={buttonClasses} 
            ref={ref} 
            {...props}
            disabled={loading ? true : props.disabled}
        >
            {
                loading &&
                <CgSpinner className='inline animate-spin mr-2' size={20}/>
            }
            { children }
        </button>
    )
})

export default FormButton;
