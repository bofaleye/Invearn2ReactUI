import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";
import { NewCustomer } from "@/models/customer";
import { ICustomer, INewUserProps } from "@/models/customer";
// import { INewUserProps, IUser } from "@/models/User";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<NewCustomer, Partial<NewCustomer>>({
      query: (body) => ({
        url: `users`,
        method: "POST",
        body,
      }),
    }),
    fetchUsers: builder.query<ICustomer[], void>({
      query: () => "users",
      transformResponse: (response: Response<ICustomer[]>, meta, arg) => {
        return response.payload as ICustomer[];
      },
    }),
    fetchuserById: builder.query<ICustomer, string>({
      query: (userId: string) => `users/${userId}`,
      transformResponse: (response: Response<ICustomer>, meta, arg) => {
        return response.payload as ICustomer;
      },
    }),
    updatUser: builder.mutation<void, Pick<ICustomer, "id"> & Partial<ICustomer>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData("fetchuserById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
    activateDeactivateUser: builder.mutation<
      void,
      Pick<ICustomer, "id"> & Partial<ICustomer>
    >({
      query: (data) => ({
        url: `users/ActivateDeactivateUser/${data.userId}?id=${data.id}&isActive=${data?.isActive}`,
        method: "PATCH",
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData("fetchuserById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    suspendUnSuspend: builder.mutation<
      void,
      Pick<ICustomer, "id"> & Partial<ICustomer>
    >({
      query: (data) => ({
        url: `users/SuspendReinstateUser/${data.userId}?id=${data.id}&isDisabled=${data?.isDisabled}`,
        method: "PATCH",
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData("fetchuserById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `users?Id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Users", id }],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useFetchUsersQuery,
  useFetchuserByIdQuery,
  useUpdatUserMutation,
  useDeleteUserMutation,
  useActivateDeactivateUserMutation,
  useSuspendUnSuspendMutation,
} = extendedApi;
