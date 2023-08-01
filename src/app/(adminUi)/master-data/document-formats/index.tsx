"use client";

import React, { useMemo } from "react";
import { DashboardIcon, PlusIcon, Edit, Delete, SearchIcon } from "@/assets";
import { Breadcrumb, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import TableAction, { TableActionItem } from "@/components/Table/TableAction";
import {
  useDeleteDocumentFormatMutation,
  useFetchDocumentFormatsQuery,
} from "./documentFormatApiSlice";
import { RiErrorWarningLine } from "react-icons/ri";
import { IDocumentFormat } from "@/models/document-format";
import Button from "@/components/Button";
// import CreateDrawer from "./create-drawer";
// import EditDrawer from "./edit-drawer";
import PromptModal from "@/components/Modals/PromptModal";
import { ITableColumn } from "@/components/Table/model";
import Table from "../../../../components/Table";
import { CreateDocumentFormatDrawer } from "./createDocumentFormat";
import AppSkeleton from "../../../../components/Skeleton";
import { GpToast } from "../../../../components/Toast";
import { toast } from "react-toastify";
import EditDocumentDrawer from "./editDocumentFormat";

const tableExportFileName = "documets";
export const tableColumns: ITableColumn[] = [
  {
    dataIndex: "name",
    title: "Name",
    key: "name",
    sort: true,
    search: true,
  },
  {
    dataIndex: "description",
    title: "Description",
    key: "description",
    sort: true,
    search: true,
  },
  {
    dataIndex: "contentType",
    title: "Content Type",
    key: "contentType",
    sort: true,
    search: true,
  },
  {
    title: "Action",
    dataIndex: "option",
    key: "option",
  },
];

export const DocumentFormats: React.FC = () => {
  const { data, refetch, isFetching } = useFetchDocumentFormatsQuery();
  const [itemList, setItemList] = useState<IDocumentFormat[]>([]);
  const [activeItem, setActiveItem] = useState<IDocumentFormat>();
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [deleteBank, deleteResponse] = useDeleteDocumentFormatMutation();

  const { isLoading: deleteIsLoading, isSuccess: deletedSuccess } =
    deleteResponse;

  const entityNameSingular = "Document Format";
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setColumns(tableColumns);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTableData, setFilteredTableData] = useState(data);

  useEffect(() => {
    setFilteredTableData(
      data?.filter((row: any) => {
        let found = true;
        for (let i = 0; i < columns.length; i++) {
          if (searchTerm.trim().length && columns[i].search) {
            found = row[columns[i].dataIndex]
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchTerm.toLowerCase());
          }
        }
        return found;
      })
    );
  }, [columns, data, searchTerm]);

  const tableAction: TableActionItem[] = [
    {
      text: "Edit Department",
      icon: <Edit className="mr-3" />,
      disabled: false,
      visible: true,
      action: ()=>setShowEditModal(true),
    },
    {
      text: "Delete",
      icon: <Delete className="mr-3" />,
      disabled: false,
      visible: true,
      action: ()=>setShowDeleteModal(true),
    },
  ];

  const dataSource = useMemo(() => {
    return filteredTableData?.map((row: any, index: number) => {
      return {
        uid: row.id,
        key: index,
        name: row.name,
        description: row.description,
        contentType: row.contentType,
        option: (
          <TableAction
            index={row.id}
            actionItems={tableAction}
            onDropShow={() => setActiveItem(row)}
          />
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTableData, activeItem]);

  const handleEditDrawer = (data: IDocumentFormat) => {
    setActiveItem(data);
    // editDrawerRef.current?.showDrawer();
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  useEffect(() => {
    if (data?.length) setItemList(data);
  }, [data]);

  useEffect(() => {
    if (deletedSuccess) {
      GpToast({ type : 'success', message: 'Document Format deleted successfully', placement: toast.POSITION.TOP_RIGHT})
      setShowDeleteModal(false);
      refetch();
    }
  }, [deletedSuccess, refetch]);

  const handleDelete = () => {
    deleteBank(activeItem?.id || "");
  };

  return (
    <div className="px-8 pt-6 pb-10">
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={DashboardIcon}>
            <p>Master Data</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Document Formats</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <SuccessModal /> */}
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            All Document Formats
          </h1>
          <Button
            aria-controls="create-registrar-drawer"
            isIcon={true}
            icon={<PlusIcon className="h-4 w-4" />}
            appButtonType="green-button"
            onClick={() => setShowCreateModal(true)}
            height="small"
          >
            Add Document Format
          </Button>
          <PromptModal
            bodyText="Are you sure you want to delete this Document Format?"
            // bodyText=""
            isOpen={showDeleteModal}
            onClose={()=>{}}
            OnConfirm={handleDelete}
            actionLoading={deleteIsLoading}
            setOpen={()=>setShowDeleteModal(false)}
          />
        </div>
        
        <div className="px-3">
          <div className="pb-4 pr-8 pl-4 flex w-full items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="w-3/4">
              <div className="hidden pb-6 border-b space-x-6 md:flex ">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for document formats"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4 pr-8 pl-4 flex w-full items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <h2 className="text-gray-900 font-medium text-base dark:text-gray-300">
                  Show by:
                </h2>
              </div>
              <div className="flex items-center pl-4">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value="all"
                  name="show-by"
                  checked
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  All
                </label>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            {isFetching ? (
              <AppSkeleton type="table" />
            ) : (
              <Table
                emptyTableProps={{
                  buttonProps: {
                    "data-drawer-placement": "right",
                    "aria-controls": "create-document-format-drawer",
                  },
                  buttonMethod: () => {
                    setShowCreateModal(true);
                  },
                  bodyText: `new ${entityNameSingular}`,
                  buttonText: `Add ${entityNameSingular}`,
                }}
                columns={columns}
                dataSource={dataSource ?? []}
                showPagination={true}
                showPageSize={true}
                setCurrentPage={(value: number) => setPage(value)}
                totalItems={filteredTableData?.length}
                pageSize={10}
                useEmptyTable={true}
              />
            )}
            <div className="flex justify-between items-center pt-3 sm:pt-6">
              {/* <div className="p-3">
            <Button
              type="button"
              appButtonType="green-button"
              onClick={() => downloadCSV(tableColumns, filteredTableData, tableExportFileName)}
              className="inline-flex items-center text-white rounded-lg focus:ring-4 "
            >Download CSV
            </Button>
          </div> */}
            </div>
          </div>
        </div>
      </div>
      <CreateDocumentFormatDrawer
        showModal={showCreateModal}
        setModalOpen={setShowCreateModal}
        onCreateComplete={() => {
          refetch();
        }}
        />
      {showEditModal && <EditDocumentDrawer
         item={activeItem}
         onEditComplete={()=>{
           refetch()
         }}
         showModal={showEditModal}
         setShowModal={setShowEditModal}
      />}
    </div>
  );
};
