"use client";

import React, { useEffect, useState } from "react";
import { ITableColumn, ITableData, TableProps, TableSortState } from "./model";
import Pagination from "./Pagination";
import { TableSort } from "@/assets";
import EmptyTable from './EmptyTable';
import AppSkeleton from "../Skeleton";

const Table: React.FC<TableProps> = ({
  onMasterCheck,
  onItemCheck,
  columns,
  dataSource,
  pageSize = 10,
  showPagination = false,
  showPageSize = false,
  totalPages,
  setCurrentPage,
  emptyTableProps,
  useEmptyTable = false,
  useSkeleton = false,
  dataLoading = false
}) => {
  const [_columns, _setColumns] = useState<ITableColumn[]>([]);
  const [_dataSource, _setDataSource] = useState<ITableData[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [canExpand, setCanExpand] = useState<boolean>(false);
  
  useEffect(() => {
    const temp = columns.filter((row: any) => {
      let found = true;
      if (row.display === false) {
        found = false;
      }
      return found;
    });
    const _columns = temp.map((column) => {
      return {
        ...column,
        sortState: TableSortState.ASC,
      };
    });
    _setColumns(_columns);
    _setDataSource(
      dataSource.slice(
        (activeIndex - 1) * pageSize,
        activeIndex * pageSize < dataSource.length
          ? activeIndex * pageSize
          : (activeIndex - 1) * pageSize +
          (dataSource.length - (activeIndex - 1) * pageSize)
      )
    );
    totalPages
      ? setPages(totalPages)
      : setPages(Math.ceil(dataSource.length / pageSize));
    setCurrentPage && setCurrentPage(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, columns, dataSource, pageSize]);

  const handleSort = (column: ITableColumn): void => {
    if (column.sortState === TableSortState.DEC) {
      _setDataSource(
        _dataSource.sort((a, b) =>
          a[column.dataIndex].toString() > b[column.dataIndex].toString()
            ? 1
            : -1
        )
      );
      const _cs = _columns.map((c) => {
        return {
          ...c,
          sortState:
            c.dataIndex === column.dataIndex ? TableSortState.ASC : c.sortState,
        };
      });
      _setColumns(_cs);
    } else {
      _setDataSource(
        _dataSource.sort((a, b) =>
          a[column.dataIndex].toString() < b[column.dataIndex].toString()
            ? 1
            : -1
        )
      );
      const _cs = _columns.map((c) => {
        return {
          ...c,
          sortState:
            c.dataIndex === column.dataIndex ? TableSortState.DEC : c.sortState,
        };
      });
      _setColumns(_cs);
    }
  };

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {onMasterCheck && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}
            {_columns && _columns.length > 0 ? (
              _columns.map((column) => (
                <th key={column.key} className={"px-6 py-3"}>
                  <div
                    onClick={() => column.sort && handleSort(column)}
                    className={"flex items-center justify-between"}
                  >
                    {column.title}
                    {column.title && column.sort && (
                      <span className={""}>
                        <TableSort className="w-3 h-3 ml-1" />
                      </span>
                    )}
                  </div>
                </th>
              ))
            ) : (
              <></>
            )}
          </tr>
        </thead>
          {(dataLoading && useSkeleton)? <AppSkeleton colspan={_columns?.length + 1} type="in-table"/>
           :
           (_dataSource?.length === 0 && useEmptyTable &&(<EmptyTable 
            colspan={_columns?.length + 1}
            type="in-table"
            bodyText={emptyTableProps?.bodyText || ''}
            buttonMethod={emptyTableProps?.buttonMethod? emptyTableProps.buttonMethod : ()=>{}}
            buttonText={emptyTableProps?.buttonText || ''}
            buttonProps={emptyTableProps?.buttonProps || {}}
          />))}
            <tbody>
           {_dataSource?.length > 0 && _dataSource?.map((data) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={data.key}
              >
                {onItemCheck && (
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={"checkbox-table-search-1"}
                        type="checkbox"
                        onChange={(e) => onItemCheck(e, data)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                )}
                {_columns && _columns.length > 0 ? (
                  _columns.map((column, index) => (
                    <td key={index} className={"px-6 py-4"}>
                      {data[column.dataIndex]}
                    </td>
                  ))
                ) : (
                  <></>
                )}
              </tr>
            ))
          }
           </tbody>
      </table>
      {showPagination && (
        <Pagination
          pages={pages}
          pageSize={pageSize}
          rowsLength={dataSource.length}
          _setActiveIndex={(index: number) => setActiveIndex(index)}
          showPageSize={showPageSize}
          expand={canExpand}
          handleExpand={(bool: boolean) => setCanExpand(bool)}
        />
      )}
    </div>
  );
};
export default Table;
