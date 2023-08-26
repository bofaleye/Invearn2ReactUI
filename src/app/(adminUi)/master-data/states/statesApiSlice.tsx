import { IStates  } from "@/models/states";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStates: builder.query<IStates[], void>({
      query: () => "states",
      transformResponse: (response: Response<IStates[]>, meta, arg) => {
        return response.payload as IStates[];
      },
    }),
    fetchStatesById: builder.query<IStates, string>({
      query: (id: string) => `states/${id}`,
      transformResponse: (response: Response<IStates>, meta, arg) => {
        return response.payload as IStates;
      },
    }),
    createStatesType: builder.mutation<IStates, Partial<IStates>>({
      query: (body) => ({
        url: "states",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateStateType: builder.mutation<void, Partial<IStates>>({
      query: (data) => ({
        url: `states/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteStatesType: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(id: string) {
        return {
          url: `states/${id}`,
          method: "DELETE",
        };
      }
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchStatesQuery,
  useFetchStatesByIdQuery,
  useCreateStatesTypeMutation,
  useDeleteStatesTypeMutation,
  useUpdateStateTypeMutation,
} = extendedApi;