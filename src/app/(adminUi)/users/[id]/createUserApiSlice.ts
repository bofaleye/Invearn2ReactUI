import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";
import { NewUser } from "@/models/NewUser";
import { IUser } from "@/models/User";

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
          })
    }),
   
    overrideExisting: false
});

export const {useCreateUserMutation, useFetchUsersQuery, useFetchuserByIdQuery} = extendedApi