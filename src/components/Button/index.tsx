"use client";
import { Spinner } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appButtonType:
    | "green-outline"
    | "red-outline"
    | "red-button"
    | "green-button"
    | "deep-green"
    | "light-green"
    | "grey-button";
  height?: "default" | "small";
  isIcon?: boolean;
  props?: any;
  icon?: ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading = false,
  appButtonType,
  height = "default",
  isIcon = false,
  icon = <></>,
  children,
  className,
  ...rest
}, ref) => {
  let colorCss = "";

  switch (appButtonType) {
    case "green-outline":
      colorCss =
        "text-green-800 border border-green-600 focus:outline-none hover:bg-gray-100 ";
      break;
    case "red-outline":
      colorCss =
        "text-red-500 border border-red-500 focus:outline-none hover:bg-gray-100 ";
      break;
    case "red-button":
      colorCss = "text-white border border-red-500 bg-red-500 hover:bg-red-700";
      break;
    case "green-button":
      colorCss =
        "text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 ";
      break;
    case "deep-green":
      colorCss =
        "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 ";
      break;
    case "grey-button":
      colorCss = "text-slate-700 bg-slate-100 hover:bg-slate-200";
      break;
    case "light-green":
      colorCss =
        "text-green-600 hover:text-white dark:hover:text-white bg-green-100 hover:bg-green-700 focus:ring-4 ";
      break;
  }

  let heightCss = "";

  switch (height) {
    case "default":
      heightCss = "px-5 py-2.5";
      break;
    case "small":
      heightCss = "px-3 py-2";
      break;
  }

  return (
    <button
      className={twMerge(
      "focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 whitespace-nowrap",
      isIcon && "w-full md:w-auto flex items-center justify-center",
      heightCss,
      colorCss,
      className
      )}
      {...rest}
      ref={ref}>
      {isLoading ? <Spinner className="mr-1" /> : isIcon && icon}
      {children}
    </button>
  );
  }
);
Button.displayName = 'Button'


export default Button;
