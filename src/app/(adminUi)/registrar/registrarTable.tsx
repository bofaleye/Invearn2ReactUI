
import { useState, useEffect } from "react";
import { ITableColumn, ITableData } from "@/components/Table/model";
import { registrarsTableColumns, registrarsTableData } from "./data";
import { IRegistrarsTableProps } from "../../../models/registrar"
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { Select } from "flowbite-react";
import { Delete, Edit, Eye } from "@/assets";
import Table from "@/components/Table";
import Link from "next/link";
import { downloadCSV, getInitials } from "@/utils";

const RegistrarsTable: React.FC<IRegistrarsTableProps> = ({
  data,
  handleEdit,
  handleDelete
}) => {
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setColumns(registrarsTableColumns);
  }, []);

  const [filteredTableData, setFilteredTableData] =
    useState(data);

  useEffect(() => {
    setFilteredTableData(data);
  }, [data]);

  useEffect(() => {
    setVisibilities(() => filteredTableData.map((x: any) => false));
  },[filteredTableData])

  const [visibilities, setVisibilities] = useState(() =>
    filteredTableData.map((x: any) => false)
  );
  const handleClick = (index: number) => {
    const newVisibilities = [...visibilities];
    newVisibilities.map((thisVisibility, ind) => {
      index !== ind
        ? (newVisibilities[ind] = false)
        : (newVisibilities[index] = !newVisibilities[index]);
      return 0;
    });
    setVisibilities(newVisibilities);
  };

  const dataSource: ITableData[] =
    filteredTableData && filteredTableData.length > 0
      ? filteredTableData.map((row: any, index: number) => {
          return {
            uid: row.id,
            key: index,
            name: (
              <div className="flex items-center text-gray-900 text-base font-medium">
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{getInitials(row.name)}</span>
                </div>
                <div className="ml-2">{`${row.name}`}</div>
              </div>
            ),
            email: row.email,
            currency: row.currency,
            state: row.stateId,
            country: row.country ? row.country : 'Nigeria',
            status: (
              <div className="flex items-center text-gray-900 font-medium">
                <div
                  className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    row.isActive
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>{" "}
                {row.isActive ? 'Active' : 'Inactive'}
              </div>
            ),
            option: (
              <div className="">
                <div className="relative">
                  <div className="flex items-center cursor-pointer">
                    <BsThreeDots onClick={() => handleClick(index)} size={24} />
                  </div>
                  {visibilities[index] ? (
                    <div className="absolute border border-muted rounded-md z-10 right-0 top-full px-3 w-max bg-white">
                      <Link
                         href={`/registrar/${row.id}`}
                        className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-gray-700 items-center gap-2"
                      >
                        <Eye />
                        View Profile
                      </Link>
                      <div
                        onClick={() => handleEdit(row)}
                        className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-gray-700 items-center gap-2"
                      >
                        <Edit />
                        Edit Profile
                      </div>
                      <div
                        onClick={() => handleDelete(row)}
                        className="flex cursor-pointer text-left py-3 border-b border-neutral-50 text-small text-red-600 items-center gap-2"
                      >
                        <Delete />
                        Delete
                      </div>
                    </div>
                  ) : (
                    ""
                  )}{" "}
                </div>{" "}
              </div>
            ),
          };
        })
      : [];

  return (
    <>
      <div className="pb-4 pr-8 pl-4 flex w-full items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        <div className="w-3/4">
          <div className="hidden pb-6 border-b space-x-6 md:flex ">
            <Select className="w-1/4" id="countries" required={true}>
              <option>User</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <Select className="w-1/4" id="countries" required={true}>
              <option>Status</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <Select className="w-1/4" id="countries" required={true}>
              <option>Account type</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <Select className="w-1/4" id="countries" required={true}>
              <option>Rating</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
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
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              All
            </label>
          </div>
          <div className="flex items-center pl-4">
            <input
              id="bordered-radio-2"
              type="radio"
              value="status"
              name="show-by"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Status
            </label>
          </div>
          <div className="flex items-center pl-4">
            <input
              id="bordered-radio-3"
              type="radio"
              value="name"
              name="show-by"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-3"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {/* <!-- Table --> */}
        <Table
          columns={columns}
          dataSource={dataSource}
          showPagination={true}
          showPageSize={true}
          setCurrentPage={(value: number) => setPage(value)}
          totalItems={filteredTableData.length}
          pageSize={10}
          useEmptyTable={true}
        />

        {/* <!-- footer --> */}
        <div className="flex justify-between items-center pt-3 sm:pt-6">
          <div className="p-3">
            <button
              type="button"
              onClick={() => downloadCSV(registrarsTableColumns, filteredTableData, 'temp')}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </>
  )
};

export default RegistrarsTable;