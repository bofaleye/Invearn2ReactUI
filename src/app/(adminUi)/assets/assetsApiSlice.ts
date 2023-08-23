import { IAsset, IBank, IFetchBanksResponse } from "@/models/bank";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

import { paths } from "../../../../types/api/clientCompanies";

export type ClientCompanyResponse = 
paths["/api/ClientCompanies"]["get"]["responses"]["200"]["content"]["application/json"];

export type ClientCompanyParameterTypes = 
paths["/api/ClientCompanies"]["get"]["parameters"];

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAssets: builder.query<IAsset[], void>({
      query: () => "ClientCompanies",
      transformResponse: (response: Response<ClientCompanyResponse>, meta, arg) => {
        return response.payload as IAsset[];
      },
    }),
    fetchAssetById: builder.query<IBank, string>({
      query: (registrarId: string) => `bank/${registrarId}`,
      transformResponse: (response: Response<IBank>, meta, arg) => {
        return response.payload as IBank;
      },
    }),
    createAsset: builder.mutation<IBank, Partial<IBank>>({
      query: (body) => ({
        url: "bank",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateAsset: builder.mutation<void, Partial<IBank>>({
      query: (data) => ({
        url: `bank/${data.id}`,
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
          url: `bank/${bankId}`,
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
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useUpdateAssetMutation,
} = extendedApi;