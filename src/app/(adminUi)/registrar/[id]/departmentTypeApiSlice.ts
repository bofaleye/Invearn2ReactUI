'use client';
import { DepartmentModel } from "@/models/department";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDepartments: builder.query<DepartmentModel[], void>({
      query: () => "departments",
      transformResponse: (response: Response<DepartmentModel[]>, meta, arg) => {
        console.log(response);
        return response.payload as DepartmentModel[];
      },
    }),
    fetchDepartmentById: builder.query<DepartmentModel, string>({
      query: (deptId: string) => `departments/${deptId}`,
      transformResponse: (response: Response<DepartmentModel>, meta, arg) => {
        return response.payload as DepartmentModel;
      },
    }),
    createDepartment: builder.mutation<
      DepartmentModel,
      Partial<DepartmentModel
      >
    >({
      query: (body) => ({
        url: `departments`,
        method: "POST",
        body: JSON.stringify(body)
      }),
      invalidatesTags: [{ type: "DepartmentModel", id: "LIST" }],
    }),
    updateDepartment: builder.mutation<
      void,
      Pick<DepartmentModel, "id"> & Partial<DepartmentModel>
    >({
      query: (data) => ({
        url: `departments/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData(
            "fetchDepartmentById",
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
        { type: "DepartmentModel", id },
      ],
    }),
    deleteDepartment: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(id) {
        return {
          url: `departments/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "DepartmentModel", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchDepartmentsQuery,
  useFetchDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = extendedApi;
