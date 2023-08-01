"use strict";

import { NoDataIcon, PlusIcon } from "@/assets";
import React from "react";
import Button from "../../Button";

export interface EmptyTableProps {
  buttonText: string;
  buttonMethod: () => void;
  bodyText: string;
  buttonProps: any;
  type?: "in-table" | "default";
  colspan?: number;
}

const EmptyTable: React.FC<EmptyTableProps> = ({
  buttonText,
  bodyText,
  buttonMethod,
  buttonProps,
  type = "default",
  colspan = 1,
}) => {
  switch (type) {
    case "default":
      return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg sm:p-6 xl:p-8 dark:bg-gray-800">
          <NoDataIcon />

          <h5 className="text-base font-medium text-gray-900 my-4">
            No data yet
          </h5>

          <p className=" font-medium text-sm text-gray-500 mb-6 text-center">
            {`To add a ${bodyText}, simply click the "${buttonText.toLowerCase()}"`}{" "}
            <b /> button below.
          </p>
          <Button
            onClick={buttonMethod}
            {...buttonProps}
            icon={<PlusIcon className="h-4" />}
            isIcon={true}
            appButtonType="deep-green"
          >{buttonText}</Button>
        </div>
      );
    case "in-table":
      return (
        <tbody>
          <tr>
            <td colSpan={colspan}>
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                <NoDataIcon />

                <h5 className="text-base font-medium text-gray-900 my-4">
                  No data yet
                </h5>

                <p className=" font-medium text-sm text-gray-500 mb-6 text-center">
                  {`To add a ${bodyText}, simply click the "${buttonText.toLowerCase()}"`}{" "}
                  <b /> button below.
                </p>
                <Button
                  onClick={buttonMethod}
                  {...buttonProps}
                  icon={<PlusIcon className="h-4" />}
                  isIcon={true}
                  appButtonType="deep-green"
                >{buttonText}</Button>
              </div>
            </td>
          </tr>
        </tbody>
      );
  }
};

export default EmptyTable;
