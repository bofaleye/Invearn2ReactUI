'use client';
import { CountryStateModel, IRegistrarsTableData, RegistrarResponseModel } from "@/models/registrar";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRegistrars: builder.query<RegistrarResponseModel, void>({
      query: () => "registrar",
      transformResponse: (response: Response<RegistrarResponseModel>, meta, arg) => {
        return response.payload as RegistrarResponseModel;
      },
    }),
    fetchRegistrarById: builder.query<IRegistrarsTableData, string>({
      query: (registrarId: string) => `registrar/${registrarId}`,
      transformResponse: (response: Response<IRegistrarsTableData>, meta, arg) => {
        return response.payload as IRegistrarsTableData;
      },
    }),
    createRegistrar: builder.mutation<IRegistrarsTableData, Partial<IRegistrarsTableData>>({
      query: (body) => ({
        url: `registrar`,
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateRegistrar: builder.mutation<void, Partial<IRegistrarsTableData>>({
      query: (data) => ({
        url: `registrar/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteRegistrar: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(registrarId: string) {
        return {
          url: `registrar/${registrarId}`,
          method: "DELETE",
        };
      }
    }),
    fetchCountryStates: builder.query<CountryStateModel[], void>({
      query: () => "states",
      transformResponse: (response: Response<CountryStateModel[]>, meta, arg) => {
          return response.payload as CountryStateModel[];
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchRegistrarsQuery,
  useFetchRegistrarByIdQuery,
  useCreateRegistrarMutation,
  useDeleteRegistrarMutation,
  useUpdateRegistrarMutation,
  useFetchCountryStatesQuery
} = extendedApi;