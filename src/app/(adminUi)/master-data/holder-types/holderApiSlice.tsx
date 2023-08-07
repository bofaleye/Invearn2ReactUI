import { IShareHolderType, IFetchShareHolderTypesResponse } from "@/models/shareholder-type";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const basePath = "shareholdertypes";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchShareHolderTypes: builder.query<IShareHolderType[], void>({
      query: () => basePath,
      transformResponse: (response: Response<IShareHolderType[]>, meta, arg) => {
        return response.payload as IShareHolderType[];
      },
    }),
    fetchShareHolderTypesById: builder.query<IShareHolderType, string>({
      query: (shareHolderTypeId: string) => `${basePath}/${shareHolderTypeId}`,
      transformResponse: (response: Response<IShareHolderType>, meta, arg) => {
        return response.payload as IShareHolderType;
      },
    }),
    createShareHolderType: builder.mutation<IShareHolderType, Partial<IShareHolderType>>({
      query: (body) => ({
        url: basePath,
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateShareHolderType: builder.mutation<void, Partial<IShareHolderType>>({
      query: (data) => ({
        url: `${basePath}/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteShareHolderType: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(shareHolderTypeId: string) {
        return {
          url: `${basePath}/${shareHolderTypeId}`,
          method: "DELETE",
        };
      }
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchShareHolderTypesByIdQuery,
  useFetchShareHolderTypesQuery,
  useCreateShareHolderTypeMutation,
  useDeleteShareHolderTypeMutation,
  useUpdateShareHolderTypeMutation,
} = extendedApi;