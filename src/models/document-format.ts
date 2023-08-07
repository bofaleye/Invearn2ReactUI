import { IBaseModel, IPaginatedData } from "./base";

export interface IDocumentFormat extends IBaseModel {
  name: string;
  description: string;
  isActive: boolean;
  contentType: string,
}

export interface IFetchDocumentFormatsResponse extends IPaginatedData<IDocumentFormat> {}
