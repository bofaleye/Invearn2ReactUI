import ProfileInfo from "@/components/ProfileInfo";
import React, { Component } from "react";
import { useFetchuserByIdQuery } from "./createUserApiSlice";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const { id: routeUserId } = useParams();
  const { data, isFetching } = useFetchuserByIdQuery(routeUserId);
  return (
    <div className="w-[90%]  flex justify-between">
      {/* Make Generic e.g UserInfo */}
      <ProfileInfo
        RegistrarName={`${data?.firstname} ${data?.lastname}`}
        EmailAddress={`${data?.email}`}
        OfficeAddress={
          data?.organisation.address || "222B Palmgrove Ikorodu Rd"
        }
        PhoneNumber={"08098123456"}
        UserType={"User"}
      />

      <div className="w-[62%] flex justify-center items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800">
        <div className="w-[90%] grid grid-cols-2 grid-rows-2 gap-y-2.5">
          <div>
            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gender
            </h3>
            <b>{data?.gender || "Male"}</b>
          </div>
          <div>
            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Position
            </h3>
            <b>Operations Officer</b>
          </div>
          <div>
            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User Role
            </h3>
            <b>User</b>
          </div>
          <div>
            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date of Birth
            </h3>
            <b>24-09-1985</b>
          </div>

          <div>
            <small>Status</small>
            <p>Active</p>
          </div>
          <div>
            <small>Department</small>
            <p>Operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tabs
//   TabsHeaders
//       header1
//       deasde2
//   TabsContents
//     Content1
//       Component
//         left | right
