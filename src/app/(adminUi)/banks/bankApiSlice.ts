import { IBank, IFetchBanksResponse } from "@/models/bank";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBanks: builder.query<IBank[], void>({
      query: () => "bank",
      transformResponse: (response: Response<IBank[]>, meta, arg) => {
        return response.payload as IBank[];
      },
    }),
    fetchBanksById: builder.query<IBank, string>({
      query: (registrarId: string) => `bank/${registrarId}`,
      transformResponse: (response: Response<IBank>, meta, arg) => {
        return response.payload as IBank;
      },
    }),
    createBank: builder.mutation<IBank, Partial<IBank>>({
      query: (body) => ({
        url: "bank",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateBank: builder.mutation<void, Partial<IBank>>({
      query: (data) => ({
        url: `bank/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteBank: builder.mutation<
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
  useFetchBanksByIdQuery,
  useFetchBanksQuery,
  useCreateBankMutation,
  useDeleteBankMutation,
  useUpdateBankMutation,
} = extendedApi;