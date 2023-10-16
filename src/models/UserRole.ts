import { IPermission } from './Permission';

export interface UserRole {
  id: string;
  description: string;
  code: string;
  name: string;
  normalizedName: string;
  isActive: boolean;
  isSystemRole: boolean;
  permissions: IPermission[];
}

export interface UserRolesRequestModel {
  searchText: string;
  // query: string;
  pageNumber: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: string;
}

export interface UserRolesResponseModel {
  items: UserRole[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface IRolesTableProps {
  data: any;
  refetch: any;
  isFetching: boolean;
}
export interface UserRoles {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: UserRole[];
  pageNumber: number;
  totalCount: number;
  totalPages: number;
}
