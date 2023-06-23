/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "flowbite-react";
import type { FC } from "react";
import { HiChevronLeft } from "react-icons/hi";

const Loading: FC = function () {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-16">
      <h1 className="mt-6 mb-3 w-4/5 text-center text-4xl font-bold dark:text-white">
        Page Loading
      </h1>
    </div>
  );
};

export default Loading;
