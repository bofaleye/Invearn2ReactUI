import { RequestDemoModel, RequestDemoPayload } from "@/models/RequestDemo";
import { apiSlice } from "@/store/apiSlice";
import { Response } from "@/models/Response";

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        requestDemo: builder.mutation<Response<RequestDemoPayload>, RequestDemoModel>({
            query: (request)=>({
                url: 'DemoForm',
                method: 'POST',
                body: request,
            })
        }),
    })
})

export const { useRequestDemoMutation } = extendedApi;