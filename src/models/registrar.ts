export interface RegistrarResponseModel {
    items: IRegistrarsTableData[],
    pageNumber: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage?: boolean,
    hasNextPage?: boolean
}

export interface IRegistrarsTableData {
  id: string;
  name: string;
  email: string;
  stateId: string;
  country: string;
  currency: string;
  isActive: boolean;

  applicationRoleId?: string;
  description?: string;
  createdByUserId?: string,
  dateCreated?: string,
  updatedByUserId?: string;
  dateUpdated?: string;
  deletedByUserId?: string;
  isDeleted?: boolean,
  dateDeleted?: string;
  rowVersion?: string;
  fullText?: string;
  tags?: string;
  caption?: string;
  address?: string;
  phone?: string;
  tenantCode?: string

  [key: string]: any;
}

export interface IRegistrarsTableProps {
  data: any;
  handleEdit: any;
  handleDelete: any
}

export interface CountryStateModel{
  id: string,
  description: string,
  isActive: boolean,
  dateCreated: string,
  dateUpdated: string,
  name: string
}