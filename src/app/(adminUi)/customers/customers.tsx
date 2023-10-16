"use client";

import React, { useEffect, useRef, useState } from "react";
// import NewUser from "./NewUser";
import { PlusIcon } from "@/assets";
import { ITableColumn } from "@/components/Table/model";
import SuccessModal from "@/components/Modals/SuccessModal";
import { useFetchUsersQuery } from "./CustomerApiSlice";
import BreadCrumbs from "@/components/AdminUi/BreadCrumbs";

import CustomersTable from "./customersTable";
import { ICustomer } from "@/models/customer";
import AppSkeleton from "@/components/Skeleton";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";
// import EditUser from "./[id]/EditUserProfile";

export default function Customers() {
  // let addNewUserRef = useRef<ReusableDrawerRef>(null);
  // let editUserRef = useRef<ReusableDrawerRef>(null);
  const {
    data,
    isFetching: isFetchingUsers,
    refetch: refetchUsers,
  } = useFetchUsersQuery();
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [usersData, setUsersData] = useState<ICustomer[]>([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [actionUser, setActionUser] = useState<ICustomer>();

  const handleUsersRefresh = (isSuccess: boolean) => {
    if (isSuccess) {
      refetchUsers();
    }
  };

  // const handleEditDrawer = (data: IUser) => {
  //   setActionUser(data);
  //   editUserRef.current?.showDrawer();
  // };

  useEffect(() => {
    setUsersData(data || []);
  }, [data]);

  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          { label: "Customer Management", link: "#", isActive: true },
          { label: "Customers", link: '/customers', isActive: true },
        ]}
      />

      <SuccessModal />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Customers</h1>
          {/* Use Ikem's Form Button */}
          {/* <button
            type="button"
            className="inline-flex items-center w-max py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            data-drawer-target="create-user-drawer"
            data-drawer-show="create-user-drawer"
            data-drawer-placement="right"
            aria-controls="create-user-drawer"
          >
            <PlusIcon className="h-8 w-8" /> Add New User
          </button> */}

          {/* <NewUser ref={addNewUserRef} OnCreateComplete={handleUsersRefresh} /> */}
          {/* <EditUser
            ref={editUserRef}
            userData={actionUser as IUser}
            OnEditComplete={handleUsersRefresh}
          /> */}
        </div>
        {isFetchingUsers ? (
          <AppSkeleton type="table" />
        ) : (
          <CustomersTable
            data={usersData}
            refetch={refetchUsers}
            // handleEdit={(data: IUser) => handleEditDrawer(data)}
          />
        )}
      </div>
    </div>
  );
}
