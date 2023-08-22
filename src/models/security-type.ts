import { IBaseModel, IPaginatedData } from "./base";

export interface ISecurityType extends IBaseModel {
  name: string;
  caption: string;
  fullText: string;
  description: string;
  isActive: boolean;
  tags: string,
}

export interface IFetchShareHolderTypesResponse extends IPaginatedData<ISecurityType> {}
