"use client";

import React, { useEffect, useRef, useState } from "react";
import NewUser from "./NewUser";
import { PlusIcon } from "@/assets";
import { ITableColumn } from "@/components/Table/model";
import SuccessModal from "@/components/Modals/SuccessModal";
import { useFetchUsersQuery } from "./UserApiSlice";
import BreadCrumbs from "@/components/AdminUi/BreadCrumbs";

import UsersTable from "./usersTable";
import { IUser } from "@/models/user";
import AppSkeleton from "@/components/Skeleton";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";
import APP_ROUTES from "@/constants/appRoute";
import EditUserDrawer from "./[id]/EditUserProfile";
// import EditUser from "./[id]/EditUserProfile";

export default function Users() {
  // let addNewUserRef = useRef<ReusableDrawerRef>(null);
  // let editUserRef = useRef<ReusableDrawerRef>(null);
  const {
    data,
    isFetching: isFetchingUsers,
    refetch: refetchUsers,
  } = useFetchUsersQuery();
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [usersData, setUsersData] = useState<IUser[]>([]);
  
  const [openNewUserModal, setOpenNewUserModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [actionUser, setActionUser] = useState<IUser>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleUsersRefresh = (isSuccess: boolean) => {
    if (isSuccess) {
      refetchUsers();
    }
  };

  const handleEditDrawer = (data: IUser) => {
    setActionUser(data);
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    setUsersData(data || []);
  }, [data]);

 
  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          { label: "User Management", link: "#", isActive: true },
          { label: "Users", link: APP_ROUTES.users, isActive: true },
        ]}
      />

      <SuccessModal />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Users</h1>
          <button
            type="button"
            className="inline-flex items-center w-max py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={()=>setOpenNewUserModal(!openNewUserModal)}
          >
            <PlusIcon className="h-8 w-8" /> Add New User
          </button>

          <NewUser open={openNewUserModal} setOpen={()=>setOpenNewUserModal(!openNewUserModal)}  OnCreateComplete={handleUsersRefresh} />
          <EditUserDrawer
            userData={actionUser as IUser}
            OnEditComplete={handleUsersRefresh}
            isOpen={showEditModal}
            setOpen={()=>setShowEditModal(!showEditModal)}
          />
        </div>
        {isFetchingUsers ? (
          <AppSkeleton type="table" />
        ) : (
          <UsersTable
            data={usersData}
            refetch={refetchUsers}
            openNewUserDrawer={()=>setOpenNewUserModal(!openNewUserModal)}
            handleEdit={(data: IUser) => handleEditDrawer(data)}
          />
        )}
      </div>
    </div>
  );
}
