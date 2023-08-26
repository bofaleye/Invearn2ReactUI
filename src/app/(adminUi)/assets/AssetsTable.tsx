import React, { useEffect, useMemo, useState } from "react";
import { ITableColumn } from "@/components/Table/model";
import { SearchIcon, Delete, Edit, Eye, PlusIcon } from "@/assets";
import { downloadCSV } from "@/utils";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { AssetData, IAsset, IBank } from "@/models/bank";

import EditBankDrawer from "./EditBankDrawer";
import { useDeleteAssetMutation } from "./assetsApiSlice";

import TableAction, { TableActionItem } from "@/components/Table/TableAction";
import AppSkeleton from "@components/Skeleton";
import PromptModal from "@components/Modals/PromptModal";
import { GpToast } from "@components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const tableExportFileName = "banks";
export const tableColumns: ITableColumn[] = [
  {
    dataIndex: "name",
    title: "Name",
    key: "name",
    sort: true,
    search: true,
    display: true,
  },
  {
    dataIndex: "code",
    title: "Code",
    key: "code",
    sort: true,
    search: true,
    display: true,
  },
  {
    dataIndex: "currentPrice",
    title: "Current Price",
    key: "currentPrice",
    sort: true,
    search: true,
    display: true,
  },
  {
    title: "Action",
    dataIndex: "option",
    key: "option",
    display: true,
  },
];

export interface AssetTableProps {
  data?: AssetData[] | undefined | null;
  openCreateModal: () => void;
  setEditDrawerState?: (state: boolean) => void;
  refetch: () => void;
  dataLoading: boolean;
}

export default function BanksTable({
  data,
  openCreateModal,
  refetch,
  dataLoading,
}: AssetTableProps) {
  const entityNameSingular = "Asset";

  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTableData, setFilteredTableData] = useState<
    AssetData[] | null
  >(data ?? []);
  const [selectedBank, setSelectedBank] = useState<AssetData | null>(null);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {push}= useRouter()

  React.useEffect(() => {
    if (!data?.length) return;
    setFilteredTableData(
      data.filter((row: any) => {
        let found = true;

        for (const element of tableColumns) {
          if (searchTerm.trim().length && element.search) {
            found = row[element.dataIndex]
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchTerm.toLowerCase());
          }
        }

        return found;
      })
    );
  }, [data, searchTerm]);

  const tableAction = (id: string) => {
    let tableIconArray: TableActionItem[] = [
      {
        text: "View Asset",
        icon: <Eye className="mr-3" />,
        disabled: false,
        visible: true,
        action: () => push(`assets/${id}`),
      },
      {
        text: "Edit Asset",
        icon: <Edit className="mr-3" />,
        disabled: false,
        visible: true,
        action: () => setEditDrawerOpen(true),
      },
      {
        text: "Delete",
        icon: <Delete className="mr-3" />,
        disabled: false,
        visible: true,
        action: () => setDeleteModalOpen(true),
      },
    ];
    return tableIconArray;
  };

  const dataSource = useMemo(() => {
    return filteredTableData?.map((row, index: number) => {
      return {
        uid: row.id,
        key: index,
        name: row?.name,
        code: row?.code,
        currentPrice: row?.currentPrice,
        option: (
          <TableAction
            index={row.id ?? ""}
            actionItems={tableAction(row.id)}
            onDropShow={() => setSelectedBank(row)}
          />
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTableData, selectedBank]);

  return (
    <>
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
                  placeholder="Search for banks"
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
                defaultChecked
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
          {dataLoading ? (
            <AppSkeleton type="table" />
          ) : (
            <Table
              emptyTableProps={{
                buttonProps: {
                  "data-drawer-placement": "right",
                  "aria-controls": "create-registrar-drawer",
                },
                buttonMethod: () => {
                  openCreateModal?.();
                },
                bodyText: `new ${entityNameSingular}`,
                buttonText: `Add ${entityNameSingular}`,
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
          <div className="flex justify-between items-center pt-3 sm:pt-6"></div>
        </div>
      </div>
      {editDrawerOpen && (
        <EditBankDrawer
          asset={selectedBank}
          open={editDrawerOpen}
          setOpen={setEditDrawerOpen}
          onEditSuccess={() => {
            refetch();
            setEditDrawerOpen(false);
          }}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          asset={selectedBank}
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}

interface DeleteModalProps {
  asset: AssetData | null;
  open: boolean;
  refetch?: () => void;
  setOpen: (open: boolean) => void;
}

function DeleteModal({ asset, setOpen, refetch, open }: DeleteModalProps) {
  const [deleteBank, { isLoading, isSuccess, isError, error }] =
    useDeleteAssetMutation();

  const handleDelete = async (id: string) => {
    await deleteBank(id);
  };
  useEffect(() => {
    if (isError) {
      GpToast({
        type: "error",
        message: "Something went wrong",
        placement: toast.POSITION.TOP_RIGHT,
      });
    }

    if (isSuccess) {
      GpToast({
        type: "success",
        message: "Asset deleted successfully",
        placement: toast.POSITION.TOP_RIGHT,
      });
      setOpen?.(false);
      refetch?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <PromptModal
      headingText="Delete Asset"
      bodyText="Are you sure you want to delete this Asset?"
      isOpen={open}
      OnConfirm={() => handleDelete(asset?.id ?? "")}
      actionLoading={isLoading}
      setOpen={() => setOpen(false)}
    />
  );
}
