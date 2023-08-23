import { IBaseModel, IPaginatedData } from "./base";

export interface IBank extends IBaseModel {
  name: string;
  code: string;
  sortCode: string;
  description: string;
  isActive: boolean;
}

export interface IAsset extends IBaseModel {
  sortCode: any;
  description: string;
  isActive: true;

  name: string;
  code: string;
  registrarId: string;
  currentPrice: number;
  prices: [
    {
      price: number;
    }
  ];
}

export interface IFetchBanksResponse extends IPaginatedData<IBank> {}
