export interface IBaseModel {
    id: string;
    isActive: boolean;
    dateCreated: string,
    dateUpdated: string,
  }
  
  export interface IPaginatedData<T> {
    items: T[],
    pageNumber: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage?: boolean,
    hasNextPage?: boolean,
  }
  