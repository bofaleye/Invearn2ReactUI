"use client";
import { useEffect, useMemo, useState } from "react";
import { DashboardIcon, PlusIcon, SearchIcon, Edit, Delete } from "@/assets";
import Button from "@/components/Button";
import AppSkeleton from "@/components/Skeleton";
import Table from "@/components/Table";
import { Breadcrumb } from "flowbite-react";
import {
  useDeleteDocumentTypeMutation,
  useFetchDocumentTypeQuery,
} from "./api-slice";
import { ITableColumn } from "@/components/Table/model";
import TableAction, { TableActionItem } from "@/components/Table/TableAction";
import { IDocumentType } from "@/models/document-type";
import CreateDocumentTypeDrawer from "./create-document-type";
import PromptModal from "@/components/Modals/PromptModal";
import { GpToast } from "@/components/Toast";
import { toast } from "react-toastify";
import EditDocumentTypeDrawer from "./edit-document-type";

const entityNameSingular = "Document Type";
export const tableColumns: ITableColumn[] = [
  {
    dataIndex: "name",
    title: "Name",
    key: "name",
    sort: false,
    search: true,
  },
  {
    dataIndex: "description",
    title: "Description",
    key: "description",
    sort: false,
    search: false,
  },
  {
    dataIndex: "uploadSize",
    title: "Upload Size",
    key: "uploadSize",
    sort: false,
    search: false,
  },
  {
    dataIndex: "directory",
    title: "Directory",
    key: "directory",
    sort: false,
    search: false,
  },
  {
    dataIndex: "documentFormatDisplay",
    title: "Format",
    key: "documentFormatDisplay",
    sort: false,
    search: true,
  },
  {
    title: "Action",
    dataIndex: "option",
    key: "option",
  },
];
const DocumentTypes = () => {
  const { data, refetch, isFetching } = useFetchDocumentTypeQuery();
  const [filteredTableData, setFilteredTableData] = useState(data ?? []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<IDocumentType>();
  const [page, setPage] = useState<number>(1);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [
    deleteDocType,
    { isLoading: deleteIsLoading, isSuccess: deletedSuccess },
  ] = useDeleteDocumentTypeMutation();

  useEffect(() => {
    if (!data?.length) return;
    setFilteredTableData(
      data.filter((row: any) => {
        let found = true;

        for (let i = 0; i < tableColumns.length; i++) {
          if (searchTerm.trim().length && tableColumns[i].search) {
            found = row[tableColumns[i].dataIndex]
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchTerm.toLowerCase());
          }
        }
        return found;
      })
    );
  }, [data, searchTerm]);

  useEffect(() => {
    if (deletedSuccess) {
      GpToast({
        type: "success",
        message: "Document Format deleted successfully",
        placement: toast.POSITION.TOP_RIGHT,
      });
      setShowDeleteModal(false);
      refetch();
    }
  }, [deletedSuccess, refetch]);

  const tableAction: TableActionItem[] = [
    {
      text: "Edit Document type",
      icon: <Edit className="mr-3" />,
      disabled: false,
      visible: true,
      action: () => setShowEditModal(true),
    },
    {
      text: "Delete",
      icon: <Delete className="mr-3" />,
      disabled: false,
      visible: true,
      action: () => setShowDeleteModal(true),
    },
  ];

  const dataSource = useMemo(() => {
    return filteredTableData?.map((row: IDocumentType, index: number) => {
      return {
        uid: row.id,
        key: index,
        name: row.name,
        description: row.description,
        directory: row.directory,
        uploadSize: row.uploadSize,
        documentFormatDisplay: new IDocumentType(row.documentFormats)
          .documentFormatDisplay,
        option: (
          <TableAction
            index={row.id}
            actionItems={tableAction}
            onDropShow={() => setSelectedItem(row)}
          />
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTableData, selectedItem]);

  return (
    <div className="px-8 pt-6 pb-10">
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={DashboardIcon}>
            <p>Master Data</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Document Types</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            All Document Types
          </h1>
          <Button
            onClick={() => setCreateDrawerOpen(true)}
            isIcon={true}
            icon={<PlusIcon className="h-[1rem] w-[1rem] mr-2" />}
            appButtonType="green-button"
            height="small"
          >
            Add Document Type
          </Button>
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
                    placeholder="Search for document types"
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
                    "aria-controls": "create-registrar-drawer",
                  },
                  bodyText: `new ${entityNameSingular}`,
                  buttonText: `Add ${entityNameSingular}`,
                  buttonMethod: () => {
                    setCreateDrawerOpen(true);
                  },
                }}
                columns={tableColumns}
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
        <CreateDocumentTypeDrawer
          showModal={createDrawerOpen}
          setOpen={setCreateDrawerOpen}
          onCreateSuccess={() => {
            refetch();
          }}
        />
        <PromptModal
          headingText=""
          bodyText="Are you sure you want to delete this Document Type?"
          // bodyText=""
          isOpen={showDeleteModal}
          onClose={() => {}}
          OnConfirm={() => deleteDocType(selectedItem?.id || "")}
          actionLoading={deleteIsLoading}
          setOpen={() => setShowDeleteModal(false)}
        />
        {showEditModal && (
          <EditDocumentTypeDrawer
            item={selectedItem}
            onEditComplete={() => {
              refetch();
            }}
            showModal={showEditModal}
            setShowModal={setShowEditModal}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentTypes;
