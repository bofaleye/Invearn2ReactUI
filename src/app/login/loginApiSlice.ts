import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";
import { LoginResponsePayload, LoginRequest } from "@/models/LoginModel";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response<LoginResponsePayload>, LoginRequest>({
      query: (request) => ({
        url: "Identity/login",
        method: "POST",
        body: request,
      }),
    }),
  }),
});

export const { useLoginMutation } = extendedApi;
