import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";
import { UserRole } from "@/models/UserRole";

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        fetchUserRoles: builder.query<UserRole[], void>({
            query: () => "roles",
            transformResponse: (response: Response<UserRole[]>, meta, arg) => {
                //console.log(response);
                return response.payload as UserRole[];
            },
        }),
    }),
});

export const {
    useFetchUserRolesQuery,
} = extendedApi;