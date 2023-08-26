import { IBaseModel, IPaginatedData } from "./base";

export interface IStates extends IBaseModel {
  name: string;
}
export interface IFetchStatesTypeResponse extends IPaginatedData<IStates> {}
