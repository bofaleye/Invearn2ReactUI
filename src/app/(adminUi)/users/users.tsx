"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import NewUser from "./NewUser";
import { Select, Modal } from "flowbite-react";
import { Delete, Edit, Eye, PlusIcon } from "@/assets";
import Table from "@/components/Table";
import { ITableColumn, ITableData } from "@/components/Table/model";

import { BsThreeDots } from "react-icons/bs";
import SuccessModal from "@/components/Modals/SuccessModal";
import { RiErrorWarningLine } from "react-icons/ri";
import AppButton from "@/components/Button";
import { useFetchUsersQuery } from "./[id]/createUserApiSlice";
import BreadCrumbs from "@/components/AdminUi/BreadCrumbs";

import UsersTable from "./usersTable";
import { IUser } from "@/models/User";
import AppSkeleton from "@/components/Skeleton";
import { ReusableDrawerRef } from "@/components/ReusableDrawer";

export default function Users() {
  const { data, isFetching } = useFetchUsersQuery();
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [usersData, setUsersData] = useState<IUser[]>([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  let addNewUserRef = useRef<ReusableDrawerRef>(null);

  useEffect(() => {
    setUsersData(data || []);
  }, [data]);

  return (
    <div className="px-4 pt-6 pb-10 ">
      <BreadCrumbs
        links={[
          { label: "App Management", link: "#", isActive: true },
          { label: "Users", link: "/users", isActive: true },
        ]}
      />

      <SuccessModal />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Users</h1>
          {/* Use Ikem's Form Button */}
          <button
            type="button"
            className="inline-flex items-center w-max py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            data-drawer-target="create-user-drawer"
            data-drawer-show="create-user-drawer"
            data-drawer-placement="right"
            aria-controls="create-user-drawer"
          >
            <PlusIcon className="h-8 w-8" /> Add New User
          </button>

          <NewUser ref={addNewUserRef} />
        </div>
        {isFetching ? (
          <AppSkeleton type="table" />
        ) : (
          <UsersTable
            data={usersData}
            handleEdit={undefined}
            handleDelete={undefined}
          />
        )}
      </div>
    </div>
  );
}
