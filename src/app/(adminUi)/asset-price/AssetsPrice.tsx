"use client";

import React, { useState } from "react";
import { DashboardIcon, PlusIcon } from "@/assets";
import { Breadcrumb } from "flowbite-react";
import SuccessModal from "@/components/Modals/SuccessModal";
import AssetPriceTable from "./AssetsPriceTable";
import { useFetchAssetPriceQuery } from "./assetsApiSlice";
import Button from "../../../components/Button";
import CreateAssetPriceDrawer from "./CreateAssetDrawer";

export const AssetPrice: React.FC = () => {
  const { data, refetch, isFetching } = useFetchAssetPriceQuery();
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
            <p>Dashboard</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Asset Price</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SuccessModal />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Assets</h1>
          <Button
            isIcon={true}
            icon={<PlusIcon className="h-[1rem] w-[1rem] mr-2" />}
            appButtonType="green-button"
            height="small"
            onClick={() => setCreateDrawerOpen(true)}
          >
            Add New Asset Price
          </Button>
        </div>
        <AssetPriceTable
          dataLoading={isFetching}
          data={ (data as any)?.items}
          refetch={refetch}
          openCreateModal={() => setCreateDrawerOpen(true)}
        />
      </div>
      <CreateAssetPriceDrawer
        open={createDrawerOpen}
        setOpen={setCreateDrawerOpen}
        onCreateSuccess={onCreateSuccess}
      />
    </div>
  );
};
