
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

import { paths } from "../../../../types/api/clientCompanies";
import { CreateAsset } from "./CreateAssetDrawer";

export type ClientCompanyResponse = 
paths["/api/ClientCompanies"]["get"]["responses"]["200"]["content"]["application/json"];

export type ClientCompanyParameterTypes = 
paths["/api/ClientCompanies"]["get"]["parameters"];

export type RegistrarResponse = paths["/api/Registrars"]["get"]["responses"]["200"]["content"]["application/json"];
export type RegistrarParameter = 
paths["/api/Registrars"]["get"]["parameters"];

export type ClientCompanyByIdResponse = 
paths["/api/ClientCompanies/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type ClientCompanyByIdParameterTypes = 
paths["/api/ClientCompanies/{id}"]["get"]["parameters"];

export type ClientCompanyPutResponse = 
paths["/api/ClientCompanies/{id}"]["put"]["responses"]["200"]["content"]["application/json"];
export type ClientCompanyPutParameterTypes = 
paths["/api/ClientCompanies/{id}"]["put"]["parameters"];

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAssets: builder.query< ClientCompanyResponse, void>({
      query: () => "ClientCompanies",
      transformResponse: (response: Response<ClientCompanyResponse>, meta, arg) => {
        return response.payload as ClientCompanyResponse;
      },
    }),

    fetchRegistrars: builder.query<RegistrarResponse, void>({
      query: () => "Registrars",
      transformResponse: (response: Response<RegistrarResponse>, meta, arg) => {
        return response.payload as RegistrarResponse ;
      },
    }),
    fetchAssetById: builder.query<ClientCompanyByIdResponse, string>({
      query: (registrarId: string) => `ClientCompanies/${registrarId}`,
      transformResponse: (response: Response<ClientCompanyByIdResponse>, meta, arg) => {
        return response.payload ;
      },
    }),
    createAsset: builder.mutation<CreateAsset, any>({
      query: (body) => ({
        url: "ClientCompanies",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateAsset: builder.mutation<ClientCompanyPutResponse, any>({
      query: (data) => ({
        url: `ClientCompanies/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteAsset: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(bankId: string) {
        return {
          url: `ClientCompanies/${bankId}`,
          method: "DELETE",
        };
      }
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAssetByIdQuery,
  useFetchAssetsQuery,
  useFetchRegistrarsQuery,
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useUpdateAssetMutation,
} = extendedApi;