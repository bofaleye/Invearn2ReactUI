"use client";

import { Card, Table } from "flowbite-react";
import React from "react";
import { useFetchOrganisationTypesQuery } from "./organisationTypeApiSlice";
import BreadCrumbs, {
  BreadCrumbsLinkProps,
} from "@/components/AdminUi/BreadCrumbs";
import { PlusIcon } from "@/assets";

const Index = () => {
  const { data, isError, error, isFetching, isSuccess } =
    useFetchOrganisationTypesQuery();

  if (error !== undefined) {
    console.log(error);
  }

  if (!data && isSuccess)
    return (
      <Card>
        <h1>Data not found!</h1>
      </Card>
    );

  if (isError) {
    return (
      <div className="px-8 pt-6 pb-10">
        <Card>
          <h1>Error found</h1>
          <h4></h4>
        </Card>
      </div>
    );
  }

  const OrganisationTypesTable = () => {
    return (
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>*</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data?.map((item, idx, arr) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="edit"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  const links: BreadCrumbsLinkProps[] = [
    { label: "Application Management", link: "#" },
    { label: "Master Data", link: "#" },
    { label: "Organisation type", isActive: false },
  ];

  return (
    <div className="px-8 pt-6 pb-10">
      <BreadCrumbs links={links} />
      <Card>
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Organisation Types
          </h1>
          <button
            className="inline-flex items-center w-max py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            data-drawer-target="create-registrar-drawer"
            data-drawer-show="create-registrar-drawer"
            data-drawer-placement="right"
            aria-controls="create-registrar-drawer"
            // onClick={() => {}}
            // loading={isLoading}
          >
            <PlusIcon className="h-8 w-8" />
            Add Organisation Type
          </button>
        </div>
        <div>
          <OrganisationTypesTable />
        </div>
      </Card>
    </div>
  );
};

export default Index;
