
import { IBaseModel, IPaginatedData } from "./base";

export interface IBank extends IBaseModel {
  name: string;
  code: string;
  sortCode: string;
  description: string;
  isActive: boolean;
}

export interface AssetData extends IBaseModel {
  auditor?:              string;
  boardOfDirectors?:     string;
  code:                 string;
  companyAddress?:       string;
  companySecretary?:     string;
  currentPrice?:         number;
  dateListed?:           Date;
  dateofIncorporation?:  Date;
  description:          string;
  email?:                string;
  fax?:                  string;
  id:                   string;
  isActive:             boolean;
  logoUrl:              string;
  marketClassification?: string;
  name:                 string;
  natureofBusiness?:     string;
  prices?:               any[];
  registrar:            Registrar;
  sector?:               string;
  subSector?:            string;
  telephone?:            string;
  website?:              string;
}

export interface IAssetPrice extends IBaseModel {
  description?:          string;
  id:                   string;
  isActive:             boolean;
  price?:               number;
  timestamp?:              Date;
  asset: {
    id: string,
    name: string,
    code: string;
  },
}
export interface Registrar {
  name:        string;
  code:        string;
  platform:    string;
  id:          string;
  description: null;
}

export interface IAsset extends IBaseModel {
  items: AssetData
}

export interface IFetchBanksResponse extends IPaginatedData<IBank> {}
