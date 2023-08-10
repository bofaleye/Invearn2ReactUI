"use client";

// import { UploadFileIcon } from '@/assets';
import React, { FC, useEffect, useState } from "react";
import Button from "../Button";
import { UploadFileIcon } from "@/assets";
interface ProfileInfoData {
  RegistrarName: string;
  EmailAddress: string;
  OfficeAddress: string;
  PhoneNumber: string;
  UserType: string;
  handleEdit?: any;
}

const ProfileInfo: FC<ProfileInfoData> = (
  profileInfo: ProfileInfoData
) => {
  const [info, setRegistrarInfo] = useState<ProfileInfoData>();
  const [firstName, lastName] = profileInfo.RegistrarName.split(" ");
  useEffect(() => {
    setRegistrarInfo(info);
  }, [profileInfo, info]);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="w-full flex items-center justify-end">
        <h3 className="mb-4 text-sm font-semibold text-green-400 dark:text-white text-right py-1 px-2 rounded bg-green-100">
          {profileInfo?.UserType}
        </h3>
      </div>

      <div className="col-span-6 sm:col-full flex flex-col justify-center items-center w-full">
        <div className="relative w-28 h-28  bg-gray-100 rounded-full dark:bg-gray-600">
          {/* <label htmlFor="avatar" className="flex w-full h-full cursor-pointer"> */}
          {/* <input id="avatar" type="file" className="hidden" name="avatar"
                    accept="image/jpeg, image/png" required /> */}
          {/* </label> */}
          {/* <!-- place the image src here --> */}
          <div className="relative w-28 h-28 flex justify-center items-center   rounded-full w-full overflow-hidden">
            <b className="text-[32px]">
              {firstName && firstName[0]}
              {lastName && lastName[0]}
            </b>
          </div>
          <div className="absolute bottom-0 right-0">
            <UploadFileIcon />
          </div>
        </div>
        <div className="my-2">
          <h2 className="font-bold text-xl">{profileInfo?.RegistrarName}</h2>
        </div>
        <div className="mb-4">
          <Button
            appButtonType="deep-green"
            onClick={()=> {
              if(profileInfo?.handleEdit){
                profileInfo?.handleEdit();
              }
            }}
            data-drawer-target="edit-user-drawer"
            data-drawer-show="edit-user-drawer"
            data-drawer-placement="right"
            aria-controls="edit-user-drawer"
          >Edit Profile</Button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Email Address
        </h3>
        <b>{profileInfo?.EmailAddress}</b>
      </div>
      <div className="mb-6">
        <h3 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Office Address
        </h3>
        <b>{profileInfo?.OfficeAddress}</b>
      </div>
      <div className="mb-6">
        <h3 className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Phone Number
        </h3>
        <b>{profileInfo?.PhoneNumber}</b>
      </div>
    </div>
  );
};

export default ProfileInfo;
