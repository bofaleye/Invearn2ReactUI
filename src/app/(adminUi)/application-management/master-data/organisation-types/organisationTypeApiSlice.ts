import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";

interface OrganisationType {
  id: string;
  name: string;
}

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrganisationTypes: builder.query<OrganisationType[], void>({
      query: () => "organisationTypes",
      transformResponse: (response: Response<OrganisationType[]>, meta, arg) => {
        console.log(response);
        return response.payload as OrganisationType[];
      },
    }),
    fetchOrganisationTypeById: builder.query<OrganisationType, string>({
      query: (id: string) => `organisationTypes/${id}`,
      transformResponse: (response: Response<OrganisationType>, meta, arg) => {
        return response.payload as OrganisationType;
      },
    }),
    createOrganisationType: builder.mutation<
      OrganisationType,
      Partial<OrganisationType>
    >({
      query: (body) => ({
        url: `organisationTypes`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "OrganisationTypes", id: "LIST" }],
    }),
    updateOrganisationTypes: builder.mutation<
      void,
      Pick<OrganisationType, "id"> & Partial<OrganisationType>
    >({
      query: ({ id, ...patch }) => ({
        url: `organisationTypes/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData(
            "fetchOrganisationTypeById",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "OrganisationTypes", id },
      ],
    }),
    deleteOrganisationTypes: builder.mutation<
      { success: boolean; id: number },
      number
    >({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "OrganisationTypes", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchOrganisationTypesQuery,
  useCreateOrganisationTypeMutation,
  useDeleteOrganisationTypesMutation,
  useFetchOrganisationTypeByIdQuery,
} = extendedApi;
