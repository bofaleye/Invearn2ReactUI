import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { UserRole } from "@/models/UserRole";
import { FieldErrors, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: any;
  type?: string;
  register: any;
  errors: any;
  name: string;
}
interface SelectProps extends InputProps {
  options?: UserRole[] | object[] | undefined;
  cssClass?: string;
}
interface PhoneInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  label: any;
  required?: boolean;
  placeholder: string;
  errors?: any;
  cssClass?: string;
  name: string;
  handleChange: any;
}

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string;
  label: string;
  errors?: FieldErrors<FieldValues>;
  cssClass?: string;
}

interface TextAreaProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  name: string;
  label: string;
  errors: FieldErrors<FieldValues>;
}

export const TextInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ label, required, errors, name, type, cssClass, ...props }, ref) => (
    <div className={`col-span-6 ${cssClass ? cssClass : "sm:col-full mb-5"}`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        className={twMerge(
          "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
          errors?.[name] && "border-red-400 bg-red-100 "
        )}
        {...props}
        ref={ref}
      />
      {errors && 
        <small className="text-red-500">
          <ErrorMessage errors={errors} name={name} />
        </small>
      }
    </div>
  )
);
TextInput.displayName = "TextInput";

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, errors, name, rows = 3, ...props }, ref) => (
    <div className="col-span-6 sm:col-full mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className={`${
          errors?.[name] ? "border-red-400 bg-red-100 " : ""
        }shadow-sm bg-gray-50 border
      border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
        {...props}
        ref={ref}
      />
      <small className="text-red-500">
        <ErrorMessage errors={errors} name={name} />
      </small>
    </div>
  )
);
TextArea.displayName = "TextArea";

/**
 * @deprecated This component is deprecated in favour of the TextInput
 *
 * Use TextInput instead, it provides improved type safety and
 * better IDE intelisense
 */
export const MyTextInput = ({
  register,
  label,
  required,
  name,
  type,
  errors,
  ...props
}: InputProps) => {
  return (
    <div className="col-span-6 sm:col-full mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        className={`${
          errors[name] ? "border-red-400 bg-red-100 " : ""
        }shadow-sm bg-gray-50 border
          border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
        {...props}
        {...register(name)}
        type={type}
      />
      {errors[name] && (
        <small className="text-red-500">{errors[name].message}</small>
      )}
    </div>
  );
};

export const MySelect = ({
  label,
  required,
  options,
  errors,
  name,
  register,
  cssClass,
  ...props
}: SelectProps) => {
  return (
    <div className={`col-span-6  ${cssClass ? cssClass : "sm:col-full mb-5"}`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        className={`${
          errors[name] ? "border-red-400 bg-red-100 " : ""
        }bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        {...register(name)}
        {...props}
      >
        <option value="">Select</option>
        {options?.map((opt: any) => (
          <option value={opt.value} key={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
      {errors[name] && (
        <small className="text-red-500">{errors[name].message}</small>
      )}
    </div>
  );
};

export const MyPhoneNumberInput = ({
  label,
  value,
  name,
  required,
  errors,
  placeholder,
  cssClass,
  handleChange,
  ...props
}: PhoneInputProps) => {
  return (
    <div className={`col-span-6  ${cssClass ? cssClass : "sm:col-full mb-5"}`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className={`${errors[name] && "phone-error"}`}>
        <PhoneInput
          defaultCountry="NG"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          displayInitialValueAsLocalNumber={true}
        />
      </div>
      {errors[name] && (
        <small className="text-red-500">{errors[name].message}</small>
      )}
    </div>
  );
};
