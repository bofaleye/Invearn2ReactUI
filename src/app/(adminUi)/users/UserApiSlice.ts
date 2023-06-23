import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";
import { NewUser } from "@/models/User";
import { IUser, INewUserProps } from "@/models/User";
// import { INewUserProps, IUser } from "@/models/User";


const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<NewUser, Partial<NewUser>>({
            query: (body) =>({
                url: `users`,
                method: "POST",
                body,
            }),
        }),
        fetchUsers: builder.query<IUser[], void>({
            query: () => "users",
            transformResponse: (response: Response<IUser[]>, meta, arg) => {

              return response.payload as IUser[];
            },
          }),
          fetchuserById: builder.query<IUser, string>({
            query: (userId: string) => `users/${userId}`,
            transformResponse: (response: Response<IUser>, meta, arg) => {
                return response.payload as IUser;
            }
          }),
          updatUser: builder.mutation<
      void,
      Pick<IUser, "id"> & Partial<IUser>
    >({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApi.util.updateQueryData(
            "fetchuserById",
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
        { type: "Users", id },
      ],
    }),

          deleteUser: builder.mutation<
          { success: boolean, id: number}, number
          >({
            query(id) {
              return {
                url: `users?Id=${id}`,
                method: "DELETE",
              }
            },
            invalidatesTags: (result, error, id) =>[
              {type: "Users", id}
            ],
          })
    }),

    overrideExisting: false
});

export const {useCreateUserMutation, useFetchUsersQuery, useFetchuserByIdQuery,useUpdatUserMutation ,useDeleteUserMutation} = extendedApi
