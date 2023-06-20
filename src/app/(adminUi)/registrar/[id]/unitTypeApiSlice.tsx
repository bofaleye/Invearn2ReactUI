'use client';
import { Response } from "@/models/Response";
import { UnitModel } from "@/models/unit";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      fetchUnits: builder.query<UnitModel[], void>({
        query: () => "units",
        transformResponse: (response: Response<UnitModel[]>, meta, arg) => {
          console.log(response);
          return response.payload as UnitModel[];
        },
      }),
      fetchUnitById: builder.query<UnitModel, string>({
        query: (deptId: string) => `units/${deptId}`,
        transformResponse: (response: Response<UnitModel>, meta, arg) => {
          return response.payload as UnitModel;
        },
      }),
      createUnit: builder.mutation<
        UnitModel,
        Partial<UnitModel
        >
      >({
        query: (body) => ({
          url: `units`,
          method: "POST",
          body: JSON.stringify(body)
        }),
        invalidatesTags: [{ type: "UnitModel", id: "LIST" }],
      }),
      updateUnit: builder.mutation<
        void,
        Pick<UnitModel, "id"> & Partial<UnitModel>
      >({
        query: (data) => ({
          url: `units/${data.id}`,
          method: "PUT",
          body: JSON.stringify(data),
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            extendedApi.util.updateQueryData(
              "fetchUnitById",
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
          { type: "UnitModel", id },
        ],
      }),
      deleteUnit: builder.mutation<
        { success: boolean; id: string },
        string
      >({
        query(id) {
          return {
            url: `units/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, id) => [
          { type: "UnitModel", id },
        ],
      }),
    }),
    overrideExisting: false,
  });
  
  export const {
    useFetchUnitsQuery,
    useCreateUnitMutation,
    useDeleteUnitMutation,
    useUpdateUnitMutation,
    useFetchUnitByIdQuery
  } = extendedApi;