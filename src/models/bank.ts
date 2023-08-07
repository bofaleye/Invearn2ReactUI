import { IBaseModel, IPaginatedData } from "./base";

export interface IBank extends IBaseModel {
    name: string;
    code: string,
    sortCode: string,
    description: string;
    isActive: boolean;
  }
  
  export interface IFetchBanksResponse extends IPaginatedData<IBank> {}