"use client";

import { DropDownIcon } from "@/assets";
import React from "react";

export interface DropDownProps {
  id: string;
  text: string;
  options?: any;
  handleChange: any;
}

const DropDown: React.FC<DropDownProps> = ({
  id,
  text,
  options,
  handleChange,
}) => {
  return (
    <div>
      <button
        data-dropdown-toggle={`dropdown-${id}`}
        className="w-full text-gray-900 border border-gray-300 bg-gray-50 hover:bg-gray-300 focus:ring-4 focus:outline-gray-300 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex justify-between items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <div>{text}</div>
        <DropDownIcon className="w-4 h-4 ml-2" />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        id={`dropdown-${id}`}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={`dropdown-${id}`}
        >
          {options.map((item: any, index: number) => (
            <li key={index}>
              <div
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={handleChange(item)}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DropDown;
