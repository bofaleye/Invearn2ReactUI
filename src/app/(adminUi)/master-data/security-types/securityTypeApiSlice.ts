import { ISecurityType,  } from "@/models/security-type";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSecurityType: builder.query<ISecurityType[], void>({
      query: () => "SecurityTypes",
      transformResponse: (response: Response<ISecurityType[]>, meta, arg) => {
        return response.payload as ISecurityType[];
      },
    }),
    fetchSecurityTypeById: builder.query<ISecurityType, string>({
      query: (id: string) => `SecurityTypes/${id}`,
      transformResponse: (response: Response<ISecurityType>, meta, arg) => {
        return response.payload as ISecurityType;
      },
    }),
    createSecurityType: builder.mutation<ISecurityType, Partial<ISecurityType>>({
      query: (body) => ({
        url: "SecurityTypes",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateSecurityType: builder.mutation<void, Partial<ISecurityType>>({
      query: (data) => ({
        url: `securityType/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteSecurityType: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(id: string) {
        return {
          url: `securityType/${id}`,
          method: "DELETE",
        };
      }
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchSecurityTypeQuery,
  useFetchSecurityTypeByIdQuery,
  useCreateSecurityTypeMutation,
  useDeleteSecurityTypeMutation,
  useUpdateSecurityTypeMutation,
} = extendedApi;