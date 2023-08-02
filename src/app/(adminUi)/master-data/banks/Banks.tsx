"use client";

import React from "react";
import { DashboardIcon, PlusIcon } from "@/assets";
import { Breadcrumb } from "flowbite-react";
import SuccessModal from "@/components/Modals/SuccessModal";
import BanksTable from "./BanksTable";
import { useFetchBanksQuery } from "./bankApiSlice";
import { useState } from "react";
import Button from "../../../../components/Button";
import CreateBankDrawer from "./CreateBankDrawer";

export const Banks: React.FC = () => {
  const { data, refetch, isFetching } = useFetchBanksQuery();
  const [openCreateSuccessModal, setOpenCreateSuccessModal] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  const onCreateSuccess = () => {
    refetch();
    setOpenCreateSuccessModal(true);
  };

  return (
    <div className="px-8 pt-6 pb-10">
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={DashboardIcon}>
            <p>Master Data</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Banks</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SuccessModal />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Banks</h1>
          <Button
            isIcon={true}
            icon={<PlusIcon className="h-[1rem] w-[1rem] mr-2" />}
            appButtonType="green-button"
            height="small"
            onClick={()=>setCreateDrawerOpen(true)}
          >
            Add New Bank
          </Button>
        </div>
        <BanksTable dataLoading={isFetching} data={data} refetch={refetch} openCreateModal={() => setCreateDrawerOpen(true)}  />
      </div>
      <CreateBankDrawer
            open={createDrawerOpen}
            setOpen={setCreateDrawerOpen}
            onCreateSuccess={onCreateSuccess}
          />
    </div>
  );
};
