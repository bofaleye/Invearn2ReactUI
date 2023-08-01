import { DepartmentModel } from "@/models/department";
import { EmptyTableProps } from "./EmptyTable";

export enum TableSortState {
  ASC = "ASC",
  DEC = "DEC",
}

export interface ITableColumn {
  title: string;
  dataIndex: string;
  key: string;
  sort?: boolean;
  sortState?: TableSortState;
  search?: boolean;
  display?: boolean;
}

export class ITableData<T = any> {
  [key: string]: T | number | string | React.ReactNode;

  constructor(data: { [K in keyof ITableData<T>]?: ITableData<T>[K] } & Partial<ITableData<T>>) {
    Object.assign(this, data);
  }
  
}

export interface TableProps {
	onMasterCheck?: (value: any) => void;
	onItemCheck?: (value: any, data: any) => void;
	columns: ITableColumn[];
	dataSource: ITableData[];
	pageSize?: number;
	showPagination?: boolean;
	showPageSize?: boolean;
	setCurrentPage?: (value: number) => void;
	totalPages?: number;
	[key: string]: any;
  useEmptyTable?: boolean;
  dataLoading?: boolean;
  emptyTableProps?: EmptyTableProps;
  useSkeleton?: boolean; // not yet ready, requires a some styling
}
