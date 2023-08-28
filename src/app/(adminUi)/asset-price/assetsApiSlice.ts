
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

import { paths } from "../../../../types/api/assetPrice";
import { CreateAssetPrice } from "./CreateAssetDrawer";
import { IAssetPrice } from "@/models/bank";

export type AssetPriceResponse = 
paths["/api/AssetPrices"]["get"]["responses"]["200"]["content"]["application/json"];

export type AssetPriceResponseParameterTypes = 
paths["/api/AssetPrices"]["get"]["parameters"];

export type CreateAssetPriceResponse = paths["/api/AssetPrices"]["post"]["responses"]["201"]["content"]["application/json"];


export type getAssetPriceByIdResponse = 
paths["/api/AssetPrices/{id}"]["get"]["responses"]["200"]["content"]["application/json"];


export type AssetPricePutResponse = 
paths["/api/AssetPrices/{id}"]["put"]["responses"]["200"]["content"]["application/json"];


const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAssetPrice: builder.query< AssetPriceResponse, void>({
      query: () => "AssetPrices",
      transformResponse: (response: Response<AssetPriceResponse>, meta, arg) => {
        return response.payload as AssetPriceResponse;
      },
    }),

    fetchAssetPriceById: builder.query<getAssetPriceByIdResponse, string>({
      query: (registrarId: string) => `AssetPrices/${registrarId}`,
      transformResponse: (response: Response<getAssetPriceByIdResponse>, meta, arg) => {
        return response.payload ;
      },
    }),
    createAssetPrice: builder.mutation<CreateAssetPrice, any>({
      query: (body) => ({
        url: "AssetPrices",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateAssetPrice: builder.mutation<AssetPricePutResponse, any>({
      query: (data:IAssetPrice) => ({
        url: `AssetPrices/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteAssetPrice: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(assetId: string) {
        return {
          url: `AssetPrices/${assetId}`,
          method: "DELETE",
        };
      }
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAssetPriceByIdQuery,
  useFetchAssetPriceQuery,
  useCreateAssetPriceMutation,
  useDeleteAssetPriceMutation,
  useUpdateAssetPriceMutation,
} = extendedApi;