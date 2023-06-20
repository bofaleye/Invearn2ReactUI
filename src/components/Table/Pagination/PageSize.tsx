"use client";

import React, { FC } from "react";
import { PageSizeProps } from "./model";

const PageSize: FC<PageSizeProps> = ({ start, end, length }) => {
  return (
    <div>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">{` ${start}-${end} `}</span>
        of
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          {length}
        </span>
      </p>
    </div>
  );
};

export default PageSize;
