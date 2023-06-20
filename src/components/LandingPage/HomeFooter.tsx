"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMail } from "react-icons/hi";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";

const HomeFooter: React.FC<any> = () => {
  return (
    <div className="px-12 py-10 bg-white">
      {/** Top Section */}
      <div className="flex items-center justify-between flex-wrap sm:space-y-0 space-y-8">
        <Image
          src="/Greenpole-Logo 1.svg"
          width={131}
          height={45}
          alt="Greenpole Logo"
        />

        <div className="relative sm:w-2/5 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-black rounded-r-lg border border-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/** Divider */}
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/** Bottom Section */}
      <div className="flex items-center justify-between flex-wrap sm:space-y-0 space-y-8">
        <p className="text-gray-500 font-normal">
          © 2023 Greenpole. All rights reserved.
        </p>
        <div className="inline-flex items-center space-x-4 justify-end sm:w-auto w-full">
          <AiFillLinkedin className="text-gray-500 w-[20px] h-[20px]" />
          <AiFillFacebook className="text-gray-500 w-[20px] h-[20px]" />
          <AiFillTwitterSquare className="text-gray-500 w-[20px] h-[20px]" />
          <FaInstagramSquare className="text-gray-500 w-[20px] h-[20px]" />
        </div>
      </div>

      {/** Divider */}
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/** Bottom Section */}
      {/* <div className="flex items-center justify-between">
        <p className="text-gray-500 font-normal">
          © 2023 Greenpole. All rights reserved.
        </p>
        <div className="inline-flex items-center space-x-4">
          <AiFillLinkedin className="text-gray-500 w-[20px] h-[20px]" />
          <AiFillFacebook className="text-gray-500 w-[20px] h-[20px]" />
          <AiFillTwitterSquare className="text-gray-500 w-[20px] h-[20px]" />
          <FaInstagramSquare className="text-gray-500 w-[20px] h-[20px]" />
        </div>
      </div> */}
    </div>
  );
};

export default HomeFooter;
