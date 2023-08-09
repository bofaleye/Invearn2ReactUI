import { IBaseModel, IPaginatedData } from "./base";
import { IDocumentFormat } from "./document-format";

export class IDocumentType implements IBaseModel {
  id!: string;
  isActive!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
  description!: string;
  name!: string;
  directory!: string;
  uploadSize!: number;
  documentFormats!: Array<IDocumentFormat>;
  documentFormatDisplay!: string;

  constructor(documentFormats: Array<IDocumentFormat>) {
    let s = ""
    documentFormats.map((item)=> s += `${item.contentType} `);
    this.documentFormatDisplay = s;
  }
}

export interface SubmitIDocumentType extends IBaseModel{
  description: string;
  name: string;
  directory: string;
  uploadSize: number;
  documentFormats: Array<string>;
}

export interface IFetchDocumentTypeResponse
  extends IPaginatedData<IDocumentType> {}
