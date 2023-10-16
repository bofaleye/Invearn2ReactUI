import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";
import { NewUser } from "@/models/user";
import { IUser, INewUserProps } from "@/models/user";
// import { INewUserProps, IUser } from "@/models/User";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<NewUser, Partial<NewUser>>({
      query: (body) => ({
        url: `BackOfficeUser/CreateBackOfficeUser`,
        method: "POST",
        body,
      }),
    }),
    fetchUsers: builder.query<any[], void>({
      query: () => "BackOfficeUser/GetAllBackOfficeUsers",
      transformResponse: (response: any[], meta, arg) => {
        return response as any[];
      },
      providesTags: ["Users"]
    }),
    fetchuserById: builder.query<IUser, string>({
      query: (userId: string) => `BackOfficeUser/GetBackOfficeUser/${userId}`,
      transformResponse: (response: IUser, meta, arg) => {
        return response as IUser;
      },
    }),
    updatUser: builder.mutation<void,  Partial<IUser>>({
      query: (data) => ({
        url: `BackOfficeUser/UpdateBackOfficeUser/${data?.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     extendedApi.util.updateQueryData("fetchuserById", id, (draft) => {
      //       Object.assign(draft, patch);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `BackOfficeUser/DeleteBackOfficeUser/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Users"],
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
} = extendedApi;
